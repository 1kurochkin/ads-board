import {SET_CURRENT_PAGE_SEARCH_REDUCER, SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER} from "../searchBoxState/searchBoxState";
import {RESET_TO_DEFAULT_STATE_ALL_REDUCERS} from "../mainState/mainState";

export const SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER = "SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER"
export const DELETE_MY_ANNOUNCEMENT_BY_ID = "DELETE_MY_ANNOUNCEMENT_BY_ID"
export const SET_MY_ANNOUNCEMENTS = "SET_MY_ANNOUNCEMENTS"
export const SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER = "SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER"
export const SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER = "SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER"

type initialStateType = typeof initialState
const initialState = {
    myAnnouncements: [],
    currentPage: 0,
    totalNumOfPages: 1,
    isFetching: false
}

export const myAnnouncementsStateReducer = (state = initialState, action: any): initialStateType => {
    const {type, payload } = action
    const { value, id, withConcat = false } = payload || {}
    const { myAnnouncements, currentPage } = state

    switch (type) {
        case SET_MY_ANNOUNCEMENTS :
            console.log("SET_MY_ANNOUNCEMENTS", value)
            const newMyAnnouncementsSet = withConcat ? myAnnouncements.concat(value) : value
            return {...state, myAnnouncements: newMyAnnouncementsSet}
        case DELETE_MY_ANNOUNCEMENT_BY_ID :
            console.log("DELETE_MY_ANNOUNCEMENT_BY_ID", id)
            const newMyAnnouncementsDel = myAnnouncements.filter( ({id: myAnnouncementId}:any) => myAnnouncementId !== id )
            return {...state, myAnnouncements: newMyAnnouncementsDel}
        case SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER :
            console.log("SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER", value)
            return {...state, isFetching: value}
        case SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER :
            const newCurrentPage = currentPage + 1
            console.log("SET_CURRENT_PAGE_SEARCH_REDUCER", newCurrentPage)
            return {...state, currentPage: newCurrentPage}
        case SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER :
            console.log("SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER", value)
            return {...state, totalNumOfPages: value}
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}