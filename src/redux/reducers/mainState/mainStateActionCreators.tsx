import {SET_IS_FETCHING_MAIN_STATE, SET_SUBWAY_STATIONS_DATA} from "./mainState";

export type MainStateActionTypes  = SetIsFetchingMainStateACType & SetSubwayStationsDataACType

export type SetIsFetchingMainStateACType = { type: typeof SET_IS_FETCHING_MAIN_STATE, payload: { value: boolean }}
export type SetSubwayStationsDataACType = { type: typeof SET_SUBWAY_STATIONS_DATA, payload: { value: Array<any> }}


export const setIsFetchingMainStateAC = (value:boolean):SetIsFetchingMainStateACType => ({ type: SET_IS_FETCHING_MAIN_STATE, payload: {value} })
export const setSubwayStationsDataAC = (value:Array<any>):SetSubwayStationsDataACType => ({ type: SET_SUBWAY_STATIONS_DATA, payload: {value} })