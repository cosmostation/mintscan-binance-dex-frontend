import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import penderMiddleware from "redux-pender";

import * as modules from "./modules";

// combineReducers는 모든 리듀서함수를 하나로 합친다.
const reducers = combineReducers(modules);
// 리덕스를 사용 하면서 비동기 작업 (예: 네트워크 요청) 을 다룰 때는 미들웨어가 있어야 더욱 손쉽게 상태를 관리 할 수 있다.
const middlewares = [penderMiddleware()];

// 개발모드일때만 redux devtools적용
const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

const configure = () => createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

export default configure;
