import { call, put, takeLatest } from "redux-saga/effects";
import { projectCategoryService } from "services/ProjectCategoryService";
import { GET_ALL_CATEGORY } from "stores/Types/ProjectCategoryTypes";
import { GET_ALL_CATEGORY_SAGA } from "./types/ProjectCategoryTypeSaga";

function* getAllCategory() {
  try {
    const { data } = yield call(() =>
      projectCategoryService.getAllProjectCategory()
    );
    yield put({ type: GET_ALL_CATEGORY, listCategory: data.content });
  } catch (error) {
    console.log((error as any).response?.data);
  }
}

export function* getAllCategorySaga() {
  yield takeLatest(GET_ALL_CATEGORY_SAGA, getAllCategory);
}
