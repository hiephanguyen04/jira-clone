import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import {
  commentReducer,
  drawerReducer,
  loadingReducer,
  modalReducer,
  priorityReducer,
  projectCategoryReducer,
  projectReducer,
  statusReducer,
  taskTypeReducer,
  userReducer,
} from "./Reducer";
import { rootSaga } from "./Sagas";

const rootReducer = combineReducers({
  userReducer,
  commentReducer,
  priorityReducer,
  projectCategoryReducer,
  projectReducer,
  statusReducer,
  taskTypeReducer,
  loadingReducer,
  drawerReducer,
  modalReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
