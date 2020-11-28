import {
    RESET_TO_INITIAL_ANNOUNCEMENT_STATE,
    SET_ANNOUNCEMENT,
    SET_IS_FETCHING_ANNOUNCEMENT_REDUCER
} from "./announcementState"

export type SetAnnouncementsACType = { type: typeof SET_ANNOUNCEMENT, payload: { value: boolean }}
export type SettIsFetchingAnnouncementReducerACType = { type: typeof SET_IS_FETCHING_ANNOUNCEMENT_REDUCER, payload: { value: boolean }}

export const setAnnouncementAC = (value:boolean):SetAnnouncementsACType => ({ type: SET_ANNOUNCEMENT, payload: {value} })
export const resetToInitialAnnouncementStateAC = () => ({ type: RESET_TO_INITIAL_ANNOUNCEMENT_STATE })
export const settIsFetchingAnnouncementReducerAC = (value:boolean):SettIsFetchingAnnouncementReducerACType => ({ type: SET_IS_FETCHING_ANNOUNCEMENT_REDUCER, payload: {value} })