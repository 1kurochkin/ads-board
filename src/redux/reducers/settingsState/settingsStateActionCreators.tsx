import {
    SET_IS_FETCHING_SETTINGS_REDUCER,
    SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD,
    SettingsFieldType
} from "./settingsState";

export type SetSettingsInLocalStorageByFieldACType = {
    type: typeof SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD
    payload : { value: any, field:  SettingsFieldType}
}

export type SetIsFetchingSettingsReducerACType = {
    type: typeof SET_IS_FETCHING_SETTINGS_REDUCER
    payload : { value: boolean}
}
export const setSettingsInLocalStorageByFieldAC = (value:any, field:SettingsFieldType):SetSettingsInLocalStorageByFieldACType =>
    ({ type: SET_SETTINGS_IN_LOCAL_STORAGE_BY_FIELD, payload: {value, field} })

export const setIsFetchingSettingsReducerAC = (value:boolean):SetIsFetchingSettingsReducerACType =>
    ({ type: SET_IS_FETCHING_SETTINGS_REDUCER, payload: {value} })
