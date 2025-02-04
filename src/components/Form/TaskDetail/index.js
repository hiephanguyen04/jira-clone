import { CloseOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { InputNumber, Progress, Select } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "stores/Sagas/types/PriorityTypeSaga";
import { HANDLE_CHANGE_POST_API_SAGA } from "stores/Sagas/types/ProjectTypeSaga";
import { GET_ALL_STATUS_SAGA } from "stores/Sagas/types/StatusTypeSaga";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  REMOVE_USER_ASSIGN,
} from "stores/Types/ProjectTypes";
import styles from "./TaskDetail.module.scss";

const { Option } = Select;
const cx = classNames.bind(styles);

export const TaskDetail = () => {
  const [visibleEditor, setVisibleEditor] = useState(false);

  const { taskDetail } = useSelector((state) => state.projectReducer);
  const { listPriority } = useSelector((state) => state.priorityReducer);
  const { listStatus } = useSelector((state) => state.statusReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();
  const [content, setContent] = useState(taskDetail.description);

  useEffect(() => {
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
  }, [dispatch]);

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining, originalEstimate } =
      taskDetail;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div className={cx("estimate")}>
        {/* <ClockCircleOutlined style={{ fontSize: "30px" }} /> */}
        <div className={cx("time")}>
          <Progress percent={percent} showInfo={false} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3
              style={{ fontSize: "13px" }}
            >{`${timeTrackingSpent}h logged`}</h3>
            <h3 style={{ fontSize: "13px" }}>
              {timeTrackingRemaining === 0
                ? `${originalEstimate} emtimate`
                : `${timeTrackingRemaining}h remaining`}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <InputNumber
              style={{
                width: "50%",
                background: "rgb(244, 245, 247)",
                borderRadius: "3px",
              }}
              controls={false}
              onChange={(value) => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "timeTrackingSpent",
                  value,
                });
              }}
            />
            <InputNumber
              style={{
                width: "50%",
                background: "rgb(244, 245, 247)",
                borderRadius: "3px",
              }}
              controls={false}
              onChange={(value) => {
                console.log(value);
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "timeTrackingRemaining",
                  value,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("content")}>
      <div className={cx("left")}>
        <div className={cx("taskName")}>
          <h3>{taskDetail?.taskName}</h3>
        </div>
        <h3 style={{ marginTop: "10px", fontSize: "15px", fontWeight: "500" }}>
          Description
        </h3>
        {visibleEditor ? (
          <div className={cx("description")}>
            {/* <label>Description</label> */}
            <Editor
              initialValue={taskDetail?.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
              // onEditorChange={handleChangeEditor}
            />
            <div className={cx("action")}>
              <button
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODAL,
                    name: "description",
                    value: content,
                  });
                  setVisibleEditor(false);
                }}
                className="btn"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setVisibleEditor(false);
                }}
                className="btn outline"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEditor(!visibleEditor);
            }}
            dangerouslySetInnerHTML={{ __html: taskDetail?.description }}
          />
        )}
      </div>
      <div className={cx("right")}>
        <div className={cx("inputForm")}>
          <label>Status</label>
          <Select
            // value={formik.values.statusId}
            showArrow={false}
            value={taskDetail.statusId}
            optionFilterProp="value"
            className={cx("select")}
            style={{ width: "100%" }}
            onSelect={(value) => {
              dispatch({
                type: HANDLE_CHANGE_POST_API_SAGA,
                actionType: CHANGE_TASK_MODAL,
                name: "statusId",
                value,
              });
            }}
          >
            {listStatus.map((status, idx) => {
              return (
                <Option
                  key={status.statusId}
                  value={status.statusId}
                  label={status.statusName}
                >
                  {status.statusName}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className={cx("inputForm")}>
          <label>Assignees</label>
          <div className={cx("listAssign")}>
            {taskDetail?.assigness?.map((user) => {
              return (
                <div key={user.id} className={cx("item")}>
                  <div className={cx("assign")}>
                    <img src={user.avatar} />
                    <span>{user.name}</span>
                    <CloseOutlined
                      onClick={() => {
                        dispatch({
                          type: HANDLE_CHANGE_POST_API_SAGA,
                          actionType: REMOVE_USER_ASSIGN,
                          userId: user.id,
                        });
                      }}
                      style={{ fontSize: "13px", margin: "0" }}
                    />
                  </div>
                </div>
              );
            })}
            <Select
              className="select"
              showArrow={false}
              value="Add More"
              style={{ width: 200, border: "none" }}
              onChange={(value) => {
                let userSelected = projectDetail.members.find(
                  (mem) => mem.userId == value
                );
                userSelected = {
                  ...userSelected,
                  id: userSelected.userId,
                };

                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_ASSIGNESS,
                  userSelected,
                });
              }}
            >
              {projectDetail?.members
                ?.filter((mem) => {
                  let index = taskDetail.assigness?.findIndex(
                    (us) => us.id === mem.userId
                  );
                  if (index !== -1) {
                    return false;
                  }
                  return true;
                })
                .map((user) => {
                  return (
                    <Option
                      key={user.userId}
                      value={user.userId}
                      style={{ margin: "0", padding: "0" }}
                    >
                      <div className={cx("assign2")} style={{ width: "100%" }}>
                        <img src={user.avatar} />
                        <span>{user.name}</span>
                      </div>
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
        <div className={cx("inputForm")}>
          <label>Priority</label>
          <Select
            value={taskDetail?.priorityTask?.priorityId}
            showArrow={false}
            className={cx("select")}
            style={{ width: "100%" }}
            onSelect={(value) => {
              dispatch({
                type: HANDLE_CHANGE_POST_API_SAGA,
                actionType: CHANGE_TASK_MODAL,
                name: "priorityId",
                value,
              });
            }}
          >
            {listPriority?.map((priority, idx) => {
              return (
                <Option
                  key={priority.priorityId}
                  value={priority.priorityId}
                  label={priority.priority}
                >
                  {priority.priority}
                </Option>
              );
            })}
          </Select>
        </div>
        <div
          className={cx("inputForm")}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ margin: "0" }}>ORIGINAL ESTIMATE (HOURS)</label>
          <InputNumber
            min={1}
            style={{
              width: "100%",
              background: "rgb(244, 245, 247)",
              borderRadius: "3px",
            }}
            controls={false}
            value={taskDetail.originalEstimate}
            onChange={(value) => {
              // if (value.trim() == "") {
              //   return;
              // }
              dispatch({
                type: HANDLE_CHANGE_POST_API_SAGA,
                actionType: CHANGE_TASK_MODAL,
                name: "originalEstimate",
                value,
              });
            }}
          />
        </div>
        <div className={cx("inputForm")}>
          <label>TIME TRACKING</label>
          {renderTimeTracking()}
        </div>
      </div>
    </div>
  );
};
