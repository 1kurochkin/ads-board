import {
    SET_SEARCHED_DATA,
    SET_IS_FETCHING_SEARCH_REDUCER,
    SET_CURRENT_PAGE_SEARCH_REDUCER,
    SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER,
    RESET_TO_INITIAL_SEARCH_REDUCER,
    SET_SEARCH_CONFIG_CATEGORY_ID,
    SET_SEARCH_CONFIG_SUBWAY_STATIONS, SET_SEARCH_CONFIG_SEARCH_VALUE,
} from "./searchBoxState";

export const setSearchedDataAC = (value:Array<any>, withConcat:boolean):SetSearchedDataAType => ({ type: SET_SEARCHED_DATA, payload: {value, withConcat} })
export const setIsFetchingSearchReducerAC = (value:boolean):SetIsFetchingSearchReducerACType => ({ type: SET_IS_FETCHING_SEARCH_REDUCER, payload: {value} })
export const setCurrentPageSearchReducerAC = ():SetCurrentPageSearchReducerACType => ({ type: SET_CURRENT_PAGE_SEARCH_REDUCER })
export const setTotalNumOfPageSearchReducerAC = (value:number):SetTotalNumOfPageSearchReducerACType => ({ type: SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER, payload: {value} })
export const resetToInitialStateSearchReducerAC = ():ResetToInitialStateSearchReducerACType => ({ type: RESET_TO_INITIAL_SEARCH_REDUCER })
export const setSearchConfigCategoryAC = (value:number):SetSearchConfigCategoryACType => ({ type: SET_SEARCH_CONFIG_CATEGORY_ID, payload: {value} })
export const setSearchConfigSubwayStationsAC = (value:string):SetSearchConfigSubwayStationsACType => ({ type: SET_SEARCH_CONFIG_SUBWAY_STATIONS, payload: {value} })
export const setSearchConfigSearchValueAC = (value:string):SetSearchConfigSearchValueACType => ({ type: SET_SEARCH_CONFIG_SEARCH_VALUE, payload: {value} })



export type SetSearchedDataAType = { type: typeof SET_SEARCHED_DATA, payload: { value: Array<any>, withConcat: boolean}}
export type SetIsFetchingSearchReducerACType = { type: typeof SET_IS_FETCHING_SEARCH_REDUCER, payload: { value: boolean }}
export type SetCurrentPageSearchReducerACType = { type: typeof SET_CURRENT_PAGE_SEARCH_REDUCER }
export type SetTotalNumOfPageSearchReducerACType = { type: typeof SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER, payload: { value: number } }
export type ResetToInitialStateSearchReducerACType = { type: typeof RESET_TO_INITIAL_SEARCH_REDUCER }
export type SetSearchConfigCategoryACType = { type: typeof SET_SEARCH_CONFIG_CATEGORY_ID, payload: { value: number } }
export type SetSearchConfigSubwayStationsACType = { type: typeof SET_SEARCH_CONFIG_SUBWAY_STATIONS, payload: { value: string }}
export type SetSearchConfigSearchValueACType = { type: typeof SET_SEARCH_CONFIG_SEARCH_VALUE, payload: { value: string }}
