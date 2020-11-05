import {MainStateActionTypes} from "./mainStateActionCreators";

export const getItemFromLocalStorage = (feild:string) => localStorage.getItem(feild)
export const setItemToLocalStorage = (feild:string, value:any) => localStorage.setItem(feild, value)
export const clearLocalStorage = () => localStorage.clear()

export const SET_IS_SENDING_DATA = "SET_IS_SENDING_DATA"

type initialStateType = typeof initialState
const initialState = {
    isSendingData: false
}

export const mainStateReducer = (state = initialState, action : MainStateActionTypes): initialStateType => {
    const {type, payload } = action
    const { value } = payload || {}

    switch (type) {
        case SET_IS_SENDING_DATA :
            console.log("SET_IS_SENDING_DATA", value)
            return {...state, isSendingData: value}
        default: return state
    }
}