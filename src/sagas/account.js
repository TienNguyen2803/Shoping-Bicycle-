import { all, call, fork, put, takeEvery,delay, takeLatest } from "redux-saga/effects";
import * as Types from "constants/ActionTypes";
import * as actions from "../actions/account";
import * as api from "../api/account";
function* listAccount() {
  try {
    const list_account = yield call(api.getListAccount);
    yield put(actions.getListAccountSuccess(list_account));
  } catch (error) {
    console.log(error);
  }
}

function* createAccountRequest({ payload }) {
  try {
    const { firstname, lastname, email, password, address } = payload.data;
    const body = { firstname, lastname, email, password, address };
    const user = yield call(api.createAccount, body);
    yield put(actions.createAccountSuccess(user));
  } catch (error) {
    console.log(error);
  }
}
function* getAccountRequest({ payload }) {
  try {
    const { id } = payload;
    const account = yield call(api.getAccountById,  id);
    yield put(actions.getAccountSuccess(account));
  } catch (error) {
    console.log(error);
  }
}
function* updateAccountRequest({ payload }) {
  try {
    const account = payload.data;
    const _account = yield call(api.updateAccount, account);
    yield put(actions.updateAccountSuccess(_account));
  } catch (error) {
    console.log(error);
  }
}
function* disableAccountRequest({ payload }) {
  try {
    const id = payload.data;
    const account = yield call(api.disableAccount, {id:id});
    yield put(actions.disableAccountSuccess(account));
  } catch (error) {
    console.log(error);
  }
}
function* filterAccountRequest({ payload }) {
  try {
    yield delay(500);
    const keyword = payload.keyword;
    yield put(actions.filterAccountSuccess({keyword:keyword}))
  } catch (error) {
    console.log(error);
  }
}

export function* getListAccount() {
  yield takeEvery(Types.GET_LIST_ACCOUNT, listAccount);
}
export function* createAccount() {
  yield takeLatest(Types.CREATE_ACCOUNT, createAccountRequest);
}
export function* getAccount() {
  yield takeLatest(Types.GET_ACCOUNT, getAccountRequest);
}
export function* updateAccount() {
  yield takeLatest(Types.UPDATE_ACCOUNT, updateAccountRequest);
}
export function* disableAccount() {
  yield takeLatest(Types.DISABLE_ACCOUNT, disableAccountRequest);
}
export function* filterAccount() {
  yield takeLatest(Types.FILTER_ACCOUNT, filterAccountRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getListAccount),
    fork(createAccount),
    fork(getAccount),
    fork(updateAccount),
    fork(disableAccount),
    fork(filterAccount),
  ]);
}
