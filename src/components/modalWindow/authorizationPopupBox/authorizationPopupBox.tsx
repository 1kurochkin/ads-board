import React, {ChangeEvent, useCallback, useState} from 'react';
import "./authorizationPopupBoxStyles.css"
import TextInput from "../../textInput/textInput";
import {useDispatch, useSelector} from "react-redux";
import {sendAuthorizationOrRegistrationThunk, sendIsExistUserThunk} from "../../../redux/thunks/thunks";
import {setIsCorrectAuthDataAC} from "../../../redux/authorizationState/authorizationStateActionCreators";
import {
    getIsCorrectAuthDataSelector,
    getIsExistUserSelector
} from "../../../redux/authorizationState/authorizationStateSelectors";
import {getIsSendingDataSelector} from "../../../redux/mainState/mainStateSelectors";

type loginOrPassTypes = "password" | "login" | string

const AuthorizationPopupBox = () => {
    //-----LOCAL-STATE-----//
    const [state, setLogin] =
        useState({
            login : {value: "", isValid: true},
            password : {value: "", isValid: true}
        })

    //------MAP-STATE-TO-PROPS-----//
    const {isExistUser, isSendingData, isCorrectAuthData} = useSelector((state) => ({
        isExistUser: getIsExistUserSelector(state),
        isCorrectAuthData: getIsCorrectAuthDataSelector(state),
        isSendingData: getIsSendingDataSelector(state)
    }) )

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const sendAuthorizationOrRegistration = useCallback((data) => dispatch(sendAuthorizationOrRegistrationThunk(data)), [dispatch])
    const sendIsExistUser = useCallback((data) => dispatch(sendIsExistUserThunk(data)), [dispatch])
    const setIsCorrectAuthData = useCallback(() => dispatch(setIsCorrectAuthDataAC(true)), [dispatch])

    //Функция - setter, для установки состояния value.
    const setStateValue = (value:string, loginOrPass:loginOrPassTypes) => {
        console.log("setStateValue", value, loginOrPass)
        setLogin((prevState:any) => {
            const prevLoginOrPass = prevState[loginOrPass]
            return {...prevState, [loginOrPass] : {...prevLoginOrPass, value}}
        })
    }

    //Функция - setter, для установки состояния isValid.
    const setStateIsValid = (isValid:boolean, loginOrPass:loginOrPassTypes) => {
        console.log("setStateIsValid", isValid, loginOrPass)
        setLogin((prevState:any) => {
            const prevLoginOrPass = prevState[loginOrPass]
            return {...prevState, [loginOrPass] : {...prevLoginOrPass, isValid}}
        })
    }

    //Функция для проверки валидности значения ввёдного в инпут.
    const checkIsValid = (value:string, loginOrPass:loginOrPassTypes) => {
        console.log("checkIsValid", value, loginOrPass)
        switch (loginOrPass) {
            case "login": return !!value.length
            case "password": return !!value.length
            default: return true
        }
    }

    //Функция для проверки готовности отправки запроса на сервер.
    const checkIsReadyToSend = () => {
        console.log("checkIsReadyToSend")
        const stateEntries = Object.entries(state)
        const isValidsArray = stateEntries.map(([loginOrPass, {value}]) => {
            const isValid = checkIsValid(value, loginOrPass)
            console.log(loginOrPass, isValid, value, "checkIsReadyToSend MAP")
            !isValid && setStateIsValid(false, loginOrPass)
            return isValid
        })
        // @ts-ignore
        return !isValidsArray.includes(false)
    }

    //Функция - обработчик события изменеия в инпуте. Проверка на валидность значения в инпуте.
    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>, loginOrPass:loginOrPassTypes) => {
        console.log("onChangeHandler", loginOrPass)
        // @ts-ignore
        const {isValid} = state[loginOrPass]
        const {currentTarget : {value} } = event
        !isValid && checkIsValid(value, loginOrPass) ?
            setStateIsValid(true, loginOrPass):
            setStateValue(value, loginOrPass)
        !isCorrectAuthData && setIsCorrectAuthData()
    }

    //Функция - обработчик события блур. Проверка на валидность значения в инпуте,
    // а так-же, если блур в поле логин, то отправка запроса на существование пользователя
    const onBlurHandler = (event: FocusEvent, loginOrPass:loginOrPassTypes) => {
        console.log("onBlurHandler", loginOrPass)
        // @ts-ignore
        const {value} = state[loginOrPass]
        if(checkIsValid(value, loginOrPass)) {
            setStateIsValid(true, loginOrPass)
            loginOrPass === "login" && sendIsExistUser(value)
        } else setStateIsValid(false, loginOrPass)

    }

    //Функция - обработчик события клик по кнопке отправить или зарегестрироваться
    const onClickHandler = () => {
        console.log("onClickHandler", checkIsReadyToSend())
        const {login, password} = state
        const postData = {login: login.value, password: password.value}

        checkIsReadyToSend() && sendAuthorizationOrRegistration(postData)
    }

    //Функция возращает массив с конфигурацией для полей ввода
    const getInputsConfig = () => {
        const {
            login :{value:loginValue, isValid:isValidLogin},
            password :{value:passwordValue, isValid:isValidPassword}
        } = state
      return [
          {loginOrPass: "login", inputType: "text", placeholder: "Введите ваш E-mail", value: loginValue, isValid: isValidLogin},
          {loginOrPass: "password", inputType: "password", placeholder: "Введите ваш пароль", value: passwordValue, isValid: isValidPassword},
      ]
    }

    //Функция возращает кнопку для отображения в зависимости от условия
    const getBtnByIsExistUser = () => !isSendingData ?
        <div onClick={onClickHandler} className="authorization-popupBox__btn btn">
            {isExistUser ? "Войти" : "Зарегестрироваться" }
        </div> : <div className="authorization-popupBox__btn btn">Отправка...</div>



  return (
    <div className="authorization-popupBox">
        <h2 className={"authorization-popupBox__title"}>{isExistUser ? "Вход" : "Регистрация"}</h2>
        <div className="authorization-popupBox__inputs-wrapper">
            {getInputsConfig().map(({loginOrPass,inputType, placeholder, value, isValid}) =>
                <TextInput key={loginOrPass}
                           isValid={isValid} placeholder={placeholder}
                           inputType={inputType} value={value}
                           onBlurHandler={(event: FocusEvent) => onBlurHandler(event, loginOrPass)}
                           onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, loginOrPass)}/>)}
        </div>
        {!isCorrectAuthData && <h4>Введённые данные не верны</h4>}
        {!isExistUser && <h3>Такого пользователя не существует</h3>}
        {getBtnByIsExistUser()}
    </div>
  );
}

export default AuthorizationPopupBox;
