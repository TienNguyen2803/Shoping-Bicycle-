import {all} from 'redux-saga/effects';
import accountSagas from './account';
import categorySagas from './category';
import brandSagas from './brand';
import productSagas from './product';

export default function* rootSaga(getState) {
    yield all([
        accountSagas(),
        categorySagas(),
        brandSagas(),
        productSagas(),
    ]);
}
