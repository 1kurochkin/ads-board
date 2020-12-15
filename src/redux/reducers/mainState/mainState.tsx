import {serverAPI} from "../../../api/serverAPI";
import {testAPI} from "../../../api/testAPI";
import {LOCATION_CHANGE} from "connected-react-router";
import {PATH_SEARCH} from "../../../app/App";

export const getItemFromLocalStorage = (feild:string) => localStorage.getItem(feild)
export const setItemToLocalStorage = (feild:string, value:any) => localStorage.setItem(feild, value)
export const clearLocalStorage = () => localStorage.clear()

export const SET_SUBWAY_STATIONS_DATA = "SET_SUBWAY_STATIONS_DATA"
export const SET_IS_VISIBLE_CONTEST_BANNER = "SET_IS_VISIBLE_CONTEST_BANNER"
export const RESET_TO_DEFAULT_STATE_ALL_REDUCERS = "RESET_TO_DEFAULT_STATE_ALL_REDUCERS"

export const initialStateSubway = {id: "", name: "Все станции метро"}
export const initialStateCategory = { id: "", name: "Любая категория", category: "all"}

type initialStateType = typeof initialState
const initialState = {
    subwayStationsData: [initialStateSubway],
    categoriesData : [
        initialStateCategory,
        {
            id: 1,
            name: "Недвижимость",
            category: "housing",
            subCategories : [
                {id: 2, name: "Квартиры", category: "apartments"},
                {id: 3, name: "Комната", category: "bed"},
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
    // apiService: testAPI,
    apiService: serverAPI,
    isVisibleContestBanner: () => !getItemFromLocalStorage("isVisibleContestBanner")
}

export const mainStateReducer = (state = initialState, action : any): initialStateType => {
    const {type, payload } = action
    const { value, location : {pathname = "/"} = {} } = payload || {}
    const { subwayStationsData } = state

    switch (type) {
        case SET_SUBWAY_STATIONS_DATA :
            console.log("SET_SUBWAY_STATIONS_DATA", value)
            return {...state, subwayStationsData: subwayStationsData.concat(value) }
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        case SET_IS_VISIBLE_CONTEST_BANNER :
            console.log("SET_IS_VISIBLE_CONTEST_BANNER", value)
            setItemToLocalStorage("isVisibleContestBanner", value)
            return state
        case LOCATION_CHANGE :
            console.log("LOCATION_CHANGE", payload)
            !pathname.includes(PATH_SEARCH) &&  window.scrollTo(0,50)
            return state
        default: return state
    }
}