import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  EDIT_PROJECT,
  GET_ALL_PROJECT,
  GET_TASK_DETAIL,
  PROJECT_DETAIL,
  REMOVE_USER_ASSIGN,
} from "stores/Types/ProjectTypes";

const initialState = {
  listProject: [],
  editProject: [],
  projectDetail: [],
  taskDetail: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return { ...state, listProject: action.listProject };
    case EDIT_PROJECT:
      return { ...state, editProject: action.editProject };
    case PROJECT_DETAIL:
      return { ...state, projectDetail: action.projectDetail };
    case GET_TASK_DETAIL:
      return { ...state, taskDetail: action.taskDetail };

    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      console.log("value change task modal", value);
      // console.log(state.taskDetail)
      return {
        ...state,
        taskDetail: { ...state.taskDetail, [name]: value },
      };
    }

    case CHANGE_ASSIGNESS: {
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness,
        action.userSelected,
      ];
      // console.log('state',state)
      return { ...state };
    }

    case REMOVE_USER_ASSIGN: {
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness.filter(
          (us) => us.id !== action.userId
        ),
      ];
      return { ...state };
    }
    default:
      return state;
  }
};
