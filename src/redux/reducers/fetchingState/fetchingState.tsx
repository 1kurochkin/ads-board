import {LOCATION_CHANGE} from "connected-react-router";
import {PATH_SEARCH} from "../../../app/App";
import {getLastAnnouncementsThunk} from "../../thunks/thunks";

export const SET_IS_FETCHING = "SET_IS_FETCHING"
export const SET_IS_EMPTY_RESPONSE = "SET_IS_EMPTY_RESPONSE"
export const SET_IS_ERROR_FETCH = "SET_IS_ERROR_FETCH"
export const SET_INITIATOR_THUNK = "SET_INITIATOR_THUNK"

type initialStateType = typeof initialState

const baseState = {
    isFetching: false,
    isEmptyResponse: false,
    isErrorFetch: false,
}
const initialState = {
    authorization: {...baseState},
    feed: {...baseState},
    myAnnouncements: {...baseState},
    announcementsList: {...baseState},
    announcement: {...baseState},
    settings: {...baseState},
    createAnnouncement: {...baseState},
}

export const fetchingStateReducer = (state = initialState, action : any): initialStateType => {
    const {type, payload } = action
    const { field, value, location : {pathname = "/"} = {} } = payload || {}
    // @ts-ignore
    const prevStateByField = state[field]

    switch (type) {
        case SET_IS_FETCHING :
            console.log("SET_IS_FETCHING", field, value)
            return {...state, [field] : {...prevStateByField, isFetching: value} }
        case SET_INITIATOR_THUNK :
            console.log("SET_INITIATOR_THUNK", field, value)
            return {...state, [field] : {...prevStateByField, isFetching: value} }
        case SET_IS_EMPTY_RESPONSE :
            console.log("SET_IS_EMPTY_RESPONSE", field, value)
            return {...state, [field] : {...prevStateByField, isEmptyResponse: value} }
        case SET_IS_ERROR_FETCH :
            console.log("SET_IS_ERROR_FETCH", field, value)
            return {...state, [field] : {...prevStateByField, isErrorFetch: value} }
        case LOCATION_CHANGE :
            console.log("LOCATION_CHANGE", payload)
            !pathname.includes(PATH_SEARCH) &&  window.scrollTo(0,50)
            return state
        default: return state
    }
}