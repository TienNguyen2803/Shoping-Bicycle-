import {
  all,
  call,
  fork,
  put,
  delay,
  takeLatest,
} from "redux-saga/effects";
import * as Types from "constants/ActionTypes";
import * as actions from "../actions/product";
import * as api from "../api/product";
function* listProduct() {
  try {
    const list_product = yield call(api.getListProduct);
    yield put(actions.getListProductSuccess(list_product));
  } catch (error) {
    console.log(error);
  }
}
function* createProductRequest({ payload }) {
  try {
    const _product = payload.data;
    const product = yield call(api.createProduct, _product);
    yield put(actions.createProductSuccess(product));
  } catch (error) {
    console.log(error);
  }
}

function* disableProductRequest({ payload }) {
  try {
    const id = payload.data;
    const product = yield call(api.disableProduct, { id: id });
    yield put(actions.disableProductSuccess(product));
  } catch (error) {
    console.log(error);
  }
}
function* filterProductRequest({ payload }) {
  try {
    yield delay(500);
    const keyword = payload.keyword;
    yield put(actions.filterProductSuccess({ keyword: keyword }));
  } catch (error) {
    console.log(error);
  }
}
function* getProductRequest({ payload }) {
  try {
    const id  = payload.id;
    const list_product = yield call(api.getListProduct);
    yield put(actions.getListProductSuccess(list_product));
    yield put(actions.getProductSuccess(id));
  } catch (error) {
    console.log(error);
  }
}function* updateProductRequest({ payload }) {
  try {
    const product = payload.data;
    const _product = yield call(api.updateProduct, product);
    yield put(actions.updateProductSuccess(_product));
  } catch (error) {
    console.log(error);
  }
}

export function* getListProduct() {
  yield takeLatest(Types.GET_LIST_PRODUCT, listProduct);
}
export function* createProduct() {
  yield takeLatest(Types.CREATE_PRODUCT, createProductRequest);
}
export function* disableProduct() {
  yield takeLatest(Types.DISABLE_PRODUCT, disableProductRequest);
}
export function* filterProduct() {
  yield takeLatest(Types.FILTER_PRODUCT, filterProductRequest);
}
export function* getProduct() {
  yield takeLatest(Types.GET_PRODUCT, getProductRequest);
}
export function* updateProduct() {
  yield takeLatest(Types.UPDATE_PRODUCT, updateProductRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getListProduct),
    fork(createProduct),
    fork(disableProduct),
    fork(filterProduct),
    fork(getProduct),
    fork(updateProduct),
  ]);
}
