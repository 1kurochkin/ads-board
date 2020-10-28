import {LOCATION_CHANGE} from "connected-react-router";
import {MainStateActionTypes} from "./mainStateActionCreators";

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