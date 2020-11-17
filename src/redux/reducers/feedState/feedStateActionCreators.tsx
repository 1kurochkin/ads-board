import { SET_LAST_ANNOUNCEMENTS, SET_IS_FETCHING_FEED_REDUCER } from "./feedState"

export type SetLastAnnouncementsACType = { type: typeof SET_LAST_ANNOUNCEMENTS, payload: { value: Array<any> , withConcat:boolean}}
export type SetetIsFetchingFeedReducerACType = { type: typeof SET_IS_FETCHING_FEED_REDUCER, payload: { value: boolean }}

export const setLastAnnouncementsAC = (value:Array<any>, withConcat:boolean):SetLastAnnouncementsACType => ({ type: SET_LAST_ANNOUNCEMENTS, payload: {value, withConcat} })
export const setIsFetchingFeedReducerAC = (value:boolean):SetetIsFetchingFeedReducerACType => ({ type: SET_IS_FETCHING_FEED_REDUCER, payload: {value} })