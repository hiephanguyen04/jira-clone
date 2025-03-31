import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  EDIT_PROJECT,
  GET_ALL_PROJECT,
  GET_TASK_DETAIL,
  Project,
  PROJECT_DETAIL,
  ProjectState,
  REMOVE_USER_ASSIGN,
  TaskDetail,
} from "stores/Types/ProjectTypes";

interface ProjectAction {
  type: string;
  listProject?: Project[];
  editProject?: Project[];
  projectDetail?: any;
  taskDetail?: TaskDetail;
  name?: string;
  value?: any;
  userSelected?: { id: number; avatar: string; name: string };
  userId?: number;
}

const initialState: ProjectState = {
  listProject: [],
  editProject: [],
  projectDetail: {},
  taskDetail: {} as TaskDetail,
};

export const projectReducer = (
  state = initialState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return { ...state, listProject: action.listProject || [] };

    case EDIT_PROJECT:
      return { ...state, editProject: action.editProject || [] };

    case PROJECT_DETAIL:
      return { ...state, projectDetail: action.projectDetail || {} };

    case GET_TASK_DETAIL:
      return { ...state, taskDetail: action.taskDetail || ({} as TaskDetail) };

    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      if (!name) return state;
      return {
        ...state,
        taskDetail: { ...state.taskDetail, [name]: value },
      };
    }

    case CHANGE_ASSIGNESS: {
      if (!action.userSelected || !state.taskDetail.assigness) return state;
      return {
        ...state,
        taskDetail: {
          ...state.taskDetail,
          assigness: [...state.taskDetail.assigness, action.userSelected],
        },
      };
    }

    case REMOVE_USER_ASSIGN: {
      if (!action.userId || !state.taskDetail.assigness) return state;
      return {
        ...state,
        taskDetail: {
          ...state.taskDetail,
          assigness: [
            ...state.taskDetail.assigness.filter(
              (us) => us.id !== action.userId
            ),
          ],
        },
      };
    }

    default:
      return state;
  }
};
