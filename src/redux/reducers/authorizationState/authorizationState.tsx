import {AuthorizationStateActionTypes} from "./authorizationStateActionCreators";
import {
    getItemFromLocalStorage,
    setItemToLocalStorage,
    clearLocalStorage,
    RESET_TO_DEFAULT_STATE_ALL_REDUCERS
} from "../mainState/mainState";
import {SET_IS_FETCHING_SETTINGS_REDUCER} from "../settingsState/settingsState";

export const SET_IS_REGISTRATION = "SET_IS_REGISTRATION"
export const SET_IS_CORRECT_AUTH_DATA = "SET_IS_CORRECT_AUTH_DATA"
export const SET_IS_AUTH = "SET_IS_AUTH"
export const LOGOUT_OR_DELETE_USER = "LOGOUT_OR_DELETE_USER"

type initialStateType = typeof initialState
const initialState = {
    isRegistration: false,
    isCorrectAuthData: true,
    isAuth: () => getItemFromLocalStorage("isAuth") !== null
}

export const authorizationStateReducer = (state = initialState, action : AuthorizationStateActionTypes): initialStateType => {
    const {type, payload } = action
    const { value } = payload || {}

    switch (type) {
        case SET_IS_REGISTRATION :
            console.log("SET_IS_REGISTRATION", value)
            return {...state, isRegistration: value}
        case SET_IS_CORRECT_AUTH_DATA :
            console.log("SET_IS_CORRECT_AUTH_DATA", value)
            return {...state, isCorrectAuthData: value}
        case SET_IS_AUTH :
            console.log("SET_IS_AUTH", value)
            setItemToLocalStorage("isAuth", value)
            return {...state, isAuth: () => getItemFromLocalStorage("isAuth") !== null}
        case LOGOUT_OR_DELETE_USER:
            console.log("LOGOUT_OR_DELETE_USER")
            clearLocalStorage()
            return state
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}