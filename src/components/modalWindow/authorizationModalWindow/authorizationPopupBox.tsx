import React, {ChangeEvent, useCallback, useState} from 'react';
import "./authorizationPopupBoxStyles.css"
import TextInput from "../../textInput/textInput";
import {useDispatch, useSelector} from "react-redux";
import {sendAuthorizationOrRegistrationThunk} from "../../../redux/thunks/thunks";
import {
    setIsCorrectAuthDataAC, setIsRegistrationAC,
} from "../../../redux/reducers/authorizationState/authorizationStateActionCreators";
import {getIsCorrectAuthDataSelector, getIsRegistrationSelector} from "../../../redux/reducers/authorizationState/authorizationStateSelectors";
import {getIsSendingDataSelector} from "../../../redux/reducers/mainState/mainStateSelectors";
import { AuthorizationData } from '../../../api/testAPI';
import Button from "../../button/button";

type loginOrPassOrNameTypes = "password" | "login" | "name" | string

type PropsType = {
    closeModalWindow?: Function
}

const AuthorizationPopupBox = (props: PropsType) => {
    //-----LOCAL-STATE-----//
    const [state, setLogin] =
        useState({
            name: {value: "", isValid: true},
            login: {value: "", isValid: true},
            password: {value: "", isValid: true}
        })

    //------MAP-STATE-TO-PROPS-----//
    const {isRegistration, isSendingData, isCorrectAuthData} = useSelector((state) => ({
        isRegistration: getIsRegistrationSelector(state),
        isCorrectAuthData: getIsCorrectAuthDataSelector(state),
        isSendingData: getIsSendingDataSelector(state)
    }))

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const sendAuthorizationOrRegistration = useCallback((data) => dispatch(sendAuthorizationOrRegistrationThunk(data)), [dispatch])
    const setIsRegistration = useCallback((boolean) => dispatch(setIsRegistrationAC(boolean)), [dispatch])
    const setIsCorrectAuthData = useCallback(() => dispatch(setIsCorrectAuthDataAC(true)), [dispatch])

    //Функция - setter, для установки состояния value.
    const setStateValue = (value: string, loginOrPassOrName: loginOrPassOrNameTypes) => {
        console.log("setStateValue", value, loginOrPassOrName)
        setLogin((prevState: any) => {
            const prevLoginOrPass = prevState[loginOrPassOrName]
            return {...prevState, [loginOrPassOrName]: {...prevLoginOrPass, value}}
        })
    }

    //Функция - setter, для установки состояния isValid.
    const setStateIsValid = (isValid: boolean, loginOrPassOrName: loginOrPassOrNameTypes) => {
        console.log("setStateIsValid", isValid, loginOrPassOrName)
        setLogin((prevState: any) => {
            const prevLoginOrPass = prevState[loginOrPassOrName]
            return {...prevState, [loginOrPassOrName]: {...prevLoginOrPass, isValid}}
        })
    }

    //Функция для проверки валидности значения ввёдного в инпут.
    const checkIsValid = (value: string, loginOrPass: loginOrPassOrNameTypes) => {
        console.log("checkIsValid", value, loginOrPass)
        switch (loginOrPass) {
            case "name":
                return !!value.length
            case "login":
                return !!value.length
            case "password":
                return !!value.length
            default:
                return true
        }
    }

    //Функция для проверки готовности отправки запроса на сервер.
    const checkIsReadyToSend = () => {
        console.log("checkIsReadyToSend")
        const stateEntries = Object.entries(state)
        const isValidsArray = stateEntries.map(([loginOrPassOrName, {value}]) => {
            const isValid = checkIsValid(value, loginOrPassOrName)
            console.log(loginOrPassOrName, isValid, value, "checkIsReadyToSend MAP")
            !isValid && setStateIsValid(false, loginOrPassOrName)
            return isValid
        })
        // @ts-ignore
        return !isValidsArray.includes(false)
    }

    //Функция - обработчик события изменеия в инпуте. Проверка на валидность значения в инпуте.
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, loginOrPass: loginOrPassOrNameTypes) => {
        console.log("onChangeHandler", loginOrPass)
        // @ts-ignore
        const {isValid} = state[loginOrPass]
        const {currentTarget: {value}} = event
        !isValid && checkIsValid(value, loginOrPass) ?
            setStateIsValid(true, loginOrPass) :
            setStateValue(value, loginOrPass)
        !isCorrectAuthData && setIsCorrectAuthData()
    }

    //Функция - обработчик события блур. Проверка на валидность значения в инпуте,
    // а так-же, если блур в поле логин, то отправка запроса на существование пользователя
    const onBlurHandler = (event: FocusEvent, loginOrPassOrName: loginOrPassOrNameTypes) => {
        console.log("onBlurHandler", loginOrPassOrName)
        // @ts-ignore
        const {value} = state[loginOrPassOrName]
        const isValid = checkIsValid(value, loginOrPassOrName)
        setStateIsValid(isValid, loginOrPassOrName)
    }

    //Функция - обработчик события клик по кнопке отправить или зарегестрироваться
    const onClickHandler = () => {
        console.log("onClickHandler", checkIsReadyToSend())
        if(checkIsReadyToSend()) {
            const postData: AuthorizationData = Object.entries(state).reduce( (obj: any, [loginOrPassOrName, {value}]) => {
                if(!isRegistration && loginOrPassOrName == "name") return obj
                return obj[loginOrPassOrName] = value
            }, {} )
            sendAuthorizationOrRegistration(postData)
        }
    }

    //Функция возращает массив с конфигурацией для полей ввода
    const getInputsConfig = () => {
        const {
            name: {value: loginName, isValid: isValidName},
            login: {value: loginValue, isValid: isValidLogin},
            password: {value: passwordValue, isValid: isValidPassword}
        } = state
        return [
            {
                loginOrPassOrName: "name",
                inputType: "text",
                placeholder: "Введите ваше имя",
                value: loginName,
                isValid: isValidName
            },
            {
                loginOrPassOrName: "login",
                inputType: "text",
                placeholder: "Введите ваш E-mail",
                value: loginValue,
                isValid: isValidLogin
            },
            {
                loginOrPassOrName: "password",
                inputType: "password",
                placeholder: "Введите ваш пароль",
                value: passwordValue,
                isValid: isValidPassword
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
                { getInputsConfig().map( ({loginOrPassOrName, inputType, placeholder, value, isValid}) => {
                    if(!isRegistration && loginOrPassOrName == "name") return null
                    return <TextInput key={loginOrPassOrName}
                                      isValid={isValid} placeholder={placeholder}
                                      inputType={inputType} value={value}
                                      onBlurHandler={(event: FocusEvent) => onBlurHandler(event, loginOrPassOrName)}
                                      onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, loginOrPassOrName)}/>
                }) }
            </div>
            {!isCorrectAuthData && !isRegistration && <h4>Введённые данные не верны</h4>}
            <Button onClickHandler={onClickHandler} label={!isRegistration ? "Войти" : "Зарегестрироваться"}
                    isDisabled={isSendingData} className={"authorization-popupBox__btn"}/>
            {getBtnByIsExistUserForSwitch()}
        </div>
    );
}

export default AuthorizationPopupBox;
