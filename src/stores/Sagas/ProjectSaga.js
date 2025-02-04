import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { projectService } from "services/ProjectService";
import { HIDE_DRAWER } from "stores/Types/DrawerTypes";
import { HIDE_LOADING_BTN, SHOW_LOADING_BTN } from "stores/Types/LoadingTypes";
import { HIDE_MODAL } from "stores/Types/ModalTypes";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_PROJECT,
  GET_TASK_DETAIL,
  PROJECT_DETAIL,
  REMOVE_USER_ASSIGN,
} from "stores/Types/ProjectTypes";
import { openNotification } from "utils/Notification";
import {
  ASSIGN_USER_PROJECT_SAGA,
  CREATE_PROJECT_SAGA,
  CREATE_TASK_SAGA,
  DELETE_PROJECT_SAGA,
  DELETE_TASK_SAGA,
  DELETE_USER_FROM_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  PROJECT_DETAIL_SAGA,
  UPDATE_PROJECT_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "./types/ProjectTypeSaga";

function* getAllProject() {
  try {
    const { data } = yield call(() => projectService.getAllProject());
    //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
    yield put({
      type: GET_ALL_PROJECT,
      listProject: data.content,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProject);
}

function* createProject(action) {
  yield put({
    type: SHOW_LOADING_BTN,
  });
  yield delay(500);

  try {
    yield call(() => projectService.createProject(action.newProject));
    openNotification("success", "Create project success");
    yield put({
      type: HIDE_LOADING_BTN,
    });
  } catch (err) {
    openNotification("error", "Create project error");
    yield put({
      type: HIDE_LOADING_BTN,
    });
    console.log(err);
  }
}

export function* createProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}

function* updateProject(action) {
  try {
    yield call(() => projectService.updateProject(action.project));
    openNotification("success", "Edit Project Sucees!");
    yield put({ type: GET_ALL_PROJECT_SAGA });
    yield put({ type: HIDE_DRAWER });
  } catch (error) {
    openNotification("error", "Edit Project fail!");
    console.log(error.response?.data);
  }
}

export function* updateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProject);
}

function* deleteProject(action) {
  try {
    yield call(() => projectService.deleteProject(action.idProject));
    openNotification("success", "Delete success!");
    yield put({ type: GET_ALL_PROJECT_SAGA });
  } catch (error) {
    openNotification("error", "Delete fail!");
    console.log(error.response?.data);
  }
}

export function* deleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}

function* assignUserProject(action) {
  try {
    yield call(() => projectService.assignUserProject(action.user));
    openNotification("success", "Add user success!");
    yield put({ type: GET_ALL_PROJECT_SAGA });
    yield put({ type: "RESET_USER_SEARCH" });
  } catch (error) {
    openNotification("error", `${error.response?.data.message}`);
    console.log(error.response?.data);
  }
}
export function* assignUserProjectSaga() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProject);
}

function* projectDetail(action) {
  try {
    const { data } = yield call(() =>
      projectService.getProjectDetail(action.idProject)
    );
    yield put({ type: PROJECT_DETAIL, projectDetail: data.content });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* projectDetailSaga() {
  yield takeLatest(PROJECT_DETAIL_SAGA, projectDetail);
}

function* createTask(action) {
  try {
    yield put({ type: SHOW_LOADING_BTN });
    yield delay(500);
    yield call(() => projectService.createTask(action.data));
    yield put({ type: PROJECT_DETAIL_SAGA, idProject: action.idProject });
    yield put({ type: HIDE_DRAWER });
    // action.resetForm();
    openNotification("success", "Create task success!");
    yield put({ type: HIDE_LOADING_BTN });
  } catch (error) {
    openNotification("error", `${error.response?.data.message}`);
    yield put({ type: HIDE_LOADING_BTN });
    console.log(error.response?.data);
  }
}

export function* createTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTask);
}

function* deleteUserPromProject(action) {
  try {
    yield call(() => projectService.deleteUserFromProject(action.userProject));
    openNotification("success", "Deltee user success!");
    yield put({
      type: PROJECT_DETAIL_SAGA,
      idProject: action.userProject.projectId,
    });
  } catch (error) {
    openNotification("error", `${error.response?.data.message}`);
    console.log(error.response?.data);
  }
}
export function* deleteUserFromProjectSaga() {
  yield takeLatest(DELETE_USER_FROM_PROJECT_SAGA, deleteUserPromProject);
}

function* getTaskDetail(action) {
  try {
    const { data } = yield call(() =>
      projectService.getTaskDetail(action.idTask)
    );
    yield put({ type: GET_TASK_DETAIL, taskDetail: data.content });
    // yield put({ type: PROJECT_DETAIL_SAGA, idProject: data.content.projectId });
    // yield put({ type: SHOW_MODAL });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

function* deleteTask(action) {
  try {
    yield projectService.removeTask(action.idTask);
    yield put({ type: PROJECT_DETAIL_SAGA, idProject: action.idProject });
    openNotification("success", "Delete task success!");
    yield put({ type: HIDE_MODAL });
  } catch (error) {
    openNotification("error", `${error.response?.data.message}`);
    console.log(error);
  }
}

export function* deleteTaskSaga() {
  yield takeLatest(DELETE_TASK_SAGA, deleteTask);
}

function* handelChangePostApi(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;

        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;
    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
    default:
      return true;
  }

  //Save qua api updateTaskSaga
  //Lây dữ liệu từ state.taskDetail
  let { taskDetail } = yield select((state) => state.projectReducer);
  //Biến đổi dữ liệu state.taskDetail thành dữ liệu api cần

  const listUserAsign = taskDetail.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetail, listUserAsign };
  try {
    const { data } = yield call(() => projectService.updateTask(taskUpdateApi));

    yield put({
      type: PROJECT_DETAIL_SAGA,
      idProject: data.content.projectId,
    });

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      idTask: taskUpdateApi.taskId,
    });

    openNotification("success", `${data.message}`);
  } catch (err) {
    openNotification("error", `${err.response?.data.message}`);
    console.log(err.response?.data);
  }
}

export function* theoDoiHandelChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    //Cập nhật api status cho task hiện tại (Task đang mở modal)
    yield call(() => projectService.updateStatusTask(taskUpdateStatus));

    //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task
    yield put({
      type: PROJECT_DETAIL_SAGA,
      idProject: taskUpdateStatus.projectId,
    });

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      idTask: taskUpdateStatus.taskId,
    });
  } catch (err) {
    openNotification("error", `${err.response?.data.message}`);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}
