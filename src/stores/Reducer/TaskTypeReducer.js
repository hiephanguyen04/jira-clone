import { GET_ALL_TASK_TYPE } from "stores/Types/TaskTypeTypes"

const initialState = {
  listTaskType:[]
}

export const taskTypeReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_TASK_TYPE:
    return { ...state , listTaskType:action.listTaskType}

  default:
    return state
  }
}
