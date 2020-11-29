import {
    SET_IS_ERROR_FETCH, SET_IS_EMPTY_RESPONSE, SET_IS_FETCHING,
} from "./fetchingState";

export type SetIsFetchingACType = { type: typeof SET_IS_FETCHING, payload: { field:string, value: boolean }}
export type SetIsEmptyResponseACType = { type: typeof SET_IS_EMPTY_RESPONSE, payload: { field:string, value: boolean }}
export type SetIsErrorFetchACType = { type: typeof SET_IS_ERROR_FETCH, payload: { field:string, value: boolean }}

export const setIsFetchingAC = (field:string, value:boolean):SetIsFetchingACType => ({ type: SET_IS_FETCHING, payload: {field, value} })
export const setIsEmptyResponseAC = (field:string, value:boolean):SetIsEmptyResponseACType => ({ type: SET_IS_EMPTY_RESPONSE, payload: {field, value} })
export const setIsErrorFetchAC = (field:string, value:boolean):SetIsErrorFetchACType => ({ type: SET_IS_ERROR_FETCH, payload: {field, value} })