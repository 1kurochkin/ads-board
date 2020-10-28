import {testAPI} from "../../api/testAPI";
import {setIsSendingDataAC, SetIsSendingDataACType} from "../mainState/mainStateActionCreators";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {
    setIsAuthAC,
    SetIsAuthACType, setIsCorrectAuthDataAC, setIsExistUserAC,
    SetIsExistUserACType
} from "../authorizationState/authorizationStateActionCreators";
import {CallHistoryMethodAction, push} from "connected-react-router";

type GetStateType = () => AppStateType


//--------------------AUTHORIZATION---------------------//

export type AuthorizationData = { login: string, password: string }
type SendAuthDispatchType = Dispatch<SetIsAuthACType | SetIsSendingDataACType | SetIsExistUserACType | CallHistoryMethodAction>
export const sendAuthorizationOrRegistrationThunk = (data:AuthorizationData) => (dispatch: SendAuthDispatchType, getState: any) => {
    const {isExistUser} = getState().authorizationState
    dispatch(setIsSendingDataAC(true))
    console.log("sendAuthorizationOrRegistrationThunk", data)

    const getRequestMethod = () => isExistUser ? "postAuthorizationData" : "postRegistrationData"

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

export type isExistData = { login: string }
type SendIsExistDispatchType = Dispatch<SetIsSendingDataACType | SetIsExistUserACType>
export const sendIsExistUserThunk = (data:isExistData) => (dispatch: SendIsExistDispatchType) => {
    dispatch(setIsSendingDataAC(true))
    console.log("sendAuthorizationThunk", data)
    testAPI["getIsExistUser"](data)
        .then(response => {
            if(response.status !== 200)
                throw `CANNOT GET IS EXIST USER DATA STATUS ${response.status}`
            return response.json()
        })
        .then(({isExist = true}) => {
            console.log(isExist, "RESPONSE")
            dispatch(setIsSendingDataAC(false))
            dispatch(setIsExistUserAC(isExist))
        })
        .catch(err => console.error(err))
}