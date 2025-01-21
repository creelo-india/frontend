import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import productSaga from './productSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with both default middleware and sagaMiddleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(productSaga);

export default store;
