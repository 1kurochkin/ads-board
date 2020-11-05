import {AuthorizationData, RegistrationData, testAPI} from "../../api/testAPI";
import {setIsSendingDataAC, SetIsSendingDataACType} from "../reducers/mainState/mainStateActionCreators";
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
    setSearchedDataAC,
    SetSearchedDataAType,
    setSubwayStationsDataAC,
    SetSubwayStationsDataACType,
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
    SettIsFetchingAnnouncementReducerACType,
    SetAnnouncementsACType,
    settIsFetchingAnnouncementReducerAC,
    setAnnouncementAC
} from "../reducers/announcementState/announcementStateActionCreators";
import {
    setMyAnnouncementsAC,
    SetMyAnnouncementsACType,
    SettIsFetchingMyAnnouncementReducerACType,
    settIsFetchingMyAnnouncementsReducerAC, setTotalNumOfPageMyAnnouncementReducerAC,
    SetTotalNumOfPageMyAnnouncementReducerACType,
    DelMyAnnouncementByIdACType, delMyAnnouncementByIdAC
} from "../reducers/myAnnouncementState/myAnnouncementStateActionCreators";

type GetStateType = () => AppStateType


//--------------------AUTHORIZATION---------------------//
type SendAuthDispatchType = Dispatch<SetIsAuthACType | SetIsSendingDataACType | CallHistoryMethodAction>
export const sendAuthorizationOrRegistrationThunk = (data:AuthorizationData & RegistrationData) => (dispatch: SendAuthDispatchType, getState: any) => {
    const {isRegistration} = getState().authorizationState
    dispatch(setIsSendingDataAC(true))
    console.log("sendAuthorizationOrRegistrationThunk", data)

    const getRequestMethod = () => isRegistration ? "postRegistrationData" : "postAuthorizationData"

    testAPI[getRequestMethod()](data)
        .then(response => {
            if(response.status !== 200)
                throw `AUTHORIZATION DATA IS NOT POSTED STATUS ${response.status}`
            return response.json()
        })
        .then(({result = true}) => {
            dispatch(setIsSendingDataAC(false))
            if(result) {
                dispatch(setIsAuthAC(true))
                dispatch(push("/feed"))
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
            if(response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( data => { dispatch(setSubwayStationsDataAC(data)) } )
        .catch(err => console.error(err))
}

type GetAnnouncementsByFiltersDispatchType = Dispatch<SetSearchedDataAType | SetTotalNumOfPageSearchReducerACType>
export const getAnnouncementsByFiltersThunk = (name:string = "", category:string| number = "", subway:string| number = "", withConcat:boolean = false) => (dispatch: GetAnnouncementsByFiltersDispatchType, getState: any) => {
    console.log("getAnnouncementsByFiltersThunk")
    const {currentPage} = getState().searchBoxState
    testAPI["getAnnouncementsByFilters"](currentPage, name, category, subway)
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( ({totalNumOfPages, announcements}) => {
            dispatch(setTotalNumOfPageSearchReducerAC(totalNumOfPages))
            dispatch(setSearchedDataAC(announcements, withConcat))
        } )
        .catch(err => console.error(err))
}

//--------------------FEED-PAGE--------------------//
type getLastAnnouncementsDispatchType = Dispatch<SetetIsFetchingFeedReducerACType | SetLastAnnouncementsACType>
export const getLastAnnouncementsThunk = () => (dispatch: getLastAnnouncementsDispatchType) => {
    dispatch(setIsFetchingFeedReducerAC(true))
    console.log("sendAuthorizationOrRegistrationThunk")

    testAPI["getLastAnnouncements"]()
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( (data)  => {
            dispatch(setIsFetchingFeedReducerAC(false))
            dispatch(setLastAnnouncementsAC(data))
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
            if(response.status !== 200)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then( ({result = false})  => {
            result && dispatch(setSettingsInLocalStorageByFieldAC(value, field))
        })
        .catch(err => console.error(err))
}

type PostLogoutOrDeleteUserType = Dispatch<LogoutOrDeleteUserACType | CallHistoryMethodAction>
type LogoutOrDeleteType = "logout" | "delete"
export const postLogoutOrDeleteUser = (logoutOrDelete: LogoutOrDeleteType) => (dispatch: PostLogoutOrDeleteUserType) => {
    console.log("postLogoutOrDeleteUser")

    const getRequestByLogoutOrDelete = () => {
        if(logoutOrDelete === "logout") return "postLogout"
        if(logoutOrDelete === "delete") return "postDelete"
        return "postLogout"
    }

    testAPI[getRequestByLogoutOrDelete()]()
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then( ({result = false})  => {
            if(result) {
                dispatch(logoutOrDeleteUseAC())
                dispatch(push("/feed"))
            }
        })
        .catch(err => console.error(err))
}

//--------------------ANNOUNCEMENT-PAGE--------------------//
type GetAnnouncementByCategoryAndIdDispatchType = Dispatch<SettIsFetchingAnnouncementReducerACType | SetAnnouncementsACType>
export const getAnnouncementByCategoryAndIdThunk = (category:string, id:number) => (dispatch: GetAnnouncementByCategoryAndIdDispatchType) => {
    dispatch(settIsFetchingAnnouncementReducerAC(true))
    console.log("getAnnouncementByCategoryAndIdThunk")

    testAPI["getAnnouncementByCategoryAndId"](category, id)
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( (data)  => {
            dispatch(settIsFetchingAnnouncementReducerAC(false))
            dispatch(setAnnouncementAC(data))
        })
        .catch(err => console.error(err))
}

//--------------------MY-ANNOUNCEMENT-PAGE--------------------//
type GetMyAnnouncementsDispatchType = Dispatch<SetMyAnnouncementsACType | SettIsFetchingMyAnnouncementReducerACType | SetTotalNumOfPageMyAnnouncementReducerACType>
export const getMyAnnouncementsThunk = (withConcat = false) => (dispatch: GetMyAnnouncementsDispatchType, getState: any) => {
    dispatch(settIsFetchingMyAnnouncementsReducerAC(true))
    console.log("getMyAnnouncementsThunk")

    const { myAnnouncementsState : { currentPage } } = getState()

    testAPI["getMyAnnouncements"](currentPage)
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT FETCH GET REQUEST ${response.status}`
            return response.json()
        })
        .then( ({totalNumOfPages, announcements}) => {
            dispatch(settIsFetchingMyAnnouncementsReducerAC(false))
            dispatch(setTotalNumOfPageMyAnnouncementReducerAC(totalNumOfPages))
            dispatch(setMyAnnouncementsAC(announcements, withConcat))
        } )
        .catch(err => console.error(err))
}

type PostDeleteAnnouncementDispatchType = Dispatch<SettIsFetchingMyAnnouncementReducerACType | DelMyAnnouncementByIdACType>
export const postDeleteAnnouncementThunk = (id: number) => (dispatch: PostDeleteAnnouncementDispatchType) => {
    dispatch(settIsFetchingMyAnnouncementsReducerAC(true))
    console.log("postDeleteAnnouncementThunk")

    testAPI["postDeleteAnnouncement"](id)
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT FETCH POST REQUEST ${response.status}`
            return response.json()
        })
        .then( ({result = false})  => {
            dispatch(settIsFetchingMyAnnouncementsReducerAC(false))
            result && dispatch(delMyAnnouncementByIdAC(id))
        })
        .catch(err => console.error(err))
}