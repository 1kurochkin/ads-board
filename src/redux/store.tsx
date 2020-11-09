import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleWare from "redux-thunk";

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {mainStateReducer} from "./reducers/mainState/mainState";
import { authorizationStateReducer } from "./reducers/authorizationState/authorizationState";
import {searchBoxStateReducer} from "./reducers/searchBoxState/searchBoxState";
import {feedStateReducer} from "./reducers/feedState/feedState";
import { settingsStateReducer } from "./reducers/settingsState/settingsState";
import {announcementStateReducer} from "./reducers/announcementState/announcementState";
import {myAnnouncementsStateReducer} from "./reducers/myAnnouncementState/myAnnouncementState";
import {announcementsListStateReducer} from "./reducers/announcementsListState/announcementsListState";
import formStateReducer from "./reducers/formState/formState";

export const history = createBrowserHistory()

const reducers = () => combineReducers({
    router: connectRouter(history),
    mainState: mainStateReducer,
    announcementsListState: announcementsListStateReducer,
    formState: formStateReducer,
    feedState: feedStateReducer,
    searchBoxState: searchBoxStateReducer,
    announcementState: announcementStateReducer,
    myAnnouncementsState: myAnnouncementsStateReducer,
    settingsState: settingsStateReducer,
    authorizationState: authorizationStateReducer
})

type rootReducerType = typeof reducers
export type AppStateType = ReturnType<rootReducerType>

const store = createStore(reducers(), applyMiddleware(routerMiddleware(history), thunkMiddleWare))

export default store