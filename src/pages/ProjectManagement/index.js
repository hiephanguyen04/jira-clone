import {
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { AutoComplete, Avatar, Popconfirm, Table, Tag } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProjectManagement.module.scss";

import { EditProjectForm } from "components/Form/EditProjectFom";
import { useDebounce } from "hooks/useDebounce";
import {
  ASSIGN_USER_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
} from "stores/Sagas/types/ProjectTypeSaga";
import { SEARCH_USER_SAGA } from "stores/Sagas/types/UserTypeSaga";
import { OPEN_PROM_EDIT_PROJECT } from "stores/Types/DrawerTypes";
import { EDIT_PROJECT } from "stores/Types/ProjectTypes";
import { openNotification } from "utils/Notification";

const cx = classNames.bind(styles);

export const ProjectManagement = () => {
  const { listProject } = useSelector((state) => state.projectReducer);
  const { userLogin, userSearch } = useSelector((state) => state.userReducer);
  const [value, setValue] = useState("");
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();
  const debounce = useDebounce(value, 500);
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
  }, [dispatch]);

  //search user
  useEffect(() => {
    if (!debounce.trim()) {
      return;
    }
    dispatch({ type: SEARCH_USER_SAGA, keyword: debounce });
  }, [debounce, dispatch]);
  const options = [
    {
      label: "Users",
      options: userSearch?.map((user) => {
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
  // const onSelect = (data,option) => {
  //   console.log("onSelect",  data);
  //   di
  // };

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
      render: (text, record, idx) => {
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
      render: (record) => {
        return <Tag color={"green"}>{record.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Member",
      render: (text, record, idx) => {
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
              {record.members?.map((user, idx) => {
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
                <div className="box" tabIndex="-1" {...attrs}>
                  <div className={cx("addUser")}>
                    <h3>Add User</h3>
                    <AutoComplete
                      options={options}
                      style={{ width: 200 }}
                      value={debounce}
                      onSelect={(value, option) => {
                        dispatch({
                          type: ASSIGN_USER_PROJECT_SAGA,
                          user: {
                            projectId: record.id,
                            userId: value,
                          },
                        });
                      }}
                      onSearch={(value) => {
                        setValue(value);
                      }}
                    >
                      <div className={cx("search")}>
                        <input
                          onChange={(value) => {
                            setValueInput(value.target.value);
                          }}
                          value={valueInput}
                          type="text"
                          placeholder="search..."
                        />
                        <SearchOutlined className={cx("icon")} />
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
                icon={<PlusOutlined />}
              />
            </Tippy>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
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
              if (record.creator.id === userLogin.id) {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  idProject: record.id,
                });
              } else {
                openNotification("warning", "select your right project!");
              }
            }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            {record.creator.id === userLogin.id ? (
              <div className={cx("deleteButton")}>Delete</div>
            ) : (
              <div
                style={{ pointerEvents: "none" }}
                className={cx("deleteButton")}
                onClick={() => {
                  if (record.creator.id === userLogin.id) {
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
