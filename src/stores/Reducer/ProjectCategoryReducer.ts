import {
  GET_ALL_CATEGORY,
  ProjectCategory,
  ProjectCategoryState,
} from "stores/Types/ProjectCategoryTypes";

interface ProjectCategoryAction {
  type: string;
  listCategory?: ProjectCategory[];
}

const initialState: ProjectCategoryState = {
  listCategory: [],
};

export const projectCategoryReducer = (
  state = initialState,
  action: ProjectCategoryAction
): ProjectCategoryState => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return { ...state, listCategory: action.listCategory || [] };
    default:
      return state;
  }
};
