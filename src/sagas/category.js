import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import * as Types from "constants/ActionTypes";
import * as actions from "../actions/category";
import * as api from "../api/category";
function* listCategory() {
  try {
    const list_category = yield call(api.getListCategory);
    yield put(actions.getListCategorySuccess(list_category));
  } catch (error) {
    console.log(error);
  }
}

function* createCategoryRequest({ payload }) {
  try {
    const  categoryName  = payload.data;
    const user = yield call(api.createCategory, {name :  categoryName});
    yield put(actions.createCategorySuccess(user));
  } catch (error) {
    console.log(error);
  }
}
function* getCategoryRequest({ payload }) {
  yield put("a");

//   try {
//     const { id } = payload;
//     const account = yield call(api.getAccountById,  id);
//     yield put(actions.getAccountSuccess(account));
//   } catch (error) {
//     console.log(error);
//   }
}
function* updateCategoryRequest({ payload }) {
  try {
    const category = payload.data;
    const _category = yield call(api.updateCategory, category);
    yield put(actions.updateCategorySuccess(_category));
  } catch (error) {
    console.log(error);
  }
}
function* disableCategoryRequest({ payload }) {
  try {
    const id = payload.data;
    const category = yield call(api.disableCategory, {id:id});
    yield put(actions.disableCategorySuccess(category));
  } catch (error) {
    console.log(error);
  }
}
function* filterCategoryRequest({ payload }) {
  try {
    yield delay(500);
    const keyword = payload.keyword;
    yield put(actions.filterCategorySuccess({keyword:keyword}))
  } catch (error) {
    console.log(error);
  }
}

export function* getListCategory() {
  yield takeLatest(Types.GET_LIST_CATEGORY, listCategory);
}
export function* createCategory() {
  yield takeLatest(Types.CREATE_CATEGORY, createCategoryRequest);
}
export function* getCategory() {
  yield takeLatest(Types.GET_CATEGORY, getCategoryRequest);
}
export function* updateCategory() {
  yield takeLatest(Types.UPDATE_CATEGORY, updateCategoryRequest);
}
export function* disableCategory() {
  yield takeLatest(Types.DISABLE_CATEGORY, disableCategoryRequest);
}
export function* filterCategory() {
  yield takeLatest(Types.FILTER_CATEGORY, filterCategoryRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getListCategory),
    fork(createCategory),
    fork(getCategory),
    fork(updateCategory),
    fork(disableCategory),
    fork(filterCategory),
  ]);
}
