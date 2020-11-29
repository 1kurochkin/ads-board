import React, {ChangeEvent, useCallback, useEffect} from 'react';
import "./authorizationPopupBoxStyles.css"
import TextInput from "../../textInput/textInput";
import {useDispatch, useSelector} from "react-redux";
import {getIsExistUserThunk, sendAuthorizationOrRegistrationThunk} from "../../../redux/thunks/thunks";
import {
    setIsCorrectAuthDataAC,
    setIsRegistrationAC,
} from "../../../redux/reducers/authorizationState/authorizationStateActionCreators";
import {
    getIsCorrectAuthDataSelector,
    getIsExistUserSelector,
    getIsFetchingAuthStateSelector,
    getIsRegistrationSelector
} from "../../../redux/reducers/authorizationState/authorizationStateSelectors";
import Button from "../../button/button";
import {
    checkIsReadyToSendByPageFormReducerAC,
    resetToInitialByPageFormReducerAC,
    setIsValidFormReducerAC,
    seValueFormReducerAC
} from "../../../redux/reducers/formState/formStateActionCreators";
import {getFieldsByPageFormReducerSelector} from "../../../redux/reducers/formState/formStateSelectors";
import {prepareFormStateByPageForSend} from "../../../redux/reducers/formState/formState";
import AlertErrorFetching from "../../alertErrorFetching/alertErrorFetching";
import useFetchState from "../../../hooks/useFetchState";


type fieldTypes = "password" | "login" | "name" | string

type PropsType = {
    closeModalWindow?: Function
}

const AuthorizationPopupBox = (props: PropsType) => {

    //------MAP-STATE-TO-PROPS-----//
    const isRegistration = useSelector(getIsRegistrationSelector)
    const isExistUser = useSelector(getIsExistUserSelector)
    const isCorrectAuthData = useSelector(getIsCorrectAuthDataSelector)
    const isFetching = useSelector(getIsFetchingAuthStateSelector)
    const authFormState: any = useSelector((state) => getFieldsByPageFormReducerSelector(state, "authorization"))
    const regFormState: any = useSelector((state) => getFieldsByPageFormReducerSelector(state, "registration"))
    const currentFormState = (isRegistration ? regFormState : authFormState) || {}
    const currentPage = isRegistration ? "registration" : "authorization"
    const {isReadyToSend} = currentFormState

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const sendAuthorizationOrRegistration = useCallback((data) => dispatch(sendAuthorizationOrRegistrationThunk(data)), [dispatch])
    const getIsExistUser = useCallback(() => dispatch(getIsExistUserThunk()), [dispatch])
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
        const {name = {}, login = {}, password = {}, phone = {}} = currentFormState
        return [
            {
                field: "name",
                label: "Имя",
                inputType: "text",
                placeholder: "Введите ваше имя",
                value: name.value,
                isValid: name.isValid,
                className: "mb-4",
                onBlurHandler: () => setIsValidFormReducer("name"),
                onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, "name")

            },
            {
                field: "phone",
                label: "Номер телефона",
                inputType: "number",
                placeholder: "Введите ваш телефон",
                value: phone.value,
                isValid: phone.isValid,
                className: "mb-4",
                onBlurHandler: () => setIsValidFormReducer("phone"),
                onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, "phone")
            },
            {
                field: "login",
                label: "Логин",
                inputType: "text",
                placeholder: "Введите ваш Логин",
                value: login.value,
                isValid: login.isValid,
                className: "mb-4",
                onBlurHandler: () => isRegistration ? getIsExistUser() : setIsValidFormReducer("login"),
                onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, "login")
            },
            {
                field: "password",
                label: "Пароль",
                inputType: "password",
                placeholder: "Введите ваш пароль",
                value: password.value,
                isValid: password.isValid,
                className: "mb-4",
                onBlurHandler: () => setIsValidFormReducer("password"),
                onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, "password")
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
        <div className="authorization-popupBox position-relative">
            <h1 className={"authorization-popupBox__title"}>{!isRegistration ? "Вход" : "Регистрация"}</h1>
            {isExistUser && isRegistration && <AlertErrorFetching className={"p-1 pr-0"} alertText={"Такой логин уже используется!"}/>}
            {!isCorrectAuthData && !isRegistration && <AlertErrorFetching className={"p-1 pr-0"} alertText={"Введённые данные не верны!"}/>}
            <hr className={"my-3"}/>
            <div className="authorization-popupBox__inputs-wrapper mb-2">
                { getInputsConfig().map( ({field, ...restInputConfig}) => {
                    if(!isRegistration && field == "name") return null
                    if(!isRegistration && field == "phone") return null
                    return <TextInput {...restInputConfig} />
                }) }
            </div>
            <Button onClickHandler={checkIsReadyToSend} label={!isRegistration ? "Войти" : "Зарегестрироваться"}
                    isDisabled={isFetching} className={"authorization-popupBox__btn btn-success"}/>
            {getBtnByIsExistUserForSwitch()}
        </div>
    );
}

export default AuthorizationPopupBox;
