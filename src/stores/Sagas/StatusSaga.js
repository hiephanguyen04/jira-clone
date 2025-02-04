import { GET_ALL_STATUS } from "stores/Types/StatusTypes"
import { GET_ALL_STATUS_SAGA } from "./types/StatusTypeSaga"

const { call, put, takeLatest } = require("redux-saga/effects")
const {  statusService } = require("services/StatusService")

function* getAllStatus(){
    try {
        const {data} = yield call(()=>statusService.getAllStatus())
        yield put({type:GET_ALL_STATUS,listStatus:data.content})
    } catch (error) {
        console.log(error.response?.data)
    }
}

export function* getAllStatusSaga(){
    yield takeLatest(GET_ALL_STATUS_SAGA,getAllStatus)
}