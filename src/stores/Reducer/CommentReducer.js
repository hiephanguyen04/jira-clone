const initialState = {};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return { ...state};

    default:
      return state;
  }
};
