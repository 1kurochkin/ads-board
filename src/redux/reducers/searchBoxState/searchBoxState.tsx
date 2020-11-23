import {LOCATION_CHANGE} from "connected-react-router";
import {PATH_SEARCH} from "../../../app/App";
import {initialStateCategory, initialStateSubway, RESET_TO_DEFAULT_STATE_ALL_REDUCERS} from "../mainState/mainState";

export const SET_SEARCHED_DATA = "SET_SEARCHED_DATA"
export const SET_IS_FETCHING_SEARCH_REDUCER = "SET_IS_FETCHING_SEARCH_REDUCER"
export const SET_CURRENT_PAGE_SEARCH_REDUCER = "SET_CURRENT_PAGE_SEARCH_REDUCER"
export const SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER = "SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER"
export const RESET_TO_INITIAL_SEARCH_REDUCER = "RESET_TO_INITIAL_SEARCH_REDUCER"
export const SET_SEARCH_CONFIG_CATEGORY_ID = "SET_SEARCH_CONFIG_CATEGORY_ID"
export const SET_SEARCH_CONFIG_SUBWAY_STATIONS = "SET_SEARCH_CONFIG_SUBWAY_STATIONS"
export const SET_SEARCH_CONFIG_SEARCH_VALUE = "SET_SEARCH_CONFIG_SEARCH_VALUE"

export type initialStateType = typeof initialState

// @ts-ignore
const initialState = {
    searchedData : [],
    currentPage : 0,
    totalNumOfPages: 0,
    isFetching: false,
    searchConfig : {
        categoryId: initialStateCategory,
        subwayStations: initialStateSubway,
        searchValue: ""
    }
}

export const searchBoxStateReducer = (state = initialState, action: any): initialStateType => {
    const { type, payload } = action
    const { value, withConcat, location : {pathname = "/"} = {} } = payload || {}
    const { searchedData, currentPage, searchConfig, isFetching } = state
    const {searchConfig: initialStateSearchConfig} = initialState

    switch (type) {
        case LOCATION_CHANGE :
            console.log("LOCATION_CHANGE", payload)
            return !pathname.includes(PATH_SEARCH) ?
                {...state, searchConfig: initialStateSearchConfig} : state
        case SET_SEARCHED_DATA :
            console.log("SET_SEARCHED_DATA", value, withConcat)
            const newSearchedData = withConcat ? searchedData.concat(value) : value
            return {...state, searchedData: newSearchedData}
        case SET_IS_FETCHING_SEARCH_REDUCER :
            console.log("SET_IS_FETCHING_SEARCH_REDUCER", value)
            return {...state, isFetching: value}
        case SET_CURRENT_PAGE_SEARCH_REDUCER :
            const newCurrentPage = currentPage + 1
            console.log("SET_CURRENT_PAGE_SEARCH_REDUCER", newCurrentPage)
            return {...state, currentPage: newCurrentPage}
        case SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER :
            console.log("SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER", value)
            return {...state, totalNumOfPages: value}
        case RESET_TO_INITIAL_SEARCH_REDUCER :
            console.log("RESET_TO_INITIAL_SEARCH_REDUCER", value)
            return {...initialState, isFetching, searchConfig: {...searchConfig}}
        case SET_SEARCH_CONFIG_CATEGORY_ID :
            console.log("SET_SEARCH_CONFIG_CATEGORY_ID", value)
            return {...state, searchConfig: {...searchConfig, categoryId: value}}
        case SET_SEARCH_CONFIG_SUBWAY_STATIONS :
            console.log("SET_SEARCH_CONFIG_SUBWAY_STATIONS", value)
            return {...state, searchConfig: {...searchConfig, subwayStations: value}}
        case SET_SEARCH_CONFIG_SEARCH_VALUE :
            console.log("SET_SEARCH_CONFIG_SEARCH_VALUE", value)
            return {...state, searchConfig: {...searchConfig, searchValue: value}}
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}