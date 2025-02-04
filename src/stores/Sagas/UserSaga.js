import { call, delay, put, takeLatest } from "redux-saga/effects";
import { userService } from "services/UserService";
import { HIDE_LOADING_BTN, SHOW_LOADING_BTN } from "stores/Types/LoadingTypes";
import {
  GET_ALL_USER_PROJECT,
  LOGIN,
  SEARCH_USER,
} from "stores/Types/UserTypes";
import { TOKEN, USER_LOGIN } from "utils/contants";
import { openNotification } from "utils/Notification";
import {
  GET_ALL_USER_PROJECT_SAGA,
  LOGIN_SAGA,
  REGISTER_SAGA,
  SEARCH_USER_SAGA,
} from "./types/UserTypeSaga";

function* login(action) {
  const { navigate, userLogin } = action;
  try {
    yield put({ type: SHOW_LOADING_BTN });
    yield delay(500);
    const { data } = yield call(() => userService.login(userLogin));
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    localStorage.setItem(TOKEN, data.content.accessToken);
    yield put({ type: LOGIN, userLogin: data.content });
    openNotification("success", "Login success!");
    navigate("/");
  } catch (error) {
    openNotification("error", "Login fail!");
    yield put({ type: HIDE_LOADING_BTN });
    console.log(error.response?.data);
  }
  yield put({ type: HIDE_LOADING_BTN });
}

export function* loginSaga() {
  yield takeLatest(LOGIN_SAGA, login);
}

function* signup(action) {
  const { dataForm, navigate } = action;
  try {
    yield put({ type: SHOW_LOADING_BTN });
    yield delay(500);
    const { data } = yield call(() => userService.signup(dataForm));
    console.log(data);
    openNotification("success", "Register success!");
    navigate("/login");
  } catch (error) {
    openNotification("error", "Register fail!");
    yield put({ type: HIDE_LOADING_BTN });
    console.log(error.response?.data);
  }
  yield put({ type: HIDE_LOADING_BTN });
}

export function* signupSaga() {
  yield takeLatest(REGISTER_SAGA, signup);
}

function* getAllUserProject(action) {
  console.log(action);
  try {
    const { data } = yield call(() =>
      userService.getUserByProjectId(action.idProject)
    );
    console.log(data);
    yield put({ type: GET_ALL_USER_PROJECT, userProject: data.content });
  } catch (error) {
    openNotification("error", `${error.response?.data.message}`);
    console.log(error.response?.data);
  }
}
export function* getAllUserProjectSaga() {
  yield takeLatest(GET_ALL_USER_PROJECT_SAGA, getAllUserProject);
}

export function* searchUser(action) {
  console.log(action);
  try {
    const { data } = yield call(() => userService.getUser(action.keyword));
    console.log(data);
    yield put({ type: SEARCH_USER, userSearch: data.content });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* searchUserSaga() {
  yield takeLatest(SEARCH_USER_SAGA, searchUser);
}
