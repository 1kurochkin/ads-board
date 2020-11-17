import {RESET_TO_DEFAULT_STATE_ALL_REDUCERS} from "../mainState/mainState";

export const SET_IS_FETCHING_FEED_REDUCER = "SET_IS_FETCHING_FEED_REDUCER"
export const SET_LAST_ANNOUNCEMENTS = "SET_LAST_ANNOUNCEMENTS"

type initialStateType = typeof initialState
const initialState = {
    lastAnnouncements: [],
    isFetching: false,
    descriptionSalamRu: ""
}

export const feedStateReducer = (state = initialState, action: any): initialStateType => {
    const {type, payload } = action
    const { value, withConcat = false } = payload || {}
    const {lastAnnouncements} = state

    switch (type) {
        case SET_LAST_ANNOUNCEMENTS :
            console.log("SET_LAST_ANNOUNCEMENTS", value)
            const newLastAnnouncements = withConcat ? lastAnnouncements.concat(value) : value
            return {...state, lastAnnouncements: newLastAnnouncements}
        case SET_IS_FETCHING_FEED_REDUCER :
            console.log("SET_IS_FETCHING_FEED_REDUCER", value)
            return {...state, isFetching: value}
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}