import {
    RESET_TO_DEFAULT_STATE_ALL_REDUCERS, SET_IS_VISIBLE_CONTEST_BANNER,
    SET_SUBWAY_STATIONS_DATA
} from "./mainState";

export type MainStateActionTypes  = SetSubwayStationsDataACType
export type SetSubwayStationsDataACType = { type: typeof SET_SUBWAY_STATIONS_DATA, payload: { value: Array<any> }}

export const resetToDefaultAllReducersAC = () => ({ type: RESET_TO_DEFAULT_STATE_ALL_REDUCERS })
export const setSubwayStationsDataAC = (value:Array<any>):SetSubwayStationsDataACType => ({ type: SET_SUBWAY_STATIONS_DATA, payload: {value} })
export const setIsVisibleContestBannerAC = (value:boolean) => ({ type: SET_IS_VISIBLE_CONTEST_BANNER, payload: {value} })