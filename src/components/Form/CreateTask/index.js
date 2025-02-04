import {
  CheckSquareTwoTone,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "stores/Sagas/types/PriorityTypeSaga";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PROJECT_SAGA,
} from "stores/Sagas/types/ProjectTypeSaga";
import { GET_ALL_STATUS_SAGA } from "stores/Sagas/types/StatusTypeSaga";
import { GET_ALL_TASK_TYPE_SAGA } from "stores/Sagas/types/TaskTypeSaga";
import { GET_ALL_USER_PROJECT_SAGA } from "stores/Sagas/types/UserTypeSaga";
import * as Yup from "yup";
import styles from "./CreateTaskForm.module.scss";

const { Option } = Select;
const cx = classNames.bind(styles);

export const CreateTaskForm = () => {
  const { isLoadingBtn } = useSelector((state) => state.loadingReducer);
  const { listTaskType } = useSelector((state) => state.taskTypeReducer);
  const { listPriority } = useSelector((state) => state.priorityReducer);
  const { listStatus } = useSelector((state) => state.statusReducer);
  const { listProject } = useSelector((state) => state.projectReducer);
  const { userProject, userLogin } = useSelector((state) => state.userReducer);
  const { visible } = useSelector((state) => state.drawerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PROJECT_SAGA });
  }, [visible, dispatch]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskName: "",
      description: "",
      statusId: listStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: "",
      typeId: listTaskType[0]?.id,
      priorityId: listPriority[0]?.priorityId,
      listUserAsign: [],
    },
    validationSchema: Yup.object({
      taskName: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("This field is required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch({
        type: CREATE_TASK_SAGA,
        data: values,
        resetForm,
        idProject: values.projectId,
      });
      resetForm();
    },
  });

  const handleChangeSelectProject = (value) => {
    dispatch({ type: GET_ALL_USER_PROJECT_SAGA, idProject: value });
    formik.setFieldValue("projectId", value);
  };
  const handleChangeEditor = (content, editor) => {
    formik.setFieldValue("description", content);
  };
  return (
    <div className={cx("wrapper")}>
      <form className={cx("createTaskForm")} onSubmit={formik.handleSubmit}>
        <div className={cx("inputForm")}>
          <label>Project name</label>
          <Select
            className={cx("select")}
            value={formik.values.projectId}
            style={{ width: "100%" }}
            placeholder={<p>select project</p>}
            onChange={handleChangeSelectProject}
          >
            {listProject.map((project) => {
              if (project.creator.id === userLogin.id) {
                return (
                  <Option
                    key={project.id}
                    value={project.id}
                    label={project.projectName}
                  >
                    {project.projectName}
                  </Option>
                );
              }
              return null;
            })}
          </Select>
        </div>
        <div className={cx("inputForm")}>
          <label>Task Type</label>
          <Select
            value={formik.values.typeId}
            className={cx("select")}
            style={{ width: "100%" }}
            onChange={(value) => {
              formik.setFieldValue("typeId", value);
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
        <div className={cx("inputForm")}>
          <label>Short Summary</label>

          <input
            type="text"
            name="taskName"
            onChange={formik.handleChange}
            value={formik.values.taskName}
            onBlur={formik.handleBlur}
            className={cx({
              errorInput: formik.errors.taskName && formik.touched.taskName,
            })}
          />
          {formik.errors.taskName && formik.touched.taskName && (
            <div className={cx("error")}>
              <span className={cx("text")}>{formik.errors.taskName} </span>
            </div>
          )}
        </div>
        <div className={cx("inputForm")}>
          <label>Description</label>
          <Editor
            initialValue={formik.values.description}
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
            onEditorChange={handleChangeEditor}
          />
        </div>
        <div className={cx("inputForm")}>
          <label>Status</label>
          <Select
            value={formik.values.statusId}
            optionFilterProp="value"
            className={cx("select")}
            style={{ width: "100%" }}
            onSelect={(value) => {
              formik.setFieldValue("statusId", value);
            }}
          >
            {listStatus.map((status) => {
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
          <Select
            className={cx("select")}
            value={formik.values.listUserAsign}
            style={{ width: "100%" }}
            mode="multiple"
            optionLabelProp="label"
            onChange={(value) => {
              formik.setFieldValue("listUserAsign", value);
            }}
          >
            {userProject?.map((user) => {
              return (
                <Option key={user.userId} label={user.name} value={user.userId}>
                  <div className={cx("assign")}>
                    <img src={user.avatar} alt={user.name} />
                    <span>{user.name}</span>
                  </div>
                </Option>
              );
            })}
          </Select>
        </div>
        <div className={cx("inputForm")}>
          <label>Priority</label>
          <Select
            value={formik.values.priorityId}
            className={cx("select")}
            style={{ width: "100%" }}
            onSelect={(value) => {
              formik.setFieldValue("priorityId", value);
            }}
          >
            {listPriority.map((priority, idx) => {
              return (
                <Option
                  key={idx}
                  value={priority.priorityId}
                  label={priority.priority}
                >
                  {priority.priority}
                </Option>
              );
            })}
          </Select>
        </div>
        <button style={{ width: "70px" }} type="submit" className="btn">
          {isLoadingBtn ? (
            <LoadingOutlined className={cx("loading")} />
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};
