import {
  CarOutlined,
  CodeSandboxOutlined,
  CreditCardOutlined,
  FileOutlined,
  PicCenterOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import { CreateTaskForm } from "components/Form/CreateTask";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { OPENT_FORM_CREATE_TASK } from "stores/Types/DrawerTypes";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

export const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <aside className={cx("sidebar")}>
      <div className={cx("left")}>
        <div className={cx("box")}>
          <SearchOutlined className={cx("icon")} />
          <span className={cx("title")}>SEARCH ISSUE</span>
        </div>
        <div
          onClick={() => {
            dispatch({
              type: OPENT_FORM_CREATE_TASK,
              title: "Create Task",
              component: <CreateTaskForm />,
            });
          }}
          className={cx("box")}
        >
          <PlusOutlined className={cx("icon")} />
          <span className={cx("title")}>Create task</span>
        </div>

        <div className={cx("box")}>
          <QuestionCircleOutlined className={cx("icon")} />
          <span className={cx("title")}>SEARCH ISSUE</span>
        </div>
      </div>
      <div className={cx("right")}>
        <div className={cx("info")}>
          <div className={cx("avt")}>
            <img src="https://picsum.photos/200/300" alt="sadas" />
          </div>
          <div className={cx("content")}>
            <div>singularity 1.0w</div>
            <p>Business project</p>
          </div>
        </div>
        <div className={cx("nav-link")}>
          <CreditCardOutlined className={cx("icon")} />
          <div className={cx("title")}>Kanban Board</div>
        </div>
        <NavLink to="project-managers" className={cx("nav-link")}>
          <SettingOutlined className={cx("icon")} />
          <div className={cx("title")}>Project Managers</div>
        </NavLink>
        <NavLink to="create-project" className={cx("nav-link")}>
          <PlusCircleOutlined className={cx("icon")} />
          <div className={cx("title")}>Create Project </div>
        </NavLink>
        <div className={cx("line")}></div>
        <div className={cx("nav-link", "disable")}>
          <CarOutlined className={cx("icon")} />
          <div className={cx("title")}>Releases</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <PicCenterOutlined className={cx("icon")} />
          <div className={cx("title")}>Issues and filters</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <FileOutlined className={cx("icon")} />
          <div className={cx("title")}>Pages</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <RiseOutlined className={cx("icon")} />
          <div className={cx("title")}>Reports</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <CodeSandboxOutlined className={cx("icon")} />
          <div className={cx("title")}>Components</div>
        </div>
      </div>
    </aside>
  );
};
