import { takeEvery, put } from 'redux-saga/effects';
import { PRODUCT_LIST, SET_PRODUCT_LIST } from './constant';
// import { CONFIG } from './config'; // Import the config file for the base URL
import { CONFIG } from '../api/config';

function* getProducts() {
    // Use the baseURL from the config
    const response = yield fetch(`${CONFIG.BASE_URL}api/get-product`);
    let data = yield response.json();
    console.log("action is called", data);

    // Dispatch the action to set the product list in the state
    yield put({ type: SET_PRODUCT_LIST, data });
}

function* productSaga() {
    yield takeEvery(PRODUCT_LIST, getProducts);
}

export default productSaga;
