import { call, put, takeLatest } from "redux-saga/effects";
import { statusService } from "services/StatusService";
import { GET_ALL_STATUS } from "stores/Types/StatusTypes";
import { GET_ALL_STATUS_SAGA } from "./types/StatusTypeSaga";

function* getAllStatus() {
  try {
    const { data } = yield call(() => statusService.getAllStatus());
    yield put({ type: GET_ALL_STATUS, listStatus: data.content });
  } catch (error) {
    console.log((error as any).response?.data);
  }
}

export function* getAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
