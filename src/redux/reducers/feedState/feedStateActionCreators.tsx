import { SET_LAST_ANNOUNCEMENTS, SET_IS_FETCHING_FEED_REDUCER } from "./feedState"

export type SetLastAnnouncementsACType = { type: typeof SET_LAST_ANNOUNCEMENTS, payload: { value: boolean }}
export type SetetIsFetchingFeedReducerACType = { type: typeof SET_IS_FETCHING_FEED_REDUCER, payload: { value: boolean }}

export const setLastAnnouncementsAC = (value:boolean):SetLastAnnouncementsACType => ({ type: SET_LAST_ANNOUNCEMENTS, payload: {value} })
export const setIsFetchingFeedReducerAC = (value:boolean):SetetIsFetchingFeedReducerACType => ({ type: SET_IS_FETCHING_FEED_REDUCER, payload: {value} })