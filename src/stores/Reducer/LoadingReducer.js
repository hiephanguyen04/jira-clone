import { HIDE_LOADING_BTN, SHOW_LOADING_BTN } from "stores/Types/LoadingTypes";

const initialState = {
  isLoadingBtn: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING_BTN:
      return { ...state, isLoadingBtn: true };
    case HIDE_LOADING_BTN:
      return { ...state, isLoadingBtn: false };

    default:
      return state;
  }
};
