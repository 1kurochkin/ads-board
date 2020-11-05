import {LOGOUT_OR_DELETE_USER, SET_IS_AUTH, SET_IS_CORRECT_AUTH_DATA, SET_IS_REGISTRATION} from "./authorizationState";

export type AuthorizationStateActionTypes  = SetIsRegistrationACType | SetIsAuthACType | SetIsCorrectAuthDataACType

export type SetIsRegistrationACType = {
    type: typeof SET_IS_REGISTRATION
    payload : { value: boolean }
}
export type SetIsAuthACType = {
    type: typeof SET_IS_AUTH | string
    payload : { value: boolean }
}
export type SetIsCorrectAuthDataACType = {
    type: typeof SET_IS_CORRECT_AUTH_DATA | string
    payload : { value: boolean }
}

export type LogoutOrDeleteUserACType = { type: typeof LOGOUT_OR_DELETE_USER | string }

export const setIsRegistrationAC = (value:boolean):SetIsRegistrationACType => ({ type: SET_IS_REGISTRATION, payload: {value} })
export const setIsCorrectAuthDataAC = (value:boolean):SetIsCorrectAuthDataACType => ({ type: SET_IS_CORRECT_AUTH_DATA, payload: {value} })
export const setIsAuthAC = (value:boolean): SetIsAuthACType => ({ type: SET_IS_AUTH, payload: {value} })
export const logoutOrDeleteUseAC = (): LogoutOrDeleteUserACType => ({ type: LOGOUT_OR_DELETE_USER })