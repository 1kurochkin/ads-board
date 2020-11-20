import {initialStateCategory, initialStateSubway, RESET_TO_DEFAULT_STATE_ALL_REDUCERS} from "../mainState/mainState"

export const SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER = "SET_VALUE_BY_PAGE_AND_FIELD_FORM_REDUCER"
export const RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER = "RESET_TO_INITIAL_BY_PAGE_FORM_REDUCER"
export const SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER = "SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER"
export const CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER = "CHECK_IS_READY_TO_SEND_BY_PAGE_FORM_REDUCER"
export const SET_IS_READY_TO_SEND = "SET_IS_READY_TO_SEND"

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
        photoList: {value: [], isValid: true},
        name: defaultInitialStateForFormField,
        price: defaultInitialStateForFormField,
        categoryId: {value: initialStateCategory, isValid: true},
        description: defaultInitialStateForFormField,
        sellerPhone: defaultInitialStateForFormField,
        stationId: {value: initialStateSubway, isValid: true},
        isReadyToSend: false
    },
    settings : {
        photo: defaultInitialStateForFormField,
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
            return value.length <= 24 && value.length >= 3
        case "phoneNumber" :
            return !!value.length
        case "login" :
            return !!value.length
        case "stationId":
            return JSON.stringify(value) !== JSON.stringify(initialStateSubway)
        case "price":
            return !!value.length
        case "phone":
            return !!value.length
        case "categoryId":
            console.log(JSON.stringify(value), JSON.stringify(initialStateCategory))
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
            const isValid = value !== null ? value : checkIsValid(field, stateByField.value)
            console.log("SET_IS_VALID_BY_PAGE_AND_FIELD_FORM_REDUCER", field, page, value)
            return {...state, [page] : {...stateByPage, [field] : {...stateByField, isValid, isReadyToSend:false}} }
        case SET_IS_READY_TO_SEND :
            console.log("SET_IS_READY_TO_SEND", page, value)
            return {...state, [page] : {...stateByPage, isReadyToSend:value} }
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
        case RESET_TO_DEFAULT_STATE_ALL_REDUCERS :
            console.log("RESET_TO_DEFAULT_STATE_ALL_REDUCERS", value)
            return initialState
        default: return state
    }
}

export default formStateReducer