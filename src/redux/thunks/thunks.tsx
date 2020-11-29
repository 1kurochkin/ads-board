import {AuthorizationData, RegistrationData} from "../../api/testAPI";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {
    logoutOrDeleteUseAC,
    LogoutOrDeleteUserACType,
    setIsAuthAC,
    SetIsAuthACType,
    setIsCorrectAuthDataAC,
    setIsExistUserAuthDataAC,
} from "../reducers/authorizationState/authorizationStateActionCreators";
import {CallHistoryMethodAction, push} from "connected-react-router";
import {
    SetIsFetchingSearchReducerACType,
    setSearchedDataAC,
    SetSearchedDataAType,
    setTotalNumOfPageSearchReducerAC,
    SetTotalNumOfPageSearchReducerACType
} from "../reducers/searchBoxState/searchBoxStateActionCreators";
import {setLastAnnouncementsAC, SetLastAnnouncementsACType} from "../reducers/feedState/feedStateActionCreators";
import {SettingsFieldType} from "../reducers/settingsState/settingsState";
import {
    setSettingsInLocalStorageByFieldAC,
    SetSettingsInLocalStorageByFieldACType
} from "../reducers/settingsState/settingsStateActionCreators";
import {
    setAnnouncementAC,
    SetAnnouncementsACType,
} from "../reducers/announcementState/announcementStateActionCreators";
import {
    delMyAnnouncementByIdAC,
    DelMyAnnouncementByIdACType,
    setMyAnnouncementsAC,
    SetMyAnnouncementsACType,
    setTotalNumOfPageMyAnnouncementReducerAC,
    SetTotalNumOfPageMyAnnouncementReducerACType
} from "../reducers/myAnnouncementState/myAnnouncementStateActionCreators";
import {PATH_FEED, PATH_MY_ANNOUNCEMENTS} from "../../app/App";
import {
    resetToDefaultAllReducersAC,
    setSubwayStationsDataAC,
    SetSubwayStationsDataACType
} from "../reducers/mainState/mainStateActionCreators";
import {
    ResetToInitialByPageFormReducerACType,
    setIsReadyToSendFormReducerAC,
    setIsValidFormReducerAC
} from "../reducers/formState/formStateActionCreators";
import defaultAvatar from "../../pictures/defaultAvatar.jpg"
import {
    setIsEmptyResponseAC,
    SetIsEmptyResponseACType,
    setIsErrorFetchAC,
    SetIsErrorFetchACType,
    setIsFetchingAC,
    SetIsFetchingACType
} from "../reducers/fetchingState/fetchingStateActionCreators"
import {prepareFormStateByPageForSend} from "../reducers/formState/formState";

type GetStateType = () => AppStateType


//--------------------AUTHORIZATION---------------------//
export const getIsExistUserThunk = () => (dispatch: any, getState: any) => {
    console.log("getIsExistUserThunk")
    dispatch(setIsFetchingAC("authorization", true))
    dispatch(setIsValidFormReducerAC("login", "registration"))
    const {
        mainState: {apiService},
        formState
    } = getState()
    const {login : {value, isValid}} = formState["registration"]

    isValid ? apiService["getIsExistUser"](value)
        .then((response:any) => {
            if (!response.ok)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(({result}: any) => {
            dispatch(setIsExistUserAuthDataAC(result))
            result && dispatch(setIsValidFormReducerAC("login", "registration", false))
            dispatch(setIsFetchingAC("authorization",false))
        })
        .catch((err: any) => {
            dispatch(setIsFetchingAC("authorization",false))
            // dispatch(setIsErrorFetchAC(true))
            console.error(err)
        }) : dispatch(setIsFetchingAC("authorization",false))
}


type SendAuthDispatchType = Dispatch<SetIsErrorFetchACType | SetIsAuthACType | SetIsFetchingACType | any | SetSettingsInLocalStorageByFieldACType | CallHistoryMethodAction | ResetToInitialByPageFormReducerACType>
export const sendAuthorizationOrRegistrationThunk = (data: AuthorizationData & RegistrationData) => (dispatch: SendAuthDispatchType, getState: any) => {
    const {authorizationState: {isRegistration}, mainState : {apiService}} = getState()
    dispatch(setIsFetchingAC("authorization",true))
    dispatch(setIsErrorFetchAC("authorization",false))
    console.log("sendAuthorizationOrRegistrationThunk", data)

    const getRequestMethod = () => isRegistration ? "postRegistrationData" : "postAuthorizationData"
    const getPageForFormReducer = () => isRegistration ? "registration" : "authorization"
    apiService[getRequestMethod()](data)
        .then((response:any) => {
            if (!response.ok) throw response.status
            return response.json()
        })
        .then(({result = true}: any) => {
            dispatch(setIsFetchingAC("authorization",false))
            if (result) {
                dispatch(setSettingsInLocalStorageByFieldAC(data.login,"login"))
                dispatch(setSettingsInLocalStorageByFieldAC(data.password,"password"))
                dispatch(getUserInfoThunk())
                dispatch(setIsAuthAC(true))
            } else {
                dispatch(setIsCorrectAuthDataAC(false))
                dispatch(setIsReadyToSendFormReducerAC(false, getPageForFormReducer()))
            }
        })
        .catch((status: any) => {
            console.log(status)
            dispatch(setIsErrorFetchAC("authorization", true))
            dispatch(setIsFetchingAC("authorization",false))
            dispatch(setIsReadyToSendFormReducerAC(false, getPageForFormReducer()))
            console.error(status)
        })
}

//--------------------SEARCH-BOX---------------------//
type GetSubwayStationsDispatchType = Dispatch<SetIsErrorFetchACType | SetSubwayStationsDataACType>
export const getSubwayStationsThunk = () => (dispatch: GetSubwayStationsDispatchType, getState: any) => {
    console.log("getSubwayStationsThunk")

    const {mainState: {apiService}} = getState()

    apiService["getSubwayStations"]()
        .then((response:any) => {
            if (!response.ok)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then((data: any) => {
            dispatch(setSubwayStationsDataAC(data))
        })
        .catch((err: any) => {
            // dispatch(setIsErrorFetchAC(true))
            console.error(err)
        })
}

type GetAnnouncementsByFiltersDispatchType = Dispatch<SetIsErrorFetchACType | SetIsEmptyResponseACType | SetIsFetchingACType | SetSearchedDataAType | SetTotalNumOfPageSearchReducerACType | SetIsFetchingSearchReducerACType>
export const getAnnouncementsByFiltersThunk = (withConcat: boolean = false) => (dispatch: GetAnnouncementsByFiltersDispatchType, getState: any) => {
    dispatch(setIsFetchingAC("announcementsList",true))
    dispatch(setIsErrorFetchAC("announcementsList",false))
    dispatch(setIsEmptyResponseAC("announcementsList", false))
    console.log("getAnnouncementsByFiltersThunk")

    const {
        searchBoxState : {
            currentPage,
            searchConfig: {categoryId: {category}, subwayStations: {id:stationId}, searchValue}
        },
        mainState : {apiService} } = getState()

    apiService["getAnnouncementsByFilters"](currentPage, searchValue, category, stationId)
        .then((response:any) => {
            if(!response.ok) throw response.status
            dispatch(setIsEmptyResponseAC("announcementsList", response.status === 404))
            if (!response.ok)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(({pages, announcements}: any) => {
            dispatch(setTotalNumOfPageSearchReducerAC(pages - 1))
            dispatch(setSearchedDataAC(announcements, withConcat))
            dispatch(setIsFetchingAC("announcementsList",false))
        })
        .catch((status: any) => {
            status === 404 ?
                dispatch(setIsEmptyResponseAC("announcementsList", true)) :
                dispatch(setIsErrorFetchAC("announcementsList" ,true))
            dispatch(setIsFetchingAC("announcementsList",false))
            console.error(status)
        })
}

//--------------------FEED-PAGE--------------------//
type getLastAnnouncementsDispatchType = Dispatch<SetIsErrorFetchACType | SetIsEmptyResponseACType | SetIsFetchingACType | SetLastAnnouncementsACType>
export const getLastAnnouncementsThunk = (withConcat = false) => (dispatch: getLastAnnouncementsDispatchType, getState: any) => {
    dispatch(setIsFetchingAC("feed",true))
    dispatch(setIsErrorFetchAC("feed",false))
    dispatch(setIsEmptyResponseAC("feed", false))
    console.log("getLastAnnouncementsThunk")

    const {mainState: {apiService}} = getState()

    apiService["getAnnouncementsByFilters"](0, "", "", "")
        .then((response:any) => {
            if(!response.ok) throw response.status
            return response.json()
        })
        .then(({announcements}: any)  => {
            dispatch(setLastAnnouncementsAC(announcements, withConcat))
            dispatch(setIsFetchingAC("feed",false))
        })
        .catch((status: any) => {
            status === 404 ?
                dispatch(setIsEmptyResponseAC("feed",true)) :
                dispatch(setIsErrorFetchAC("feed",true))
            dispatch(setIsFetchingAC("feed",false))
            console.error(status)
        })
}
//--------------------SETTINGS-PAGE--------------------//
type PostSettingByFieldDispatchType = Dispatch<SetIsErrorFetchACType | SetSettingsInLocalStorageByFieldACType>
export const postSettingByFieldThunk = (data: any, field: SettingsFieldType) => (dispatch: PostSettingByFieldDispatchType, getState: any) => {
    dispatch(setIsErrorFetchAC("settings", false))

    console.log("postSettingByFieldThunk")

    const getValue = () => field === "photo" ? URL.createObjectURL(data) : Object.values(data)[0]
    field === "photo" && URL.revokeObjectURL(data)

    const {mainState: {apiService}} = getState()

    apiService["postSettingsByField"](data, field)
        .then((response:any) => {
            if (!response.ok)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then(({result = false}: any) => {
            result && dispatch(setSettingsInLocalStorageByFieldAC(getValue(), field))
        })
        .catch((err: any) => {
            dispatch(setIsErrorFetchAC("settings",true))
            console.error(err)
        })
}

type PostLogoutOrDeleteUserType = Dispatch<SetIsErrorFetchACType | LogoutOrDeleteUserACType | CallHistoryMethodAction>
type LogoutOrDeleteType = "logout" | "delete"
export const postLogoutOrDeleteUser = (logoutOrDelete: LogoutOrDeleteType) => (dispatch: PostLogoutOrDeleteUserType, getState:any) => {
    console.log("postLogoutOrDeleteUser")
    dispatch(setIsErrorFetchAC("settings", false))

    const {mainState: {apiService}} = getState()

    const getRequestByLogoutOrDelete = () => {
        if (logoutOrDelete === "logout") return "postLogout"
        if (logoutOrDelete === "delete") return "postDelete"
        return "postLogout"
    }

    apiService[getRequestByLogoutOrDelete()]()
        .then((response:any) => {
            if (response.ok) {
                dispatch(logoutOrDeleteUseAC())
                dispatch(resetToDefaultAllReducersAC())
                dispatch(push(PATH_FEED))
            } else throw `CANNOT FETCH POST REQUEST ${response.status}`

        })
        .catch((err: any) => {
            dispatch(setIsErrorFetchAC("settings", true))
            console.error(err)
        })
}

//--------------------ANNOUNCEMENT-PAGE--------------------//
type GetAnnouncementByIdDispatchType = Dispatch<SetIsErrorFetchACType | SetIsEmptyResponseACType | SetIsFetchingACType | SetAnnouncementsACType>
export const getAnnouncementByIdThunk = (id: number) => (dispatch: GetAnnouncementByIdDispatchType, getState: any) => {
    dispatch(setIsFetchingAC("announcement",true))
    dispatch(setIsErrorFetchAC("announcement", false))
    console.log("getAnnouncementByIdThunk")

    const {mainState: {apiService}} = getState()

    apiService["getAnnouncementById"](id)
        .then((response:any) => {
            if(!response.ok) throw response.status
            return response.json()
        })
        .then((data: any) => {
            dispatch(setAnnouncementAC(data))
            dispatch(setIsFetchingAC("announcement",false))
        })
        .catch((status: any) => {
            status === 404 ?
                dispatch(setIsEmptyResponseAC("announcement", true)) :
                dispatch(setIsErrorFetchAC("announcement", true))
            dispatch(setIsFetchingAC("announcement",false))
            console.error(status)
        })
}

//--------------------MY-ANNOUNCEMENT-PAGE--------------------//
type GetMyAnnouncementsDispatchType = Dispatch<SetIsErrorFetchACType | SetMyAnnouncementsACType | SetIsEmptyResponseACType | SetIsFetchingACType | SetTotalNumOfPageMyAnnouncementReducerACType>
export const getMyAnnouncementsThunk = () => (dispatch: GetMyAnnouncementsDispatchType, getState: any) => {
    dispatch(setIsFetchingAC("myAnnouncements", true))
    dispatch(setIsErrorFetchAC("myAnnouncements", false))
    dispatch(setIsEmptyResponseAC("myAnnouncements", false))
    console.log("getMyAnnouncementsThunk")

    const {myAnnouncementsState: {currentPage}, mainState : {apiService}} = getState()

    apiService["getMyAnnouncements"](currentPage)
        .then((response:any) => {
            if (!response.ok) throw response.status
            return response.json()
        })
        .then(({pages, announcements}: any) => {
            dispatch(setTotalNumOfPageMyAnnouncementReducerAC(pages - 1))
            dispatch(setMyAnnouncementsAC(announcements))
            dispatch(setIsFetchingAC("myAnnouncements",false))
        })
        .catch((status: any) => {
            status == 404 ?
                dispatch(setIsEmptyResponseAC("myAnnouncements",true)) :
                dispatch(setIsErrorFetchAC("myAnnouncements", true))

            dispatch(setIsFetchingAC("myAnnouncements",false))

            console.error(status)
        })
}

type PostDeleteAnnouncementDispatchType = Dispatch<SetIsErrorFetchACType | SetIsFetchingACType | DelMyAnnouncementByIdACType>
export const postDeleteAnnouncementThunk = (id: number) => (dispatch: PostDeleteAnnouncementDispatchType, getState: any) => {
    dispatch(setIsFetchingAC("myAnnouncements",true))
    dispatch(setIsErrorFetchAC("myAnnouncements",false))
    console.log("postDeleteAnnouncementThunk")

    const {mainState: {apiService}} = getState()

    apiService["postDeleteAnnouncement"](id)
        .then((response:any) => {
            if (!response.ok)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then(({result = false}: any) => {
            result && dispatch(delMyAnnouncementByIdAC(id))
            dispatch(setIsFetchingAC("myAnnouncements",false))
        })
        .catch((err: any) => {
            dispatch(setIsFetchingAC("myAnnouncements",false))
            dispatch(setIsErrorFetchAC("myAnnouncements",true))
            console.error(err)
        })
}

//--------------------CREATE-ANNOUNCEMENT--------------------//
type PostNewAnnouncementDispatchType = Dispatch<SetIsErrorFetchACType | any | SetIsFetchingACType | CallHistoryMethodAction>
export const postNewAnnouncementThunk = () => (dispatch: PostNewAnnouncementDispatchType, getState:any) => {
    const {formState: {createAnnouncement}} = getState()
    const condition = (postData: any, key: any, value: any) => {
        postData[key] = value
        if(key === "category") postData[key] = value.category
        if(key === "stationId") postData[key] = value.id
        return postData
    }
    const data = prepareFormStateByPageForSend(createAnnouncement)(condition)
    dispatch(setIsFetchingAC("createAnnouncement",true))
    dispatch(setIsErrorFetchAC("createAnnouncement",false))
    console.log("postNewAnnouncement")

    const {mainState: {apiService}} = getState()

    apiService["postNewAnnouncement"](data)
        .then((response:any) => {
            if (!response.ok) throw `CANNOT FETCH POST REQUEST ${response.status}`
            else {
                dispatch(setIsFetchingAC("createAnnouncement",false))
                dispatch(push(PATH_MY_ANNOUNCEMENTS))
            }
        })
        .catch((err: any) => {
            dispatch(setIsFetchingAC("createAnnouncement",false))
            dispatch(setIsErrorFetchAC("createAnnouncement",true))
            dispatch(setIsReadyToSendFormReducerAC(false, "createAnnouncement"))
            console.error(err)
        })
}
//--------------------GET-USER-INFO--------------------//
type GetUserInfoDispatchType = Dispatch<SetIsErrorFetchACType | SetSettingsInLocalStorageByFieldACType>
type GetUserInfoThunkType = typeof getUserInfoThunk
export const getUserInfoThunk = () => (dispatch:GetUserInfoDispatchType, getState:any) => {
    console.log("getUserInfoThunk")

    const {mainState: {apiService}} = getState()

    apiService.getUserInfo()
        .then((response:any) => {
            if (!response.ok)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( ({photo, ...restUserData}: any) => {
            console.log("RESPONSE", restUserData)
            dispatch(setSettingsInLocalStorageByFieldAC(photo || defaultAvatar, "photo"))
            const userDataEntries = Object.entries(restUserData)
            userDataEntries.forEach( ([field, value]) => {
                console.log(field, value)
                dispatch(setSettingsInLocalStorageByFieldAC(value, field))
            })
        })
}