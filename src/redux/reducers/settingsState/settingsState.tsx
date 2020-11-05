import {getItemFromLocalStorage, setItemToLocalStorage} from "../mainState/mainState";

export const SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD = "SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD"
export const SET_IS_FETCHING_SETTINGS_REDUCER = "SET_IS_FETCHING_SETTINGS_REDUCER"

type initialStateType = typeof initialState
const initialState = {
    avatar: () => getItemFromLocalStorage("avatar") || "https://yt3.ggpht.com/a/AATXAJyd2Oyiu7ha6KV-Qbsk4l6X5enCWPS-TOv3Dw=s900-c-k-c0xffffffff-no-rj-mo",
    name: () => getItemFromLocalStorage("name") || "",
    phone: () => getItemFromLocalStorage("phone") || "",
    login: () => getItemFromLocalStorage("login") || "",
    password: () => getItemFromLocalStorage("password") || "",
    isFetching: false
}

export type SettingsFieldType = "avatar" | "name" | "phone" | "login" | "currentPassword" | "password" | string

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
        default: return state
    }
}