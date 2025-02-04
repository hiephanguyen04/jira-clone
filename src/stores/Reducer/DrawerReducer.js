import {
  HIDE_DRAWER,
  OPENT_FORM_CREATE_TASK,
  OPEN_PROM_EDIT_PROJECT,
} from "stores/Types/DrawerTypes";

const initialState = {
  title: "",
  visible: false,
  component: <p>component</p>,
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_DRAWER:
      return { ...state, visible: false };

    case OPEN_PROM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        component: action.component,
        title: action.title,
      };
    }
    case OPENT_FORM_CREATE_TASK: {
      return {
        ...state,
        visible: true,
        component: action.component,
        title: action.title,
      };
    }
    default:
      return state;
  }
};
