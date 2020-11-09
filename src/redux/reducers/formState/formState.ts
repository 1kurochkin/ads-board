import {initialStateCategory, initialStateSubway} from "../../../components/searchBox/select/select";
import {getItemFromLocalStorage} from "../mainState/mainState";

export const SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER = "SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER"
export const RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER = "RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER"
export const SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER = "SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER"
export const CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER = "CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER"

export type FormReducerPagesType = "authorization" | "registration" | "createAnnouncement" | "settings"
export type FormReducerFieldsType = FormReducerAuthorizationFieldsType | FormReducerRegistrationFieldsType
export type FormReducerAuthorizationFieldsType = "login" | "password"
export type FormReducerRegistrationFieldsType = "name" | "login" | "phoneNumber" | "password"


export const defaultInitialStateForFormField = {value: "", isValid: true}

const initialState = {
    authorization : {
        login: defaultInitialStateForFormField,
        password: defaultInitialStateForFormField,
        isReadyToSend: false
    },
    registration : {
        name: defaultInitialStateForFormField,
        login: defaultInitialStateForFormField,
        phoneNumber: defaultInitialStateForFormField,
        password: defaultInitialStateForFormField,
        isReadyToSend: false
    },
    createAnnouncement : {
        photos: {value: [], isValid: true},
        name: defaultInitialStateForFormField,
        price: defaultInitialStateForFormField,
        category: {value: initialStateCategory, isValid: true},
        description: defaultInitialStateForFormField,
        phone: defaultInitialStateForFormField,
        subway: {value: initialStateSubway, isValid: true},
        isReadyToSend: false
    },
    settings : {
        avatar: defaultInitialStateForFormField,
        name: defaultInitialStateForFormField,
        phone: defaultInitialStateForFormField,
        login: defaultInitialStateForFormField,
        isReadyToSend: false
    }
}

const checkIsValid = (field: string, value: any) => {
    console.log("checkIsValid", field, value)
    switch (field) {
        case "name" :
            return !!value.length
        case "password" :
            return value.length <= 24 && value.length > 6
        case "phoneNumber" :
            return !!value.length
        case "login" :
            return !!value.length
        case "subway":
            return JSON.stringify(value) !== JSON.stringify(initialStateSubway)
        case "price":
            return !!value.length
        case "phone":
            return !!value.length
        case "category":
            return JSON.stringify(value) !== JSON.stringify(initialStateCategory)
        case "description":
            return !!value.length
        default : return true
    }
}

export const prepareFormStateByPageForSend = ({isReadyToSend, ...restFormState}: any) => {
    const stateEntries = Object.entries(restFormState)
    const defaultCondition = (postData: any, key: any, value: any) => {
        postData[key] = value
        return postData
    }
    return (condition: Function = defaultCondition) => stateEntries.reduce( (postData: any, [key, {value}]: any) => {
        return condition(postData, key, value)
    }, {})
}

const formStateReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    const {field = "", value = "", page = "" } = payload || {}
    // @ts-ignore
    const stateByPage = state[page] || {}
    const stateByField = stateByPage[field]

    switch (type) {
        case SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER :
            console.log("SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER", page, value)
            return {...state, [page] : {...stateByPage, [field] : {...stateByField, value, isValid: true}} }
        case SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER :
            const isValid = checkIsValid(field, stateByField.value)
            console.log("SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER", field, page)
            return {...state, [page] : {...stateByPage, [field] : {...stateByField, isValid}} }
        case CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER :
            console.log("SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER", page)
            const stateKeys = Object.keys(stateByPage)
            const newState = stateKeys.reduce( (newState: any, field: any) => {
                const {value} = stateByPage[field]
                const isValid = checkIsValid(field, value)
                if(!isValid) {
                    console.log("ISVALID FALSE")
                    newState.isReadyToSend = false
                    newState[field].isValid = false
                }
                return newState
            }, {...stateByPage, isReadyToSend: true} )
            return {...state, [page] : newState }
        case RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER :
            // @ts-ignore
            return {...state, [page] : initialState[page] }
        default: return state
    }
}

export default formStateReducer