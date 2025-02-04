import { GET_ALL_STATUS } from "stores/Types/StatusTypes"

const initialState = {listStatus:[]}

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_STATUS:
    return { ...state ,listStatus:action.listStatus}

  default:
    return state
  }
}
