import { call, put, takeLatest } from "redux-saga/effects"
import { taskTypeService } from "services/TaskTypeService"
import { GET_ALL_TASK_TYPE } from "stores/Types/TaskTypeTypes"
import { GET_ALL_TASK_TYPE_SAGA } from "./types/TaskTypeSaga"

function* getAllTaskType(){
    try {
        const {data} = yield call(()=>taskTypeService.getAllTaskType())
        yield put({type:GET_ALL_TASK_TYPE,listTaskType:data.content})
    } catch (error) {
        console.log(error.response?.data)
    }
}

export function* getAllTaskTypeSaga(){
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA,getAllTaskType)
}