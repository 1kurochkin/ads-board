import {
    RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER,
    SET_ANNOUNCEMENTS_LIST,
    SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER,
    SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER
} from "./announcementsListState";


export type SetAnnouncementsListACType = { type: typeof SET_ANNOUNCEMENTS_LIST, payload: { value: Array<any>, withConcat: boolean }}
export type SetCurrentPageAnnouncementsListReducerACType = { type: typeof SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER }
export type SetTotalNumOfPageAnnouncementsListReducerACType = { type: typeof SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER, payload: { value: number } }
export type ResetToInitialStateAnnouncementsListReducerACType = { type: typeof RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER }

export const setAnnouncementsListAC = (value:Array<any>, withConcat: boolean):SetAnnouncementsListACType =>
    ({ type: SET_ANNOUNCEMENTS_LIST, payload: {value, withConcat} })
export const resetToInitialStateAnnouncementsListReducerAC = ():ResetToInitialStateAnnouncementsListReducerACType => ({ type: RESET_TO_INITIAL_ANNOUNCEMENTS_LIST_REDUCER })
export const setCurrentPageAnnouncementsListReducerAC = ():SetCurrentPageAnnouncementsListReducerACType =>
    ({ type: SET_CURRENT_PAGE_ANNOUNCEMENTS_LIST_REDUCER })

export const setTotalNumOfPageAnnouncementsListReducerAC = (value:number):SetTotalNumOfPageAnnouncementsListReducerACType =>
    ({ type: SET_TOTAL_NUM_OF_PAGE_ANNOUNCEMENTS_LIST_REDUCER, payload: {value} })