import Tippy from "@tippyjs/react/headless"; // different import path!
import { Avatar, Breadcrumb, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "stores";
import {
  DELETE_USER_FROM_PROJECT_SAGA,
  GET_TASK_DETAIL_SAGA,
  PROJECT_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "stores/Sagas/types/ProjectTypeSaga";
import { SHOW_MODAL } from "stores/Types/ModalTypes";
import { Member, TaskDetail } from "stores/Types/ProjectTypes";
import {
  StyledCheckSquareTwoTone,
  StyledExclamationCircleOutlined,
  StyledHomeOutlined,
  StyledSearchOutlined,
} from "utils/IconHelper";
import styles from "./ProjectDetail.module.scss";

const cx = classNames.bind(styles);

interface ParamTypes {
  idProject: string;
}

interface TaskListItem {
  statusId: string;
  statusName: string;
  lstTaskDeTail: TaskDetail[];
}

export const ProjectDetail = () => {
  const { projectDetail } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const dispatch = useDispatch();
  const { idProject } = useParams<keyof ParamTypes>() as ParamTypes;
  const [id] = useState(idProject);

  useEffect(() => {
    dispatch({ type: PROJECT_DETAIL_SAGA, idProject: idProject });
  }, [id, dispatch, idProject]);

  const columns: ColumnsType<Member> = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <div>{text}</div>,
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text, record) => {
        return (
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={record.avatar}
            alt={record.name}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className={cx("cellAction")}>
            <div
              onClick={() => {
                dispatch({
                  type: DELETE_USER_FROM_PROJECT_SAGA,
                  userProject: {
                    projectId: projectDetail.id,
                    userId: record.userId,
                  },
                });
              }}
              className={cx("deleteButton")}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const handleDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;
    //vị trí hiện tại
    // const { droppableId, index } = source;

    //vị trí muốn ddeen
    // const { droppableId, index } = destination;

    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    //gọi api cập nhật lại status
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskUpdateStatus: {
        taskId: Number(draggableId),
        statusId: destination.droppableId,
        projectId: projectDetail.id,
      },
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <Breadcrumb
          style={{
            color: "rgb(94, 108, 132)",
            fontSize: "15px",
            letterSpacing: "1px",
          }}
        >
          <Breadcrumb.Item>
            <Link to={"/"}>
              <StyledHomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            <span>Projects</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            <span>{projectDetail.projectName}</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Kanban Board</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className={cx("title")}>{projectDetail.projectName}</h1>
        <div className={cx("filter")}>
          <div className={cx("search")}>
            <input type="text" placeholder="search..." />
            <StyledSearchOutlined className={cx("icon")} />
          </div>
          <div>
            <Tippy
              placement="bottom"
              interactive
              trigger="click"
              render={(attrs) => (
                <div
                  className="box"
                  style={{
                    boxShadow: "rgb(0 0 0 /12%) 0px 2px 12px",
                    color: "#000",
                  }}
                  tabIndex={-1}
                  {...attrs}
                >
                  <Table
                    columns={columns}
                    pagination={false}
                    dataSource={projectDetail?.members}
                    rowKey="userId"
                  />
                </div>
              )}
            >
              <div
                className={cx("members")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar.Group
                  maxCount={3}
                  size="default"
                  maxPopoverTrigger="click"
                  maxPopoverPlacement="bottom"
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {projectDetail.members?.map((user: Member) => {
                    return <Avatar key={user.userId} src={user.avatar} />;
                  })}
                </Avatar.Group>
                {/* {true && (
              <Avatar
                style={{
                  backgroundColor: "#f1e7e7ed",
                  color: "#000",
                  marginLeft: "-10px",
                  fontSize: "12px",
                }}
                icon={<PlusOutlined />}
              />
            )} */}
              </div>
            </Tippy>
          </div>

          <button className={cx("btn-filter")}>
            <span>Only My Issues</span>
          </button>
          <button className={cx("btn-filter")}>
            <span>Recently Updated</span>
          </button>
        </div>
        <div className={cx("bottom")}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {projectDetail?.lstTask?.map((task: TaskListItem, idx: number) => {
              return (
                <Droppable key={task.statusId} droppableId={task.statusId}>
                  {(provided) => {
                    return (
                      <div
                        key={idx}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cx("box")}
                      >
                        <h3>{task.statusName}</h3>
                        <div className={cx("content")}>
                          {task?.lstTaskDeTail?.map((taskDetail, idx) => {
                            return (
                              <Draggable
                                key={taskDetail.taskId.toString()}
                                draggableId={taskDetail.taskId.toString()}
                                index={idx}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={() => {
                                        dispatch({
                                          type: GET_TASK_DETAIL_SAGA,
                                          idTask: taskDetail.taskId,
                                        });
                                        dispatch({ type: SHOW_MODAL });
                                      }}
                                      className={cx("item")}
                                    >
                                      <p>{taskDetail.taskName}</p>
                                      <div className={cx("item-bottom")}>
                                        <div className={cx("option")}>
                                          {taskDetail.taskTypeDetail.id ===
                                          2 ? (
                                            <StyledCheckSquareTwoTone />
                                          ) : (
                                            <StyledExclamationCircleOutlined
                                              style={{ color: "red" }}
                                            />
                                          )}
                                          <span>
                                            {taskDetail.priorityTask.priority}
                                          </span>
                                        </div>

                                        <div>
                                          {taskDetail.assigness.map((user) => {
                                            return (
                                              <Avatar
                                                key={user.id}
                                                style={{
                                                  marginRight: "-4px",
                                                  width: "30px",
                                                  height: "30px",
                                                  border: "1px solid #fff",
                                                }}
                                                src={user.avatar}
                                                alt={user.id.toString()}
                                              />
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
