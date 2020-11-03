import {
    SET_SEARCH_CONFIG_SEARCH_VALUE,
    SET_SEARCHED_DATA,
    SET_IS_FETCHING,
    SET_CURRENT_PAGE_SEARCH_REDUCER,
    SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER,
    SET_SEARCH_CONFIG_CATEGORY_ID,
    SET_SEARCH_CONFIG_SUBWAY_STATIONS
} from "./searchBoxState";

export const setSearchedDataAC = (value:Array<any>):SetSearchedDataAType => ({ type: SET_SEARCHED_DATA, payload: {value} })
export const setIsFetchingAC = (value:boolean):SetIsFetchingACType => ({ type: SET_IS_FETCHING, payload: {value} })
export const setCurrentPageSearchReducerAC = (value:number):SetCurrentPageSearchReducerACType => ({ type: SET_CURRENT_PAGE_SEARCH_REDUCER, payload: {value} })
export const setTotalNumOfPageSearchReducerAC = (value:number):SetTotalNumOfPageSearchReducerACType => ({ type: SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER, payload: {value} })
export const setSearchConfigCategoryIdAC = (value:number):SetSearchConfigCategoryIdACType => ({ type: SET_SEARCH_CONFIG_CATEGORY_ID, payload: {value} })
export const setSearchConfigSubwayStationsAC = (value:string):SetSearchConfigSubwayStationsACType => ({ type: SET_SEARCH_CONFIG_SUBWAY_STATIONS, payload: {value} })
export const setSearchConfigSearchValueAC = (value:string):SetSearchConfigSearchValueACType => ({ type: SET_SEARCH_CONFIG_SEARCH_VALUE, payload: {value} })

export type SetSearchedDataAType = { type: typeof SET_SEARCHED_DATA, payload: { value: Array<any> }}
export type SetIsFetchingACType = { type: typeof SET_IS_FETCHING, payload: { value: boolean }}
export type SetCurrentPageSearchReducerACType = { type: typeof SET_CURRENT_PAGE_SEARCH_REDUCER, payload: { value: number } }
export type SetTotalNumOfPageSearchReducerACType = { type: typeof SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER, payload: { value: number } }
export type SetSearchConfigCategoryIdACType = { type: typeof SET_SEARCH_CONFIG_CATEGORY_ID, payload: { value: number } }
export type SetSearchConfigSubwayStationsACType = { type: typeof SET_SEARCH_CONFIG_SUBWAY_STATIONS, payload: { value: string }}
export type SetSearchConfigSearchValueACType = { type: typeof SET_SEARCH_CONFIG_SEARCH_VALUE, payload: { value: string }}

export type SearchBoxStateActionTypes  =
    SetSearchedDataAType |
    SetIsFetchingACType |
    SetCurrentPageSearchReducerACType |
    SetTotalNumOfPageSearchReducerACType |
    SetSearchConfigCategoryIdACType |
    SetSearchConfigSubwayStationsACType |
    SetSearchConfigSearchValueACType