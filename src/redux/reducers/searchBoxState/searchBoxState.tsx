export const SET_SEARCHED_DATA = "SET_SEARCHED_DATA"
export const SET_IS_FETCHING = "SET_IS_FETCHING"
export const SET_CURRENT_PAGE_SEARCH_REDUCER = "SET_CURRENT_PAGE_SEARCH_REDUCER"
export const SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER = "SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER"
export const SET_SEARCH_CONFIG_CATEGORY_ID = "SET_SEARCH_CONFIG_CATEGORY_ID"
export const SET_SEARCH_CONFIG_SUBWAY_STATIONS = "SET_SEARCH_CONFIG_SUBWAY_STATIONS"
export const SET_SEARCH_CONFIG_SEARCH_VALUE = "SET_SEARCH_CONFIG_SEARCH_VALUE"

export type initialStateType = typeof initialState
const initialState = {
    searchedData : [],
    currentPage : 0,
    totalNumOfPages: 1,
    isFetching: false,
    searchConfig : {
        categoryId: null,
        subwayStations: [],
        searchValue: ""
    }
}

export const searchBoxStateReducer = (state = initialState, action: any): initialStateType => {
    const { type, payload } = action
    const { value, withConcat } = payload || {}
    const { searchedData, currentPage, searchConfig } = state
    const { subwayStations } = searchConfig

    switch (type) {
        case SET_SEARCHED_DATA :
            console.log("SET_SEARCHED_DATA", value)
            const newSearchedData = withConcat ? searchedData.concat(value) : value
            return {...state, searchedData: newSearchedData}
        case SET_IS_FETCHING :
            console.log("SET_IS_FETCHING", value)
            return {...state, isFetching: value}
        case SET_CURRENT_PAGE_SEARCH_REDUCER :
            const newCurrentPage = currentPage + 1
            console.log("SET_CURRENT_PAGE_SEARCH_REDUCER", newCurrentPage)
            return {...state, currentPage: newCurrentPage}
        case SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER :
            console.log("SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER", value)
            return {...state, totalNumOfPages: value}
        case SET_SEARCH_CONFIG_CATEGORY_ID :
            console.log("SET_SEARCH_CONFIG_CATEGORY_ID", value)
            return {...state, searchConfig: {...searchConfig, categoryId: value}}
        case SET_SEARCH_CONFIG_SUBWAY_STATIONS :
            console.log("SET_SEARCH_CONFIG_SUBWAY_STATIONS", value)
            // @ts-ignore
            const newSubwayStations = subwayStations.includes(value) ?
                subwayStations.filter(el => el !== value) : subwayStations.concat(value)
            return {...state, searchConfig: {...searchConfig, subwayStations: newSubwayStations}}
        case SET_SEARCH_CONFIG_SEARCH_VALUE :
            console.log("SET_SEARCH_CONFIG_SEARCH_VALUE", value)
            return {...state, searchConfig: {...searchConfig, searchValue: value}}
        default: return state
    }
}