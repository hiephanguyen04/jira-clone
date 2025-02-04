import {
  CheckSquareTwoTone,
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Popconfirm, Select } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
} from "stores/Sagas/types/ProjectTypeSaga";
import { GET_ALL_TASK_TYPE_SAGA } from "stores/Sagas/types/TaskTypeSaga";
import { HIDE_MODAL } from "stores/Types/ModalTypes";
import { CHANGE_TASK_MODAL } from "stores/Types/ProjectTypes";
import styles from "./TitleDetail.module.scss";

const { Option } = Select;
const cx = classNames.bind(styles);

export const TitleTask = () => {
  const { taskDetail } = useSelector((state) => state.projectReducer);
  const { listTaskType } = useSelector((state) => state.taskTypeReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, [dispatch]);
  return (
    <div className={cx("top")}>
      <div className={cx("taskType")}>
        <div className={cx("inputForm")}>
          <Select
            value={taskDetail?.taskTypeDetail?.id}
            className={cx("select")}
            style={{ width: "100%" }}
            onChange={(value) => {
              dispatch({
                type: HANDLE_CHANGE_POST_API_SAGA,
                actionType: CHANGE_TASK_MODAL,
                name: "typeId",
                value,
              });
            }}
          >
            {listTaskType.map((task) => {
              if (task.id === 2) {
                return (
                  <Option key={task.id} value={task.id}>
                    <div className={cx("option")}>
                      <CheckSquareTwoTone className={cx("icon")} />
                      <span>{task.taskType}</span>
                    </div>
                  </Option>
                );
              } else {
                return (
                  <Option key={task.id} value={task.id}>
                    <div className={cx("option")}>
                      <ExclamationCircleOutlined
                        style={{ color: "red" }}
                        className={cx("icon")}
                      />
                      <span>{task.taskType}</span>
                    </div>
                  </Option>
                );
              }
            })}
          </Select>
        </div>
      </div>
      <div className={cx("btns")}>
        <div className={cx("itemBtn")}>
          <SendOutlined style={{ fontSize: "18px" }} />
          <span className={cx("titleBtn")}>Give feedback</span>
        </div>
        <div className={cx("itemBtn")}>
          <LinkOutlined style={{ fontSize: "18px" }} />
          <span className={cx("titleBtn")}>Coppy link</span>
        </div>
        <Popconfirm
          title="Are you sure？"
          onConfirm={() =>
            dispatch({
              type: DELETE_TASK_SAGA,
              idTask: taskDetail.taskId,
              idProject: projectDetail.id,
            })
          }
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <div className={cx("itemBtn")}>
            <DeleteOutlined style={{ fontSize: "18px" }} />
          </div>
        </Popconfirm>

        <div
          onClick={() => dispatch({ type: HIDE_MODAL })}
          className={cx("itemBtn")}
        >
          <CloseOutlined style={{ fontSize: "18px" }} />
        </div>
      </div>
    </div>
  );
};
