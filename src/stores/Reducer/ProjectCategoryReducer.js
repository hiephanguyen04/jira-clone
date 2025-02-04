import { GET_ALL_CATEGORY } from "stores/Types/ProjectCategoryTypes"

const initialState = {
  listCategory:[]
}

export const projectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_CATEGORY:
    return { ...state, listCategory:action.listCategory }

  default:
    return state
  }
}
