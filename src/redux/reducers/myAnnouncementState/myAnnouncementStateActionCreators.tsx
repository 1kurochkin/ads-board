import {
    SET_MY_ANNOUNCEMENTS,
    SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER,
    SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER,
    SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER, DELETE_MY_ANNOUNCEMENT_BY_ID
} from "./myAnnouncementState"

export type SetMyAnnouncementsACType =
    { type: typeof SET_MY_ANNOUNCEMENTS, payload: { value: Array<any>, withConcat: boolean }}

export type SettIsFetchingMyAnnouncementReducerACType =
    { type: typeof SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER, payload: { value: boolean }}

export type SetCurrentPageMyAnnouncementReducerACType = { type: typeof SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER }
export type DelMyAnnouncementByIdACType = { type: typeof DELETE_MY_ANNOUNCEMENT_BY_ID, payload: {id:number} }
export type SetTotalNumOfPageMyAnnouncementReducerACType = { type: typeof SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER, payload: { value: number } }


export const setMyAnnouncementsAC = (value:Array<any>, withConcat: boolean):SetMyAnnouncementsACType =>
    ({ type: SET_MY_ANNOUNCEMENTS, payload: {value, withConcat} })

export const delMyAnnouncementByIdAC = (id:number):DelMyAnnouncementByIdACType =>
    ({ type: DELETE_MY_ANNOUNCEMENT_BY_ID, payload: {id} })

export const settIsFetchingMyAnnouncementsReducerAC = (value:boolean):SettIsFetchingMyAnnouncementReducerACType =>
    ({ type: SET_IS_FETCHING_MY_ANNOUNCEMENTS_REDUCER, payload: {value} })

export const setCurrentPageMyAnnouncementReducerAC = ():SetCurrentPageMyAnnouncementReducerACType =>
    ({ type: SET_CURRENT_PAGE_MY_ANNOUNCEMENTS_REDUCER })

export const setTotalNumOfPageMyAnnouncementReducerAC = (value:number):SetTotalNumOfPageMyAnnouncementReducerACType =>
    ({ type: SET_TOTAL_NUM_OF_PAGE_MY_ANNOUNCEMENTS_REDUCER, payload: {value} })