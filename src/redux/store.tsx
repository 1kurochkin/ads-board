import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleWare from "redux-thunk";

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {mainStateReducer} from "./mainState/mainState";
import { authorizationStateReducer } from "./authorizationState/authorizationState";

export const history = createBrowserHistory()

const reducers = () => combineReducers({
    router: connectRouter(history),
    mainState: mainStateReducer,
    authorizationState: authorizationStateReducer
})

type rootReducerType = typeof reducers
export type AppStateType = ReturnType<rootReducerType>

const store = createStore(reducers(), applyMiddleware(routerMiddleware(history), thunkMiddleWare))

export default store