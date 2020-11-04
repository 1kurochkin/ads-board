import {
    SET_SEARCHED_DATA,
    SET_IS_FETCHING,
    SET_CURRENT_PAGE_SEARCH_REDUCER,
    SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER,
    SET_SUBWAY_STATIONS_DATA,
} from "./searchBoxState";

export const setSearchedDataAC = (value:Array<any>, withConcat:boolean):SetSearchedDataAType => ({ type: SET_SEARCHED_DATA, payload: {value, withConcat} })
export const setSubwayStationsDataAC = (value:Array<any>):SetSubwayStationsDataACType => ({ type: SET_SUBWAY_STATIONS_DATA, payload: {value} })
export const setIsFetchingAC = (value:boolean):SetIsFetchingACType => ({ type: SET_IS_FETCHING, payload: {value} })
export const setCurrentPageSearchReducerAC = (value:number):SetCurrentPageSearchReducerACType => ({ type: SET_CURRENT_PAGE_SEARCH_REDUCER, payload: {value} })
export const setTotalNumOfPageSearchReducerAC = (value:number):SetTotalNumOfPageSearchReducerACType => ({ type: SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER, payload: {value} })

export type SetSearchedDataAType = { type: typeof SET_SEARCHED_DATA, payload: { value: Array<any>, withConcat: boolean}}
export type SetSubwayStationsDataACType = { type: typeof SET_SUBWAY_STATIONS_DATA, payload: { value: Array<any> }}
export type SetIsFetchingACType = { type: typeof SET_IS_FETCHING, payload: { value: boolean }}
export type SetCurrentPageSearchReducerACType = { type: typeof SET_CURRENT_PAGE_SEARCH_REDUCER, payload: { value: number } }
export type SetTotalNumOfPageSearchReducerACType = { type: typeof SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER, payload: { value: number } }