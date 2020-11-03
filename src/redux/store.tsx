import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleWare from "redux-thunk";

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {mainStateReducer} from "./reducers/mainState/mainState";
import { authorizationStateReducer } from "./reducers/authorizationState/authorizationState";
import {searchBoxStateReducer} from "./reducers/searchBoxState/searchBoxState";

export const history = createBrowserHistory()

const reducers = () => combineReducers({
    router: connectRouter(history),
    mainState: mainStateReducer,
    searchBoxState: searchBoxStateReducer,
    authorizationState: authorizationStateReducer
})

type rootReducerType = typeof reducers
export type AppStateType = ReturnType<rootReducerType>

const store = createStore(reducers(), applyMiddleware(routerMiddleware(history), thunkMiddleWare))

export default store