import { call, put, takeEvery } from "redux-saga/effects";
import apiInternal from "../lib/apiInternal";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./productSlice";

function* fetchProductsWorker() {
  try {
    // Use Next.js API route which handles caching with revalidate
    const response = yield call(apiInternal.get, "/api/products");

    if (response.data) {
      yield put(fetchProductsSuccess(response.data));
    } else {
      yield put(fetchProductsFailure("Invalid response from server"));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch products. Please try again.";
    yield put(fetchProductsFailure(errorMessage));
  }
}

function* watchFetchProducts() {
  yield takeEvery(fetchProductsRequest.type, fetchProductsWorker);
}

export default watchFetchProducts;
