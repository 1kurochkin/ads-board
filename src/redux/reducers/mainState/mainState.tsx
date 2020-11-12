
export const getItemFromLocalStorage = (feild:string) => localStorage.getItem(feild)
export const setItemToLocalStorage = (feild:string, value:any) => localStorage.setItem(feild, value)
export const clearLocalStorage = () => localStorage.clear()

export const SET_IS_FETCHING_MAIN_STATE = "SET_IS_FETCHING_MAIN_STATE"
export const SET_SUBWAY_STATIONS_DATA = "SET_SUBWAY_STATIONS_DATA"

type initialStateType = typeof initialState
const initialState = {
    isFetching: false,
    subwayStationsData: [],
    categoriesData : [
        { id: 0, label: "Любая категория", category: "all"},
        {
            id: 1,
            label: "Недвижимость",
            category: "housing",
            subCategories : [
                {id: 2, label: "Квартиры", category: "apartments"},
                {id: 3, label: "Комната", category: "bunk"},
                {id: 4, label: "Койко-место", category: "room"}
            ]
        },
        {
            id: 5,
            label: "Работа",
            category: "job",
            subCategories : [
                {id: 6, label: "Вакансии", category: "vacancies"}
            ]
        }
    ]
}

export const mainStateReducer = (state = initialState, action : any): initialStateType => {
    const {type, payload } = action
    const { value } = payload || {}

    switch (type) {
        case SET_IS_FETCHING_MAIN_STATE :
            console.log("SET_IS_FETCHING_MAIN_STATE", value)
            return {...state, isFetching: value}
        case SET_SUBWAY_STATIONS_DATA :
            console.log("SET_SUBWAY_STATIONS_DATA", value)
            return {...state, subwayStationsData: value}
        default: return state
    }
}