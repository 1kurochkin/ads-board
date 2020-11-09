import React, {ChangeEvent, useCallback, useEffect} from 'react';
import "./authorizationPopupBoxStyles.css"
import TextInput from "../../textInput/textInput";
import {useDispatch, useSelector} from "react-redux";
import {sendAuthorizationOrRegistrationThunk} from "../../../redux/thunks/thunks";
import {
    setIsCorrectAuthDataAC,
    setIsRegistrationAC,
} from "../../../redux/reducers/authorizationState/authorizationStateActionCreators";
import {
    getIsCorrectAuthDataSelector,
    getIsRegistrationSelector
} from "../../../redux/reducers/authorizationState/authorizationStateSelectors";
import {getIsFetchingMainStateSelector} from "../../../redux/reducers/mainState/mainStateSelectors";
import Button from "../../button/button";
import {
    checkIsReadyToSendByPageFormReducerAC, resetToInitialByPageFormReducerAC,
    setIsValidFormReducerAC,
    seValueFormReducerAC
} from "../../../redux/reducers/formState/formStateActionCreators";
import {getFieldsByPageFormReducerSelector} from "../../../redux/reducers/formState/formStateSelectors";
import {prepareFormStateByPageForSend} from "../../../redux/reducers/formState/formState";


type fieldTypes = "password" | "login" | "name" | string

type PropsType = {
    closeModalWindow?: Function
}

const AuthorizationPopupBox = (props: PropsType) => {

    //------MAP-STATE-TO-PROPS-----//
    const isRegistration = useSelector(getIsRegistrationSelector)
    const isCorrectAuthData = useSelector(getIsCorrectAuthDataSelector)
    const isFetching = useSelector(getIsFetchingMainStateSelector)
    const authFormState: any = useSelector((state) => getFieldsByPageFormReducerSelector(state, "authorization"))
    const regFormState: any = useSelector((state) => getFieldsByPageFormReducerSelector(state, "registration"))
    const currentFormState = (isRegistration ? regFormState : authFormState) || {}
    const currentPage = isRegistration ? "registration" : "authorization"
    const {isReadyToSend} = currentFormState

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const sendAuthorizationOrRegistration = useCallback((data) => dispatch(sendAuthorizationOrRegistrationThunk(data)), [dispatch])
    const setIsRegistration = useCallback((boolean) => dispatch(setIsRegistrationAC(boolean)), [dispatch])
    const seValueFormReducer = useCallback((value, field) => dispatch(seValueFormReducerAC(value, field, currentPage)), [dispatch, isRegistration])
    const setIsCorrectAuthData = useCallback(() => dispatch(setIsCorrectAuthDataAC(true)), [dispatch])
    const setIsValidFormReducer = useCallback((field) => dispatch(setIsValidFormReducerAC(field, currentPage)), [dispatch, isRegistration])
    const resetToInitialByPageFormReducer = useCallback((page) => dispatch(resetToInitialByPageFormReducerAC(page)), [dispatch, isRegistration])
    const checkIsReadyToSend = useCallback(() => dispatch(checkIsReadyToSendByPageFormReducerAC(currentPage)), [dispatch, isRegistration])

    //------WILL-UNMOUNT-LIFE-CYCLE-----//
    useEffect(() => {
        return () => {
            resetToInitialByPageFormReducer("authorization")
            resetToInitialByPageFormReducer("registration")
        }
    }, [])

    //------DID-UPDATE-LIFE-CYCLE-----//
    useEffect(() => {
        if(isReadyToSend) {
            const postData = prepareFormStateByPageForSend(currentFormState)()
            sendAuthorizationOrRegistration(postData)
        }
    }, [isReadyToSend])

    //Функция - обработчик события изменеия в инпуте. Проверка на валидность значения в инпуте.
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, field: fieldTypes) => {
        const {currentTarget: {value}} = event
        console.log("onChangeHandler", field, value)
        seValueFormReducer(value, field)
        !isCorrectAuthData && setIsCorrectAuthData()
    }

    //Функция возращает массив с конфигурацией для полей ввода
    const getInputsConfig = () => {
        const {name = {}, login = {}, password = {}, phoneNumber = {}} = currentFormState
        return [
            {
                field: "name",
                inputType: "text",
                placeholder: "Введите ваше имя",
                value: name.value,
                isValid: name.isValid
            },
            {
                field: "phoneNumber",
                inputType: "number",
                placeholder: "Введите ваш телефон",
                value: phoneNumber.value,
                isValid: phoneNumber.isValid
            },
            {
                field: "login",
                inputType: "text",
                placeholder: "Введите ваш E-mail",
                value: login.value,
                isValid: login.isValid
            },
            {
                field: "password",
                inputType: "password",
                placeholder: "Введите ваш пароль",
                value: password.value,
                isValid: password.isValid
            },
        ]
    }

    //Функция возращает кнопку для отображения в зависимости от условия
    const getBtnByIsExistUserForSwitch = () => {
        return <span onClick={() => setIsRegistration(!isRegistration)} className={"authorization-popupBox__reg-btn"}>
            {isRegistration ? "Войти" : "Зарегестрироваться" }
        </span>
    }

    return (
        <div className="authorization-popupBox">
            <h1 className={"authorization-popupBox__title"}>{!isRegistration ? "Вход" : "Регистрация"}</h1>
            <div className="authorization-popupBox__inputs-wrapper">
                { getInputsConfig().map( ({field, inputType, placeholder, value, isValid}) => {
                    if(!isRegistration && field == "name") return null
                    if(!isRegistration && field == "phoneNumber") return null
                    return <TextInput key={field}
                                      isValid={isValid} placeholder={placeholder}
                                      inputType={inputType} value={value}
                                      onBlurHandler={() => setIsValidFormReducer(field)}
                                      onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, field)}/>
                }) }
            </div>
            {!isCorrectAuthData && !isRegistration && <h4>Введённые данные не верны</h4>}
            <Button onClickHandler={checkIsReadyToSend} label={!isRegistration ? "Войти" : "Зарегестрироваться"}
                    isDisabled={isFetching} className={"authorization-popupBox__btn"}/>
            {getBtnByIsExistUserForSwitch()}
        </div>
    );
}

export default AuthorizationPopupBox;
