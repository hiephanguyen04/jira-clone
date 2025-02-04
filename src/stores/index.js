import { rootSaga } from "./Sagas";
import createSagaMiddleware from "redux-saga";
import {
  userReducer,
  commentReducer,
  priorityReducer,
  projectCategoryReducer,
  projectReducer,
  statusReducer,
  taskTypeReducer,
  loadingReducer,
  drawerReducer,modalReducer
} from "./Reducer";
const { combineReducers, applyMiddleware, createStore } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");

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
  modalReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
