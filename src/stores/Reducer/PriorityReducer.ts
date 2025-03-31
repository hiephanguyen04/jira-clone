import {
  GET_ALL_PRIORITY,
  Priority,
  PriorityState,
} from "stores/Types/PriorityTypes";

interface PriorityAction {
  type: string;
  listPriority?: Priority[];
}

const initialState: PriorityState = {
  listPriority: [],
};

export const priorityReducer = (
  state = initialState,
  action: PriorityAction
): PriorityState => {
  switch (action.type) {
    case GET_ALL_PRIORITY:
      return { ...state, listPriority: action.listPriority || [] };
    default:
      return state;
  }
};
