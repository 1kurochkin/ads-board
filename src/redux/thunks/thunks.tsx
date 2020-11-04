import {AuthorizationData, RegistrationData, testAPI} from "../../api/testAPI";
import {setIsSendingDataAC, SetIsSendingDataACType} from "../reducers/mainState/mainStateActionCreators";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {
    setIsAuthAC,
    SetIsAuthACType,
    setIsCorrectAuthDataAC,
} from "../reducers/authorizationState/authorizationStateActionCreators";
import {CallHistoryMethodAction, push} from "connected-react-router";
import {
    setSearchedDataAC,
    SetSearchedDataAType,
    setSubwayStationsDataAC,
    SetSubwayStationsDataACType, setTotalNumOfPageSearchReducerAC, SetTotalNumOfPageSearchReducerACType
} from "../reducers/searchBoxState/searchBoxStateActionCreators";

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