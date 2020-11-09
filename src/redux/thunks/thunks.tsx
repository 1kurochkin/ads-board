import {AuthorizationData, NewAnnouncementData, RegistrationData, testAPI} from "../../api/testAPI";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {
    logoutOrDeleteUseAC,
    LogoutOrDeleteUserACType,
    setIsAuthAC,
    SetIsAuthACType,
    setIsCorrectAuthDataAC,
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
    SetSubwayStationsDataACType
} from "../reducers/mainState/mainStateActionCreators";
import {
    resetToInitialByPageFormReducerAC,
    ResetToInitialByPageFormReducerACType
} from "../reducers/formState/formStateActionCreators";
import defaultAvatar from "../../pictures/defaultAvatar.jpg"

type GetStateType = () => AppStateType


//--------------------AUTHORIZATION---------------------//
type SendAuthDispatchType = Dispatch<SetIsAuthACType | SetIsFetchingMainStateACType | any | SetSettingsInLocalStorageByFieldACType | CallHistoryMethodAction | ResetToInitialByPageFormReducerACType>
export const sendAuthorizationOrRegistrationThunk = (data: AuthorizationData & RegistrationData) => (dispatch: SendAuthDispatchType, getState: any) => {
    const {authorizationState: {isRegistration}} = getState()
    dispatch(setIsFetchingMainStateAC(true))
    console.log("sendAuthorizationOrRegistrationThunk", data)

    const getRequestMethod = () => isRegistration ? "postRegistrationData" : "postAuthorizationData"
    testAPI[getRequestMethod()](data)
        .then(response => {
            if (response.status !== 200)
                throw `AUTHORIZATION DATA IS NOT POSTED STATUS ${response.status}`
            return response.json()
        })
        .then(({result = true}) => {
            dispatch(setIsFetchingMainStateAC(false))
            if (result) {
                dispatch(getUserInfoThunk())
                dispatch(setSettingsInLocalStorageByFieldAC(data.login,"login"))
                dispatch(setSettingsInLocalStorageByFieldAC(data.password,"password"))
                dispatch(setIsAuthAC(true))
                dispatch(push(PATH_FEED))
            } else dispatch(setIsCorrectAuthDataAC(false))
        })
        .catch(err => console.error(err))
}

//--------------------SEARCH-BOX---------------------//
type GetSubwayStationsDispatchType = Dispatch<SetSubwayStationsDataACType>
export const getSubwayStationsThunk = () => (dispatch: GetSubwayStationsDispatchType) => {
    console.log("getSubwayStationsThunk")

    testAPI["getSubwayStations"]()
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(data => {
            dispatch(setSubwayStationsDataAC(data))
        })
        .catch(err => console.error(err))
}

type GetAnnouncementsByFiltersDispatchType = Dispatch<SetSearchedDataAType | SetTotalNumOfPageSearchReducerACType | SetIsFetchingSearchReducerACType>
export const getAnnouncementsByFiltersThunk = (withConcat: boolean = false) => (dispatch: GetAnnouncementsByFiltersDispatchType, getState: any) => {
    dispatch(setIsFetchingSearchReducerAC(true))
    console.log("getAnnouncementsByFiltersThunk")
    const {currentPage, searchConfig: {categoryId, subwayStations, searchValue}} = getState().searchBoxState
    testAPI["getAnnouncementsByFilters"](currentPage, searchValue, categoryId, subwayStations)
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(({totalNumOfPages, announcements}) => {
            dispatch(setTotalNumOfPageSearchReducerAC(totalNumOfPages))
            dispatch(setSearchedDataAC(announcements, withConcat))
            dispatch(setIsFetchingSearchReducerAC(false))
        })
        .catch(err => console.error(err))
}

//--------------------FEED-PAGE--------------------//
type getLastAnnouncementsDispatchType = Dispatch<SetetIsFetchingFeedReducerACType | SetLastAnnouncementsACType>
export const getLastAnnouncementsThunk = () => (dispatch: getLastAnnouncementsDispatchType) => {
    dispatch(setIsFetchingFeedReducerAC(true))
    console.log("sendAuthorizationOrRegistrationThunk")

    testAPI["getLastAnnouncements"]()
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then((data) => {
            dispatch(setLastAnnouncementsAC(data))
            dispatch(setIsFetchingFeedReducerAC(false))
        })
        .catch(err => console.error(err))
}
//--------------------SETTINGS-PAGE--------------------//
type PostSettingByFieldDispatchType = Dispatch<SetSettingsInLocalStorageByFieldACType>
export const postSettingByFieldThunk = (data: any, field: SettingsFieldType) => (dispatch: PostSettingByFieldDispatchType) => {
    console.log("postSettingByFieldThunk")
    const [value] = Object.values(data)

    testAPI["postSettingsByField"](data, field)
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then(({result = false}) => {
            result && dispatch(setSettingsInLocalStorageByFieldAC(value, field))
        })
        .catch(err => console.error(err))
}

type PostLogoutOrDeleteUserType = Dispatch<LogoutOrDeleteUserACType | CallHistoryMethodAction>
type LogoutOrDeleteType = "logout" | "delete"
export const postLogoutOrDeleteUser = (logoutOrDelete: LogoutOrDeleteType) => (dispatch: PostLogoutOrDeleteUserType) => {
    console.log("postLogoutOrDeleteUser")

    const getRequestByLogoutOrDelete = () => {
        if (logoutOrDelete === "logout") return "postLogout"
        if (logoutOrDelete === "delete") return "postDelete"
        return "postLogout"
    }

    testAPI[getRequestByLogoutOrDelete()]()
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then(({result = false}) => {
            if (result) {
                dispatch(logoutOrDeleteUseAC())
                dispatch(push(PATH_FEED))
            }
        })
        .catch(err => console.error(err))
}

//--------------------ANNOUNCEMENT-PAGE--------------------//
type GetAnnouncementByCategoryAndIdDispatchType = Dispatch<SettIsFetchingAnnouncementReducerACType | SetAnnouncementsACType>
export const getAnnouncementByCategoryAndIdThunk = (category: string, id: number) => (dispatch: GetAnnouncementByCategoryAndIdDispatchType) => {
    dispatch(settIsFetchingAnnouncementReducerAC(true))
    console.log("getAnnouncementByCategoryAndIdThunk")

    testAPI["getAnnouncementByCategoryAndId"](category, id)
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then((data) => {
            dispatch(setAnnouncementAC(data))
            dispatch(settIsFetchingAnnouncementReducerAC(false))
        })
        .catch(err => console.error(err))
}

//--------------------MY-ANNOUNCEMENT-PAGE--------------------//
type GetMyAnnouncementsDispatchType = Dispatch<SetMyAnnouncementsACType | SettIsFetchingMyAnnouncementReducerACType | SetTotalNumOfPageMyAnnouncementReducerACType>
export const getMyAnnouncementsThunk = (withConcat = false) => (dispatch: GetMyAnnouncementsDispatchType, getState: any) => {
    dispatch(settIsFetchingMyAnnouncementsReducerAC(true))
    console.log("getMyAnnouncementsThunk")

    const {myAnnouncementsState: {currentPage}} = getState()

    testAPI["getMyAnnouncements"](currentPage)
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(({totalNumOfPages, announcements}) => {
            dispatch(setTotalNumOfPageMyAnnouncementReducerAC(totalNumOfPages))
            dispatch(setMyAnnouncementsAC(announcements, withConcat))
            dispatch(settIsFetchingMyAnnouncementsReducerAC(false))
        })
        .catch(err => console.error(err))
}

type PostDeleteAnnouncementDispatchType = Dispatch<SettIsFetchingMyAnnouncementReducerACType | DelMyAnnouncementByIdACType>
export const postDeleteAnnouncementThunk = (id: number) => (dispatch: PostDeleteAnnouncementDispatchType) => {
    dispatch(settIsFetchingMyAnnouncementsReducerAC(true))
    console.log("postDeleteAnnouncementThunk")

    testAPI["postDeleteAnnouncement"](id)
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then(({result = false}) => {
            result && dispatch(delMyAnnouncementByIdAC(id))
            dispatch(settIsFetchingMyAnnouncementsReducerAC(false))
        })
        .catch(err => console.error(err))
}

//--------------------CREATE-ANNOUNCEMENT--------------------//
type PostNewAnnouncementDispatchType = Dispatch<SetIsFetchingMainStateACType | CallHistoryMethodAction>
export const postNewAnnouncementThunk = (data: NewAnnouncementData) => (dispatch: PostNewAnnouncementDispatchType) => {
    dispatch(setIsFetchingMainStateAC(true))
    console.log("postNewAnnouncement")

    testAPI["postNewAnnouncement"](data)
        .then(response => {
            if (response.status !== 200) throw `CANNOT FETCH POST REQUEST ${response.status}`
            else {
                dispatch(setIsFetchingMainStateAC(true))
                dispatch(push(PATH_MY_ANNOUNCEMENTS))
            }
        })
        .catch(err => console.error(err))
}

//--------------------ANNOUNCEMENTS-LIST-PAGE--------------------//
type GetAnnouncementsListDispatchType = Dispatch<SetTotalNumOfPageAnnouncementsListReducerACType | SetIsFetchingMainStateACType | SetAnnouncementsListACType | SetCurrentPageAnnouncementsListReducerACType>
export const getAnnouncementsListThunk = (category: string, withConcat = false) => (dispatch: GetAnnouncementsListDispatchType, getState: any) => {
    dispatch(setIsFetchingMainStateAC(true))
    console.log("getAnnouncementsListThunk")

    const {announcementsListState: {currentPage}} = getState()

    testAPI["getAnnouncementsList"](currentPage, category)
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then(({totalNumOfPages, announcements}) => {
            dispatch(setTotalNumOfPageAnnouncementsListReducerAC(totalNumOfPages))
            dispatch(setAnnouncementsListAC(announcements, withConcat))
            dispatch(setIsFetchingMainStateAC(false))
        })
        .catch(err => console.error(err))
}
//--------------------GET-USER-INFO--------------------//
type GetUserInfoDispatchType = Dispatch<SetSettingsInLocalStorageByFieldACType>
type GetUserInfoThunkType = typeof getUserInfoThunk
export const getUserInfoThunk = () => (dispatch:GetUserInfoDispatchType) => {
    console.log("getUserInfoThunk")
    testAPI.getUserInfo()
        .then(response => {
            if (response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( ({avatar = defaultAvatar, ...restUserData}) => {
            console.log("RESPONSE", restUserData)
            dispatch(setSettingsInLocalStorageByFieldAC(avatar, "avatar"))
            const userDataEntries = Object.entries(restUserData)
            userDataEntries.forEach( ([field, value]) => {
                console.log(field, value)
                dispatch(setSettingsInLocalStorageByFieldAC(value, field))
            })
        })
}