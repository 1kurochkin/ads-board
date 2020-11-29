import {
    SET_MY_ANNOUNCEMENTS,
    SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER,
    SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER,
    DELETE_MY_ANNOUNCEMENT_BY_ID,
    RESET_TO_INITIAL_STATE_MY_ANNOUNCEMENTS
} from "./myAnnouncementState"

export type SetMyAnnouncementsACType =
    { type: typeof SET_MY_ANNOUNCEMENTS, payload: { value: Array<any> }}

export type SetCurrentPageMyAnnouncementReducerACType = { type: typeof SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER }
export type DelMyAnnouncementByIdACType = { type: typeof DELETE_MY_ANNOUNCEMENT_BY_ID, payload: {id:number} }
export type SetTotalNumOfPageMyAnnouncementReducerACType = { type: typeof SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER, payload: { value: number } }


export const setMyAnnouncementsAC = (value:Array<any>):SetMyAnnouncementsACType =>
    ({ type: SET_MY_ANNOUNCEMENTS, payload: {value} })

export const delMyAnnouncementByIdAC = (id:number):DelMyAnnouncementByIdACType =>
    ({ type: DELETE_MY_ANNOUNCEMENT_BY_ID, payload: {id} })

export const setCurrentPageMyAnnouncementReducerAC = ():SetCurrentPageMyAnnouncementReducerACType =>
    ({ type: SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER })

export const resetToInitialStateMyAnnouncementReducerAC = () => ({ type: RESET_TO_INITIAL_STATE_MY_ANNOUNCEMENTS })


export const setTotalNumOfPageMyAnnouncementReducerAC = (value:number):SetTotalNumOfPageMyAnnouncementReducerACType =>
    ({ type: SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER, payload: {value} })