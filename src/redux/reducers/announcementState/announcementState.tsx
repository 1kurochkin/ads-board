import {RESET_TO_DEFAULT_STATE_ALL_REDUCERS} from "../mainState/mainState";

export const SET_IS_FETCHING_ANNOUNCEMENT_REDUCER = "SET_IS_FETCHING_ANNOUNCEMENT_REDUCER"
export const SET_ANNOUNCEMENT = "SET_ANNOUNCEMENT"
export const RESET_TO_INITIAL_ANNOUNCEMENT_STATE = "RESET_TO_INITIAL_ANNOUNCEMENT_STATE"

type initialStateType = typeof initialState
const initialState = {
    announcement: {},
    isFetching: false,
}

export const announcementStateReducer = (state = initialState, action: any): initialStateType => {
    const {type, payload } = action
    const { value } = payload || {}

    switch (type) {
        case SET_ANNOUNCEMENT :
            console.log("SET_ANNOUNCEMENT", value)
            return {...state, announcement: value}
        case SET_IS_FETCHING_ANNOUNCEMENT_REDUCER :
            console.log("SET_IS_FETCHING_FEED_REDUCER", value)
            return {...state, isFetching: value}
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        case RESET_TO_INITIAL_ANNOUNCEMENT_STATE :
            console.log("RESET_TO_INITIAL_ANNOUNCEMENT_STATE")
            return initialState
        default: return state
    }
}