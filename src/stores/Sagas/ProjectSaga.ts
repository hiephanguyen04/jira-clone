import { NavigateFunction } from "react-router-dom";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { projectService } from "services/ProjectService";
import { RootState } from "stores";
import { HIDE_DRAWER } from "stores/Types/DrawerTypes";
import { HIDE_LOADING_BTN, SHOW_LOADING_BTN } from "stores/Types/LoadingTypes";
import { HIDE_MODAL } from "stores/Types/ModalTypes";
import {
  AssignUserParams,
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CreateProjectParams,
  CreateTaskParams,
  GET_ALL_PROJECT,
  GET_TASK_DETAIL,
  PROJECT_DETAIL,
  REMOVE_USER_ASSIGN,
  UpdateProjectParams,
  UpdateTaskStatusParams,
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
    console.log((error as any).response?.data);
  }
}

export function* getAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProject);
}

interface CreateProjectAction {
  type: string;
  newProject: CreateProjectParams;
  navigate?: NavigateFunction;
}

function* createProject(action: CreateProjectAction) {
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

interface UpdateProjectAction {
  type: string;
  project: UpdateProjectParams;
}

function* updateProject(action: UpdateProjectAction) {
  try {
    yield call(() => projectService.updateProject(action.project));
    openNotification("success", "Edit Project Success!");
    yield put({ type: GET_ALL_PROJECT_SAGA });
    yield put({ type: HIDE_DRAWER });
  } catch (error) {
    openNotification("error", "Edit Project fail!");
    console.log((error as any).response?.data);
  }
}

export function* updateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProject);
}

interface DeleteProjectAction {
  type: string;
  idProject: number;
}

function* deleteProject(action: DeleteProjectAction) {
  try {
    yield call(() => projectService.deleteProject(action.idProject));
    openNotification("success", "Delete success!");
    yield put({ type: GET_ALL_PROJECT_SAGA });
  } catch (error) {
    openNotification("error", "Delete fail!");
    console.log((error as any).response?.data);
  }
}

export function* deleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}

interface AssignUserProjectAction {
  type: string;
  user: AssignUserParams;
}

function* assignUserProject(action: AssignUserProjectAction) {
  try {
    yield call(() => projectService.assignUserProject(action.user));
    openNotification("success", "Add user success!");
    yield put({ type: GET_ALL_PROJECT_SAGA });
    yield put({ type: "RESET_USER_SEARCH" });
  } catch (error) {
    openNotification("error", `${(error as any).response?.data.message}`);
    console.log((error as any).response?.data);
  }
}

export function* assignUserProjectSaga() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProject);
}

interface ProjectDetailAction {
  type: string;
  idProject: number;
}

function* projectDetail(action: ProjectDetailAction) {
  try {
    const { data } = yield call(() =>
      projectService.getProjectDetail(action.idProject)
    );
    yield put({ type: PROJECT_DETAIL, projectDetail: data.content });
  } catch (error) {
    console.log((error as any).response?.data);
  }
}

export function* projectDetailSaga() {
  yield takeLatest(PROJECT_DETAIL_SAGA, projectDetail);
}

interface CreateTaskAction {
  type: string;
  data: CreateTaskParams;
  idProject: number;
  resetForm?: () => void;
}

function* createTask(action: CreateTaskAction) {
  try {
    yield put({ type: SHOW_LOADING_BTN });
    yield delay(500);
    yield call(() => projectService.createTask(action.data));
    yield put({ type: PROJECT_DETAIL_SAGA, idProject: action.idProject });
    yield put({ type: HIDE_DRAWER });
    if (action.resetForm) {
      action.resetForm();
    }
    openNotification("success", "Create task success!");
    yield put({ type: HIDE_LOADING_BTN });
  } catch (error) {
    openNotification("error", `${(error as any).response?.data.message}`);
    yield put({ type: HIDE_LOADING_BTN });
    console.log((error as any).response?.data);
  }
}

export function* createTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTask);
}

interface DeleteUserFromProjectAction {
  type: string;
  userProject: AssignUserParams;
}

function* deleteUserPromProject(action: DeleteUserFromProjectAction) {
  try {
    yield call(() => projectService.deleteUserFromProject(action.userProject));
    openNotification("success", "Delete user success!");
    yield put({
      type: PROJECT_DETAIL_SAGA,
      idProject: action.userProject.projectId,
    });
  } catch (error) {
    openNotification("error", `${(error as any).response?.data.message}`);
    console.log((error as any).response?.data);
  }
}

export function* deleteUserFromProjectSaga() {
  yield takeLatest(DELETE_USER_FROM_PROJECT_SAGA, deleteUserPromProject);
}

interface GetTaskDetailAction {
  type: string;
  idTask: number;
}

function* getTaskDetail(action: GetTaskDetailAction) {
  try {
    const { data } = yield call(() =>
      projectService.getTaskDetail(action.idTask)
    );
    yield put({ type: GET_TASK_DETAIL, taskDetail: data.content });
    // yield put({ type: PROJECT_DETAIL_SAGA, idProject: data.content.projectId });
    // yield put({ type: SHOW_MODAL });
  } catch (error) {
    console.log((error as any).response?.data);
  }
}

export function* getTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

interface DeleteTaskAction {
  type: string;
  idTask: number;
  idProject: number;
}

function* deleteTask(action: DeleteTaskAction) {
  try {
    yield projectService.removeTask(action.idTask);
    yield put({ type: PROJECT_DETAIL_SAGA, idProject: action.idProject });
    openNotification("success", "Delete task success!");
    yield put({ type: HIDE_MODAL });
  } catch (error) {
    openNotification("error", `${(error as any).response?.data.message}`);
    console.log(error);
  }
}

export function* deleteTaskSaga() {
  yield takeLatest(DELETE_TASK_SAGA, deleteTask);
}

interface HandleChangePostApiAction {
  type: string;
  actionType: string;
  name?: string;
  value?: any;
  userSelected?: { id: number; avatar: string; name: string };
  userId?: number;
}

function* handelChangePostApi(action: HandleChangePostApiAction) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL: {
      const { value, name } = action;
      if (name) {
        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    }
    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      if (userSelected) {
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;
    }
    case REMOVE_USER_ASSIGN: {
      const { userId } = action;
      if (userId) {
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
    }
    default:
      return;
  }

  // Save via api updateTaskSaga
  // Get data from state.taskDetail
  let { taskDetail } = yield select((state: RootState) => state.projectReducer);

  if (!taskDetail) return;

  // Transform taskDetail data for the API
  const listUserAsign =
    taskDetail.assigness?.map((user: { id: number }) => user.id) || [];
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
    openNotification("error", `${(err as any).response?.data.message}`);
    console.log((err as any).response?.data);
  }
}

export function* theoDoiHandelChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}

interface UpdateTaskStatusAction {
  type: string;
  taskUpdateStatus: UpdateTaskStatusParams & { projectId: number };
}

function* updateTaskStatusSaga(action: UpdateTaskStatusAction) {
  const { taskUpdateStatus } = action;
  try {
    // Update status for current task
    yield call(() => projectService.updateStatusTask(taskUpdateStatus));

    // After success, call getProjectDetail saga to reorder task information
    yield put({
      type: PROJECT_DETAIL_SAGA,
      idProject: taskUpdateStatus.projectId,
    });

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      idTask: taskUpdateStatus.taskId,
    });
  } catch (err) {
    openNotification("error", `${(err as any).response?.data.message}`);
    console.log((err as any).response?.data);
  }
}

export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}
