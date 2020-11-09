import {
    FormReducerFieldsType,
    SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER,
    SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER,
    CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER, RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER, FormReducerPagesType,

} from "./formState"
import {SET_LAST_ANNOUNCEMENTS} from "../feedState/feedState";

export type ResetToInitialByPageFormReducerACType = { type: typeof RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER, payload: { page: FormReducerPagesType }}


export const seValueFormReducerAC = ( value: string | number, field: FormReducerFieldsType, page: FormReducerPagesType,) =>
    ({ type: SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER, payload: {value, field, page} })

export const setIsValidFormReducerAC = (field: FormReducerFieldsType, page: FormReducerPagesType ) =>
    ({ type: SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER, payload: {field, page} })

export const checkIsReadyToSendByPageFormReducerAC = (page: FormReducerPagesType ) =>
    ({ type: CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER, payload: {page} })

export const resetToInitialByPageFormReducerAC = (page: FormReducerPagesType): ResetToInitialByPageFormReducerACType =>
    ({ type: RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER, payload: {page} })
