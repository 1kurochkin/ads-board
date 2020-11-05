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
    const { value } = payload || {}

    switch (type) {
        case SET_LAST_ANNOUNCEMENTS :
            console.log("SET_LAST_ANNOUNCEMENTS", value)
            return {...state, lastAnnouncements: value}
        case SET_IS_FETCHING_FEED_REDUCER :
            console.log("SET_IS_FETCHING_FEED_REDUCER", value)
            return {...state, isFetching: value}
        default: return state
    }
}