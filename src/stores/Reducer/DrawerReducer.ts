import React, { ReactNode } from "react";
import {
  HIDE_DRAWER,
  OPENT_FORM_CREATE_TASK,
  OPEN_PROM_EDIT_PROJECT,
} from "stores/Types/DrawerTypes";

interface DrawerState {
  title: string;
  visible: boolean;
  component: ReactNode;
}

interface DrawerAction {
  type: string;
  component?: ReactNode;
  title?: string;
}

const initialState: DrawerState = {
  title: "",
  visible: false,
  component: React.createElement("p", null, "component"),
};

export const drawerReducer = (
  state = initialState,
  action: DrawerAction
): DrawerState => {
  switch (action.type) {
    case HIDE_DRAWER:
      return { ...state, visible: false };

    case OPEN_PROM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        component: action.component ?? state.component,
        title: action.title ?? state.title,
      };
    }
    case OPENT_FORM_CREATE_TASK: {
      return {
        ...state,
        visible: true,
        component: action.component ?? state.component,
        title: action.title ?? state.title,
      };
    }
    default:
      return state;
  }
};
