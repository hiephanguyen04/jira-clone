import { all } from "redux-saga/effects";
import * as UserSaga from "./UserSaga";
import * as ProjectSaga from "./ProjectSaga";
import * as PrioritySaga from "./PrioritySaga";
import * as ProjectCategorySaga from "./ProjectCategorySaga";
import * as StatusSaga from "./StatusSaga";
import * as TaskTypeSaga from "./TaskTypeSaga";
export function* rootSaga() {
  yield all([
      UserSaga.loginSaga(),
      UserSaga.signupSaga(),
      UserSaga.getAllUserProjectSaga(),
      UserSaga.searchUserSaga(),


      ProjectSaga.getAllProjectSaga(),
      ProjectSaga.createProjectSaga(),
      ProjectSaga.updateProjectSaga(),
      ProjectSaga.deleteProjectSaga(),
      ProjectSaga.assignUserProjectSaga(),
      ProjectSaga.projectDetailSaga(),
      ProjectSaga.createTaskSaga(),
      ProjectSaga.deleteUserFromProjectSaga(),
      ProjectSaga.getTaskDetailSaga(),
      ProjectSaga.deleteTaskSaga(),
      ProjectSaga.theoDoiHandelChangePostApi(),
      ProjectSaga.theoDoiUpdateTaskStatusSaga(),

      ProjectCategorySaga.getAllCategorySaga(),

      TaskTypeSaga.getAllTaskTypeSaga(),

      PrioritySaga.getAllPrioritySaga(),

      StatusSaga.getAllStatusSaga()
  ]);
}
