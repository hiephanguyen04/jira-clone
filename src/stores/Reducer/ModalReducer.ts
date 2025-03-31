import { TaskDetail } from "components/Form/TaskDetail";
import { TitleTask } from "components/Form/TaskDetail/TitleTask";
import React from "react";
import { HIDE_MODAL, ModalState, SHOW_MODAL } from "stores/Types/ModalTypes";

interface ModalAction {
  type: string;
}

const initialState: ModalState = {
  visible: false,
  title: React.createElement("p", null, "dsads"),
  Component: React.createElement("p", null, "dsad"),
};

export const modalReducer = (
  state = initialState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        visible: true,
        title: React.createElement(TitleTask),
        Component: React.createElement(TaskDetail),
      };
    case HIDE_MODAL:
      return { ...state, visible: false };
    default:
      return state;
  }
};
