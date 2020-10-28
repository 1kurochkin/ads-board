import {LOCATION_CHANGE} from "connected-react-router";
import {AuthorizationStateActionTypes} from "./authorizationStateActionCreators";

export const SET_IS_EXIST_USER = "SET_IS_EXIST_USER"
export const SET_IS_CORRECT_AUTH_DATA = "SET_IS_CORRECT_AUTH_DATA"
export const SET_IS_AUTH = "SET_IS_AUTH"

const getItemFromLocalStorage = (feild:string) => localStorage.getItem(feild)
const setItemToLocalStorage = (feild:string, value:any) => localStorage.setItem(feild, value)

type initialStateType = typeof initialState
const initialState = {
    isExistUser: true,
    isCorrectAuthData: true,
    isAuth: () => getItemFromLocalStorage("isAuth") !== null
}

export const authorizationStateReducer = (state = initialState, action : AuthorizationStateActionTypes): initialStateType => {
    const {type, payload } = action
    const { value } = payload || {}

    switch (type) {
        case SET_IS_EXIST_USER :
            console.log("SET_IS_EXIST_USER", value)
            return {...state, isExistUser: value}
        case SET_IS_CORRECT_AUTH_DATA :
            console.log("SET_IS_CORRECT_AUTH_DATA", value)
            return {...state, isCorrectAuthData: value}
        case SET_IS_AUTH :
            console.log("SET_IS_AUTH", value)
            setItemToLocalStorage("isAuth", value)
            return {...state, isAuth: () => getItemFromLocalStorage("isAuth") !== null}
        default: return state
    }
}