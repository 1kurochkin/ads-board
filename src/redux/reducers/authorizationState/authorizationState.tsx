import {AuthorizationStateActionTypes} from "./authorizationStateActionCreators";

export const SET_IS_REGISTRATION = "SET_IS_REGISTRATION"
export const SET_IS_CORRECT_AUTH_DATA = "SET_IS_CORRECT_AUTH_DATA"
export const SET_IS_AUTH = "SET_IS_AUTH"

const getItemFromLocalStorage = (feild:string) => localStorage.getItem(feild)
const setItemToLocalStorage = (feild:string, value:any) => localStorage.setItem(feild, value)

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
        default: return state
    }
}