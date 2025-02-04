import { GET_ALL_PRIORITY } from "stores/Types/PriorityTypes"

const initialState = {
  listPriority:[]
}

export const priorityReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_PRIORITY:
    return { ...state ,listPriority:action.listPriority}

  default:
    return state
  }
}
