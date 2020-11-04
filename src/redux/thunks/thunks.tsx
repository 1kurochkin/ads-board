import {AuthorizationData, RegistrationData, testAPI} from "../../api/testAPI";
import {setIsSendingDataAC, SetIsSendingDataACType} from "../reducers/mainState/mainStateActionCreators";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {
    setIsAuthAC,
    SetIsAuthACType,
    setIsCorrectAuthDataAC, SetIsRegistrationACType,
} from "../reducers/authorizationState/authorizationStateActionCreators";
import {CallHistoryMethodAction, push} from "connected-react-router";

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