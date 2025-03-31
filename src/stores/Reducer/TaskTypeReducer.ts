import {
  GET_ALL_TASK_TYPE,
  TaskType,
  TaskTypeState,
} from "stores/Types/TaskTypeTypes";

interface TaskTypeAction {
  type: string;
  listTaskType?: TaskType[];
}

const initialState: TaskTypeState = {
  listTaskType: [],
};

export const taskTypeReducer = (
  state = initialState,
  action: TaskTypeAction
): TaskTypeState => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE:
      return { ...state, listTaskType: action.listTaskType || [] };
    default:
      return state;
  }
};
