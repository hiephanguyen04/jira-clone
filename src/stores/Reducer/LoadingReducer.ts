import {
  HIDE_LOADING_BTN,
  LoadingState,
  SHOW_LOADING_BTN,
} from "stores/Types/LoadingTypes";

interface LoadingAction {
  type: string;
}

const initialState: LoadingState = {
  isLoadingBtn: false,
};

export const loadingReducer = (
  state = initialState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case SHOW_LOADING_BTN:
      return { ...state, isLoadingBtn: true };
    case HIDE_LOADING_BTN:
      return { ...state, isLoadingBtn: false };
    default:
      return state;
  }
};
