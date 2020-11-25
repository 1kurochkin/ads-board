import {AuthorizationData, NewAnnouncementData, RegistrationData} from "../../api/testAPI";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {
    logoutOrDeleteUseAC,
    LogoutOrDeleteUserACType,
    setIsAuthAC,
    SetIsAuthACType,
    setIsCorrectAuthDataAC, setIsErrorFetchAuthDataAC, setIsExistUserAuthDataAC, setIsFetchingAuthDataAC,
} from "../reducers/authorizationState/authorizationStateActionCreators";
import {CallHistoryMethodAction, push} from "connected-react-router";
import {
    setIsFetchingSearchReducerAC,
    SetIsFetchingSearchReducerACType,
    setSearchedDataAC,
    SetSearchedDataAType,
    setTotalNumOfPageSearchReducerAC,
    SetTotalNumOfPageSearchReducerACType
} from "../reducers/searchBoxState/searchBoxStateActionCreators";
import {
    SetetIsFetchingFeedReducerACType,
    setIsFetchingFeedReducerAC,
    setLastAnnouncementsAC,
    SetLastAnnouncementsACType
} from "../reducers/feedState/feedStateActionCreators";
import {SettingsFieldType} from "../reducers/settingsState/settingsState";
import {
    setSettingsInLocalStorageByFieldAC,
    SetSettingsInLocalStorageByFieldACType
} from "../reducers/settingsState/settingsStateActionCreators";
import {
    setAnnouncementAC,
    SetAnnouncementsACType,
    settIsFetchingAnnouncementReducerAC,
    SettIsFetchingAnnouncementReducerACType
} from "../reducers/announcementState/announcementStateActionCreators";
import {
    delMyAnnouncementByIdAC,
    DelMyAnnouncementByIdACType,
    setMyAnnouncementsAC,
    SetMyAnnouncementsACType,
    SettIsFetchingMyAnnouncementReducerACType,
    settIsFetchingMyAnnouncementsReducerAC,
    setTotalNumOfPageMyAnnouncementReducerAC,
    SetTotalNumOfPageMyAnnouncementReducerACType
} from "../reducers/myAnnouncementState/myAnnouncementStateActionCreators";
import {PATH_FEED, PATH_MY_ANNOUNCEMENTS} from "../../app/App";
import {
    setAnnouncementsListAC,
    SetAnnouncementsListACType,
    SetCurrentPageAnnouncementsListReducerACType,
    setTotalNumOfPageAnnouncementsListReducerAC,
    SetTotalNumOfPageAnnouncementsListReducerACType
} from "../reducers/announcementsListState/announcementsListStateActionCreators";
import {
    setIsFetchingMainStateAC,
    SetIsFetchingMainStateACType,
    setSubwayStationsDataAC,
    SetSubwayStationsDataACType,
    SetIsEmptyResponseMainStateACType,
    setIsEmptyResponseMainStateAC,
    setIsErrorFetchMainStateAC,
    SetIsErrorFetchMainStateACType, resetToDefaultAllReducersAC
} from "../reducers/mainState/mainStateActionCreators";
import {
    resetToInitialByPageFormReducerAC,
    ResetToInitialByPageFormReducerACType, setIsReadyToSendFormReducerAC, setIsValidFormReducerAC
} from "../reducers/formState/formStateActionCreators";
import defaultAvatar from "../../pictures/defaultAvatar.jpg"

type GetStateType = () => AppStateType


//--------------------AUTHORIZATION---------------------//
export const getIsExistUserThunk = () => (dispatch: any, getState: any) => {
    console.log("getIsExistUserThunk")
    dispatch(setIsFetchingMainStateAC(true))
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
            dispatch(setIsFetchingMainStateAC(false))
        })
        .catch((err: any) => {
            dispatch(setIsFetchingMainStateAC(false))
            // dispatch(setIsErrorFetchMainStateAC(true))
            console.error(err)
        }) : dispatch(setIsFetchingMainStateAC(false))
}


type SendAuthDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetIsAuthACType | SetIsFetchingMainStateACType | any | SetSettingsInLocalStorageByFieldACType | CallHistoryMethodAction | ResetToInitialByPageFormReducerACType>
export const sendAuthorizationOrRegistrationThunk = (data: AuthorizationData & RegistrationData) => (dispatch: SendAuthDispatchType, getState: any) => {
    const {authorizationState: {isRegistration}, mainState : {apiService}} = getState()
    dispatch(setIsFetchingAuthDataAC(true))
    dispatch(setIsErrorFetchAuthDataAC(false))
    console.log("sendAuthorizationOrRegistrationThunk", data)

    const getRequestMethod = () => isRegistration ? "postRegistrationData" : "postAuthorizationData"
    const getPageForFormReducer = () => isRegistration ? "registration" : "authorization"
    apiService[getRequestMethod()](data)
        .then((response:any) => {
            if (!response.ok) throw response.status
            return response.json()
        })
        .then(({result = true}: any) => {
            dispatch(setIsFetchingAuthDataAC(false))
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
            dispatch(setIsErrorFetchAuthDataAC(true))
            dispatch(setIsFetchingAuthDataAC(false))
            dispatch(setIsReadyToSendFormReducerAC(false, getPageForFormReducer()))
            console.error(status)
        })
}

//--------------------SEARCH-BOX---------------------//
type GetSubwayStationsDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetSubwayStationsDataACType>
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
            // dispatch(setIsErrorFetchMainStateAC(true))
            console.error(err)
        })
}

type GetAnnouncementsByFiltersDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetIsEmptyResponseMainStateACType | SetSearchedDataAType | SetTotalNumOfPageSearchReducerACType | SetIsFetchingSearchReducerACType>
export const getAnnouncementsByFiltersThunk = (withConcat: boolean = false) => (dispatch: GetAnnouncementsByFiltersDispatchType, getState: any) => {
    dispatch(setIsFetchingSearchReducerAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
    dispatch(setIsEmptyResponseMainStateAC(false))
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
            dispatch(setIsEmptyResponseMainStateAC(response.status === 404))
            if (!response.ok)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(({pages, announcements}: any) => {
            dispatch(setTotalNumOfPageSearchReducerAC(pages - 1))
            dispatch(setSearchedDataAC(announcements, withConcat))
            dispatch(setIsFetchingSearchReducerAC(false))
        })
        .catch((status: any) => {
            status === 404 ?
                dispatch(setIsEmptyResponseMainStateAC(true)) :
                dispatch(setIsErrorFetchMainStateAC(true))
            dispatch(setIsFetchingSearchReducerAC(false))
            console.error(status)
        })
}

//--------------------FEED-PAGE--------------------//
type getLastAnnouncementsDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetIsEmptyResponseMainStateACType | SetIsFetchingMainStateACType | SetLastAnnouncementsACType>
export const getLastAnnouncementsThunk = (page: number, withConcat = false) => (dispatch: getLastAnnouncementsDispatchType, getState: any) => {
    dispatch(setIsFetchingMainStateAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
    dispatch(setIsEmptyResponseMainStateAC(false))
    console.log("getLastAnnouncementsThunk")

    const {mainState: {apiService}} = getState()

    apiService["getAnnouncementsByFilters"](page, "", "", "")
        .then((response:any) => {
            if(!response.ok) throw response.status
            return response.json()
        })
        .then(({announcements}: any)  => {
            dispatch(setLastAnnouncementsAC(announcements, withConcat))
            dispatch(setIsFetchingMainStateAC(false))
        })
        .catch((status: any) => {
            status === 404 ?
                dispatch(setIsEmptyResponseMainStateAC(true)) :
                dispatch(setIsErrorFetchMainStateAC(true))
            dispatch(setIsFetchingMainStateAC(false))
            console.error(status)
        })
}
//--------------------SETTINGS-PAGE--------------------//
type PostSettingByFieldDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetSettingsInLocalStorageByFieldACType>
export const postSettingByFieldThunk = (data: any, field: SettingsFieldType) => (dispatch: PostSettingByFieldDispatchType, getState: any) => {
    dispatch(setIsErrorFetchMainStateAC(false))

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
            dispatch(setIsErrorFetchMainStateAC(true))
            console.error(err)
        })
}

type PostLogoutOrDeleteUserType = Dispatch<SetIsErrorFetchMainStateACType | LogoutOrDeleteUserACType | CallHistoryMethodAction>
type LogoutOrDeleteType = "logout" | "delete"
export const postLogoutOrDeleteUser = (logoutOrDelete: LogoutOrDeleteType) => (dispatch: PostLogoutOrDeleteUserType, getState:any) => {
    console.log("postLogoutOrDeleteUser")
    dispatch(setIsErrorFetchMainStateAC(false))

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
            dispatch(setIsErrorFetchMainStateAC(true))
            console.error(err)
        })
}

//--------------------ANNOUNCEMENT-PAGE--------------------//
type GetAnnouncementByIdDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetIsEmptyResponseMainStateACType | SettIsFetchingAnnouncementReducerACType | SetAnnouncementsACType>
export const getAnnouncementByIdThunk = (id: number) => (dispatch: GetAnnouncementByIdDispatchType, getState: any) => {
    dispatch(settIsFetchingAnnouncementReducerAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
    console.log("getAnnouncementByIdThunk")

    const {mainState: {apiService}} = getState()

    apiService["getAnnouncementById"](id)
        .then((response:any) => {
            if(!response.ok) throw response.status
            return response.json()
        })
        .then((data: any) => {
            dispatch(setAnnouncementAC(data))
            dispatch(settIsFetchingAnnouncementReducerAC(false))
        })
        .catch((status: any) => {
            status === 404 ?
                dispatch(setIsEmptyResponseMainStateAC(true)) :
                dispatch(setIsErrorFetchMainStateAC(true))
            dispatch(settIsFetchingAnnouncementReducerAC(false))
            console.error(status)
        })
}

//--------------------MY-ANNOUNCEMENT-PAGE--------------------//
type GetMyAnnouncementsDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetMyAnnouncementsACType | SetIsEmptyResponseMainStateACType | SetIsFetchingMainStateACType | SetTotalNumOfPageMyAnnouncementReducerACType>
export const getMyAnnouncementsThunk = (withConcat = false) => (dispatch: GetMyAnnouncementsDispatchType, getState: any) => {
    dispatch(setIsFetchingMainStateAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
    dispatch(setIsEmptyResponseMainStateAC(false))
    console.log("getMyAnnouncementsThunk")

    const {myAnnouncementsState: {currentPage}, mainState : {apiService}} = getState()

    apiService["getMyAnnouncements"](currentPage)
        .then((response:any) => {
            if (!response.ok) throw response.status
            return response.json()
        })
        .then(({pages, announcements}: any) => {
            dispatch(setTotalNumOfPageMyAnnouncementReducerAC(pages - 1))
            dispatch(setMyAnnouncementsAC(announcements, withConcat))
            dispatch(setIsFetchingMainStateAC(false))
        })
        .catch((status: any) => {
            status == 404 ?
                dispatch(setIsEmptyResponseMainStateAC(true)) :
                dispatch(setIsErrorFetchMainStateAC(true))

            dispatch(setIsFetchingMainStateAC(false))

            console.error(status)
        })
}

type PostDeleteAnnouncementDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SettIsFetchingMyAnnouncementReducerACType | DelMyAnnouncementByIdACType>
export const postDeleteAnnouncementThunk = (id: number) => (dispatch: PostDeleteAnnouncementDispatchType, getState: any) => {
    dispatch(settIsFetchingMyAnnouncementsReducerAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
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
            dispatch(settIsFetchingMyAnnouncementsReducerAC(false))
        })
        .catch((err: any) => {
            dispatch(settIsFetchingMyAnnouncementsReducerAC(false))
            dispatch(setIsErrorFetchMainStateAC(true))
            console.error(err)
        })
}

//--------------------CREATE-ANNOUNCEMENT--------------------//
type PostNewAnnouncementDispatchType = Dispatch<SetIsErrorFetchMainStateACType | any | SetIsFetchingMainStateACType | CallHistoryMethodAction>
export const postNewAnnouncementThunk = (data: NewAnnouncementData) => (dispatch: PostNewAnnouncementDispatchType, getState:any) => {
    dispatch(setIsFetchingMainStateAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
    console.log("postNewAnnouncement")

    const {mainState: {apiService}} = getState()

    apiService["postNewAnnouncement"](data)
        .then((response:any) => {
            if (!response.ok) throw `CANNOT FETCH POST REQUEST ${response.status}`
            else {
                dispatch(setIsFetchingMainStateAC(false))
                dispatch(push(PATH_MY_ANNOUNCEMENTS))
            }
        })
        .catch((err: any) => {
            dispatch(setIsFetchingMainStateAC(false))
            dispatch(setIsErrorFetchMainStateAC(true))
            dispatch(setIsReadyToSendFormReducerAC(false, "createAnnouncement"))
            console.error(err)
        })
}

//--------------------ANNOUNCEMENTS-LIST-PAGE--------------------//
type GetAnnouncementsListDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetIsEmptyResponseMainStateACType | SetTotalNumOfPageAnnouncementsListReducerACType | SetIsFetchingMainStateACType | SetAnnouncementsListACType | SetCurrentPageAnnouncementsListReducerACType>
export const getAnnouncementsListThunk = (category: string, withConcat = false) => (dispatch: GetAnnouncementsListDispatchType, getState: any) => {
    dispatch(setIsFetchingMainStateAC(true))
    dispatch(setIsErrorFetchMainStateAC(false))
    dispatch(setIsEmptyResponseMainStateAC(false))
    console.log("getAnnouncementsListThunk")

    const {announcementsListState: {currentPage}, mainState : {apiService}} = getState()

    apiService["getAnnouncementsByFilters"](currentPage, "", "", "")
        .then((response:any) => {
            if (!response.ok) throw response.status
            return response.json()
        })
        .then(({pages, announcements}: any) => {
            dispatch(setTotalNumOfPageAnnouncementsListReducerAC(pages - 1))
            dispatch(setAnnouncementsListAC(announcements, withConcat))
            dispatch(setIsFetchingMainStateAC(false))
        })
        .catch((status: any) => {
            console.log(status === 404, "CATCH")
            status === 404 ?
                dispatch(setIsEmptyResponseMainStateAC(true)) :
                dispatch(setIsErrorFetchMainStateAC(true))

            dispatch(setIsFetchingMainStateAC(false))
        })
}
//--------------------GET-USER-INFO--------------------//
type GetUserInfoDispatchType = Dispatch<SetIsErrorFetchMainStateACType | SetSettingsInLocalStorageByFieldACType>
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