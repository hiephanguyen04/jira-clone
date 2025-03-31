import { GET_ALL_STATUS, Status, StatusState } from "stores/Types/StatusTypes";

interface StatusAction {
  type: string;
  listStatus?: Status[];
}

const initialState: StatusState = {
  listStatus: [],
};

export const statusReducer = (
  state = initialState,
  action: StatusAction
): StatusState => {
  switch (action.type) {
    case GET_ALL_STATUS:
      return { ...state, listStatus: action.listStatus || [] };
    default:
      return state;
  }
};
