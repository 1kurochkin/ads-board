import {SET_IS_SENDING_DATA} from "./mainState";

export type MainStateActionTypes  = SetIsSendingDataACType

export type SetIsSendingDataACType = {
    type: typeof SET_IS_SENDING_DATA
    payload: { value: boolean }
}
export const setIsSendingDataAC = (value:boolean):SetIsSendingDataACType => ({ type: SET_IS_SENDING_DATA, payload: {value} })