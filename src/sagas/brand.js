import { all, call, fork, put,delay, takeLatest } from "redux-saga/effects";
import * as Types from "constants/ActionTypes";
import * as actions from "../actions/brand";
import * as api from "../api/brand";
function* listBrand() {
  try {
    const list_brand = yield call(api.getListBrand);
    yield put(actions.getListBrandSuccess(list_brand));
  } catch (error) {
    console.log(error);
  }
}

function* createBrandRequest({ payload }) {
  try {
    const  brandName  = payload.data;
    const user = yield call(api.createBrand, {name :  brandName});
    yield put(actions.createBrandSuccess(user));
  } catch (error) {
    console.log(error);
  }
}
function* getBrandRequest({ payload }) {
  yield put("a");

//   try {
//     const { id } = payload;
//     const account = yield call(api.getAccountById,  id);
//     yield put(actions.getAccountSuccess(account));
//   } catch (error) {
//     console.log(error);
//   }
}
function* updateBrandRequest({ payload }) {
  try {
    const brand = payload.data;
    const _brand = yield call(api.updateBrand, brand);
    yield put(actions.updateBrandSuccess(_brand));
  } catch (error) {
    console.log(error);
  }
}
function* disableBrandRequest({ payload }) {
  try {
    const id = payload.data;
    const brand = yield call(api.disableBrand, {id:id});
    yield put(actions.disableBrandSuccess(brand));
  } catch (error) {
    console.log(error);
  }
}
function* filterBrandRequest({ payload }) {
  try {
    yield delay(500);
    const keyword = payload.keyword;
    yield put(actions.filterBrandSuccess({keyword:keyword}))
  } catch (error) {
    console.log(error);
  }
}

export function* getListBrand() {
  yield takeLatest(Types.GET_LIST_BRAND, listBrand);
}
export function* createBrand() {
  yield takeLatest(Types.CREATE_BRAND, createBrandRequest);
}
export function* getBrand() {
  yield takeLatest(Types.GET_BRAND, getBrandRequest);
}
export function* updateBrand() {
  yield takeLatest(Types.UPDATE_BRAND, updateBrandRequest);
}
export function* disableBrand() {
  yield takeLatest(Types.DISABLE_BRAND, disableBrandRequest);
}
export function* filterBrand() {
  yield takeLatest(Types.FILTER_BRAND, filterBrandRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getListBrand),
    fork(createBrand),
    fork(getBrand),
    fork(updateBrand),
    fork(disableBrand),
    fork(filterBrand),
  ]);
}
