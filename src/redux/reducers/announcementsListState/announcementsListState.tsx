import {RESET_TO_INITIAL_SEARCH_REDUCER} from "../searchBoxState/searchBoxState";
import {RESET_TO_DEFAULT_STATE_ALL_REDUCERS} from "../mainState/mainState";

export const SET_ANNOUNCEMENTS_LIST = "SET_ANNOUNCEMENTS_LIST"
export const SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER = "SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER"
export const SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER = "SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER"
export const RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER = "RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER"

type initialStateType = typeof initialState

const initialState = {
    announcementsList: [],
    currentPage: 0,
    totalNumOfPages: 1
}

export const announcementsListStateReducer = (state = initialState, action: any): initialStateType => {

    const {type, payload } = action
    const { value, id, withConcat = false } = payload || {}
    const { announcementsList, currentPage } = state

    switch (type) {
        case SET_ANNOUNCEMENTS_LIST:
            console.log("SET_ANNOUNCEMENTS_LIST", value)
            const newMyAnnouncementsSet = withConcat ? announcementsList.concat(value) : value
            return {...state, announcementsList: newMyAnnouncementsSet}
        case SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER:
            const newCurrentPage = currentPage + 1
            console.log("SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER", newCurrentPage)
            return {...state, currentPage: newCurrentPage}
        case SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER :
            console.log("SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER", value)
            return {...state, totalNumOfPages: value}
        case RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER :
            console.log("RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER")
            return initialState
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}