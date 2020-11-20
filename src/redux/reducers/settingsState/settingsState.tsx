import {
    getItemFromLocalStorage,
    RESET_TO_DEFAULT_STATE_ALL_REDUCERS,
    setItemToLocalStorage
} from "../mainState/mainState";
import defaultAvatar from "../../../pictures/defaultAvatar.jpg"
export const SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD = "SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD"
export const SET_IS_FETCHING_SETTINGS_REDUCER = "SET_IS_FETCHING_SETTINGS_REDUCER"

type initialStateType = typeof initialState
const initialState = {
    photo: () => getItemFromLocalStorage("photo") || defaultAvatar,
    name: () => getItemFromLocalStorage("name") || "",
    phone: () => getItemFromLocalStorage("phone") || "",
    login: () => getItemFromLocalStorage("login") || "",
    password: () => getItemFromLocalStorage("password") || "",
    isFetching: false
}

export type SettingsFieldType = "photo" | "name" | "phone" | "login" | "currentPassword" | "password" | string

export const settingsStateReducer = (state = initialState, action : any): initialStateType => {
    const {type, payload } = action
    const { value, field } = payload || {}

    switch (type) {
        case SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD :
            console.log("SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD", value)
            setItemToLocalStorage(field, value)
            return state
        case SET_IS_FETCHING_SETTINGS_REDUCER :
            console.log("SET_IS_FETCHING_SETTINGS_REDUCER", value)
            return {...state, isFetching: value}
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}