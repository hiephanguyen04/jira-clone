import classNames from "classnames/bind";
import { CreateTaskForm } from "components/Form/CreateTask";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { OPENT_FORM_CREATE_TASK } from "stores/Types/DrawerTypes";
import {
  StyledCarOutlined,
  StyledCodeSandboxOutlined,
  StyledCreditCardOutlined,
  StyledFileOutlined,
  StyledPicCenterOutlined,
  StyledPlusCircleOutlined,
  StyledPlusOutlined,
  StyledQuestionCircleOutlined,
  StyledRiseOutlined,
  StyledSearchOutlined,
  StyledSettingOutlined,
} from "utils/IconHelper";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <aside className={cx("sidebar")}>
      <div className={cx("left")}>
        <div className={cx("box")}>
          <StyledSearchOutlined className={cx("icon")} />
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
          <StyledPlusOutlined className={cx("icon")} />
          <span className={cx("title")}>Create task</span>
        </div>

        <div className={cx("box")}>
          <StyledQuestionCircleOutlined className={cx("icon")} />
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
          <StyledCreditCardOutlined className={cx("icon")} />
          <div className={cx("title")}>Kanban Board</div>
        </div>
        <NavLink to="project-managers" className={cx("nav-link")}>
          <StyledSettingOutlined className={cx("icon")} />
          <div className={cx("title")}>Project Managers</div>
        </NavLink>
        <NavLink to="create-project" className={cx("nav-link")}>
          <StyledPlusCircleOutlined className={cx("icon")} />
          <div className={cx("title")}>Create Project </div>
        </NavLink>
        <div className={cx("line")}></div>
        <div className={cx("nav-link", "disable")}>
          <StyledCarOutlined className={cx("icon")} />
          <div className={cx("title")}>Releases</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <StyledPicCenterOutlined className={cx("icon")} />
          <div className={cx("title")}>Issues and filters</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <StyledFileOutlined className={cx("icon")} />
          <div className={cx("title")}>Pages</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <StyledRiseOutlined className={cx("icon")} />
          <div className={cx("title")}>Reports</div>
        </div>
        <div className={cx("nav-link", "disable")}>
          <StyledCodeSandboxOutlined className={cx("icon")} />
          <div className={cx("title")}>Components</div>
        </div>
      </div>
    </aside>
  );
};
