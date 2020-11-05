export const SET_SEARCHED_DATA = "SET_SEARCHED_DATA"
export const SET_SUBWAY_STATIONS_DATA = "SET_SUBWAY_STATIONS_DATA"
export const SET_IS_FETCHING_SEARCH_REDUCER = "SET_IS_FETCHING_SEARCH_REDUCER"
export const SET_CURRENT_PAGE_SEARCH_REDUCER = "SET_CURRENT_PAGE_SEARCH_REDUCER"
export const SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER = "SET_TOTAL_NUM_OF_PAGE_SEARCH_REDUCER"


export type initialStateType = typeof initialState
const initialState = {
    searchedData : [],
    subwayStationsData: [{id: 0, label: "Станция метро"}],
    currentPage : 0,
    totalNumOfPages: 1,
    isFetching: false,
    categoriesData : [
        {
            id: 1,
            label: "Недвижимость",
            subCategories: [
                {id: 10, label: "Квартира"},
                {id: 11, label: "Комната"},
                {id: 12, label: "Койко-место"}
            ]
        },
        {id: 2, label: "Работа", subCategories: []}
    ]
}

export const searchBoxStateReducer = (state = initialState, action: any): initialStateType => {
    const { type, payload } = action
    const { value, withConcat } = payload || {}
    const { searchedData, subwayStationsData, currentPage } = state

    switch (type) {
        case SET_SEARCHED_DATA :
            console.log("SET_SEARCHED_DATA", value)
            const newSearchedData = withConcat ? searchedData.concat(value) : value
            return {...state, searchedData: newSearchedData}
        case SET_SUBWAY_STATIONS_DATA :
            console.log("SET_SUBWAY_STATIONS_DATA", value)
            return {...state, subwayStationsData: value}
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
        default: return state
    }
}