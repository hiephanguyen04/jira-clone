import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "services/PriorityService";
import { GET_ALL_PRIORITY } from "stores/Types/PriorityTypes";
import { GET_ALL_PRIORITY_SAGA } from "./types/PriorityTypeSaga";

function* getAllPriority() {
  try {
    const { data } = yield call(() => priorityService.getAllPriority());
    yield put({ type: GET_ALL_PRIORITY, listPriority: data.content });
  } catch (error) {
    console.log((error as any).response?.data);
  }
}

export function* getAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}
