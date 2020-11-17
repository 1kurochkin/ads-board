import {serverAPI} from "../../../api/serverAPI";
import {testAPI} from "../../../api/testAPI";

export const getItemFromLocalStorage = (feild:string) => localStorage.getItem(feild)
export const setItemToLocalStorage = (feild:string, value:any) => localStorage.setItem(feild, value)
export const clearLocalStorage = () => localStorage.clear()

export const SET_IS_FETCHING_MAIN_STATE = "SET_IS_FETCHING_MAIN_STATE"
export const SET_SUBWAY_STATIONS_DATA = "SET_SUBWAY_STATIONS_DATA"
export const SET_IS_EMPTY_RESPONSE_MAIN_STATE = "SET_IS_EMPTY_RESPONSE_MAIN_STATE"
export const SET_IS_ERROR_FETCH_MAIN_STATE = "SET_IS_ERROR_FETCH_MAIN_STATE"
export const RESET_TO_DEFAULT_STATE_ALL_REDUCERS = "RESET_TO_DEFAULT_STATE_ALL_REDUCERS"

export const initialStateSubway = {id: "", name: "Все станции метро"}
export const initialStateCategory = { id: "", name: "Любая категория", category: "all"}

type initialStateType = typeof initialState
const initialState = {
    isFetching: false,
    isEmptyResponse: false,
    isErrorFetch: false,
    subwayStationsData: [initialStateSubway],
    categoriesData : [
        initialStateCategory,
        {
            id: 1,
            name: "Недвижимость",
            category: "housing",
            subCategories : [
                {id: 2, name: "Квартиры", category: "apartments"},
                {id: 3, name: "Комната", category: "bunk"},
                {id: 4, name: "Койко-место", category: "room"}
            ]
        },
        {
            id: 5,
            name: "Работа",
            category: "job",
            subCategories : [
                {id: 6, name: "Вакансии", category: "vacancies"}
            ]
        }
    ],
    apiService: testAPI,
    // apiService: serverAPI
}

export const mainStateReducer = (state = initialState, action : any): initialStateType => {
    const {type, payload } = action
    const { value } = payload || {}
    const { subwayStationsData } = state

    switch (type) {
        case SET_IS_FETCHING_MAIN_STATE :
            console.log("SET_IS_FETCHING_MAIN_STATE", value)
            return {...state, isFetching: value}
        case SET_IS_EMPTY_RESPONSE_MAIN_STATE :
            console.log("SET_IS_EMPTY_RESPONSE_MAIN_STATE", value)
            return {...state, isEmptyResponse: value}
        case SET_IS_ERROR_FETCH_MAIN_STATE :
            console.log("SET_IS_ERROR_FETCH_MAIN_STATE", value)
            return {...state, isErrorFetch: value}
        case SET_SUBWAY_STATIONS_DATA :
            console.log("SET_SUBWAY_STATIONS_DATA", value)
            return {...state, subwayStationsData: subwayStationsData.concat(value) }
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}