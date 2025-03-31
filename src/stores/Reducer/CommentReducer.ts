import { CommentState } from "stores/Types/CommentTypes";

interface CommentAction {
  type: string;
  // Add other properties as needed
}

const initialState: CommentState = {
  // Initialize state as needed
};

export const commentReducer = (
  state = initialState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case "":
      return { ...state };
    default:
      return state;
  }
};
