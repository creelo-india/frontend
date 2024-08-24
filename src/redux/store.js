import rootSaga from "./sagas/rootSaga";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store;
