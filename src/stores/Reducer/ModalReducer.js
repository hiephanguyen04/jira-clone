import { TaskDetail } from "components/Form/TaskDetail";
import { TitleTask } from "components/Form/TaskDetail/TitleTask";
import { HIDE_MODAL, SHOW_MODAL } from "stores/Types/ModalTypes";

const initialState = {
  visible: false,
  title: <p>dsads</p>,
  Component:<p>dsad</p>
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, visible: true ,title:<TitleTask/> , Component:<TaskDetail/> };
    case HIDE_MODAL:
      return { ...state, visible: false };

    default:
      return state;
  }
};
