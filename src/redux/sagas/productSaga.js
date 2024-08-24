import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../actions/productActions";

function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, "https://fakestoreapi.com/products");
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchFetchProducts() {
  yield takeEvery("FETCH_PRODUCTS_REQUEST", fetchProductsSaga);
}
