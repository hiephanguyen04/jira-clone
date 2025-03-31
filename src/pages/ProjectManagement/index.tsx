import Tippy from "@tippyjs/react/headless"; // different import path!
import { AutoComplete, Avatar, Popconfirm, Table, Tag } from "antd";
import { SelectProps } from "antd/es/select";
import classNames from "classnames/bind";
import { EditProjectForm } from "components/Form/EditProjectFom";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "stores";
import {
  ASSIGN_USER_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
} from "stores/Sagas/types/ProjectTypeSaga";
import { SEARCH_USER_SAGA } from "stores/Sagas/types/UserTypeSaga";
import { OPEN_PROM_EDIT_PROJECT } from "stores/Types/DrawerTypes";
import { EDIT_PROJECT, Project } from "stores/Types/ProjectTypes";
import { UserSearch } from "stores/Types/UserTypes";
import {
  StyledPlusOutlined,
  StyledQuestionCircleOutlined,
  StyledSearchOutlined,
} from "utils/IconHelper";
import { openNotification } from "utils/Notification";
import styles from "./ProjectManagement.module.scss";

const cx = classNames.bind(styles);

export const ProjectManagement: React.FC = () => {
  const { listProject } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { userLogin, userSearch } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [value, setValue] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");
  const dispatch = useDispatch();
  const debounce = useDebounce(value, 500);

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
  }, [dispatch]);

  // search user
  useEffect(() => {
    if (!debounce.trim()) {
      return;
    }
    dispatch({ type: SEARCH_USER_SAGA, keyword: debounce });
  }, [debounce, dispatch]);

  const options: SelectProps<string>["options"] = [
    {
      label: "Users",
      options: userSearch?.map((user: UserSearch) => {
        return {
          value: user.userId.toString(),
          label: (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <img
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                src={user.avatar}
                alt={user.name}
              />
              <span> {user.name}</span>
            </div>
          ),
        };
      }),
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (_text: string, record: Project) => {
        return (
          <Link to={`/project-detail/${record.id}`}>{record.projectName}</Link>
        );
      },
    },
    {
      title: "Project Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (record: { name: string }) => {
        return <Tag color={"green"}>{record.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Member",
      render: (_text: string, record: Project) => {
        return (
          <div
            className={cx("members")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar.Group
              maxCount={3}
              size="default"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {record.members?.map((user) => {
                return <Avatar key={user.userId} src={user.avatar} />;
              })}
            </Avatar.Group>
            <Tippy
              placement="right-end"
              offset={[0, 10]}
              interactive
              onHide={() => {
                setValueInput("");
                setValue("");
              }}
              render={(attrs) => (
                <div className="box" tabIndex={-1} {...attrs}>
                  <div className={cx("addUser")}>
                    <h3>Add User</h3>
                    <AutoComplete
                      options={options}
                      style={{ width: 200 }}
                      value={debounce}
                      onSelect={(value: string) => {
                        dispatch({
                          type: ASSIGN_USER_PROJECT_SAGA,
                          user: {
                            projectId: record.id,
                            userId: value,
                          },
                        });
                      }}
                      onSearch={(value: string) => {
                        setValue(value);
                      }}
                    >
                      <div className={cx("search")}>
                        <input
                          onChange={(e) => {
                            setValueInput(e.target.value);
                          }}
                          value={valueInput}
                          type="text"
                          placeholder="search..."
                        />
                        <StyledSearchOutlined className={cx("icon")} />
                      </div>
                    </AutoComplete>
                  </div>
                </div>
              )}
              trigger="click"
            >
              <Avatar
                style={{
                  backgroundColor: "#f1e7e7ed",
                  color: "#000",
                  marginLeft: "-10px!important",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                icon={<StyledPlusOutlined />}
              />
            </Tippy>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_text: string, record: Project) => (
        <div className={cx("cellAction")}>
          <div
            onClick={() => {
              dispatch({
                type: OPEN_PROM_EDIT_PROJECT,
                component: <EditProjectForm />,
              });
              dispatch({
                type: EDIT_PROJECT,
                editProject: record,
              });
            }}
            className={cx("viewButton")}
          >
            Edit
          </div>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => {
              if (record.creator?.id === userLogin.id) {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  idProject: record.id,
                });
              } else {
                openNotification("warning", "select your right project!");
              }
            }}
            icon={<StyledQuestionCircleOutlined style={{ color: "red" }} />}
          >
            {record.creator?.id === userLogin.id ? (
              <div className={cx("deleteButton")}>Delete</div>
            ) : (
              <div
                style={{ pointerEvents: "none" }}
                className={cx("deleteButton")}
                onClick={() => {
                  if (record.creator?.id === userLogin.id) {
                    dispatch({
                      type: DELETE_PROJECT_SAGA,
                      idProject: record.id,
                    });
                  } else {
                    openNotification("warning", "select your right project!");
                  }
                }}
              >
                Delete
              </div>
            )}
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={cx("dataTable")}>
      <div className={cx("dataTableTitle")}>
        list users
        <Link className={cx("link")} to="/create-project">
          Add new
        </Link>
      </div>
      <Table columns={columns} dataSource={listProject} rowKey="id" />
    </div>
  );
};
