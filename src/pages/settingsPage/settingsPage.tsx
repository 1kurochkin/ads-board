import React, {ChangeEvent, useCallback, useState} from 'react';
import "./settingsPageStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import {postLogoutOrDeleteUser, postSettingByFieldThunk} from "../../redux/thunks/thunks";
import Footer from "../../components/footer/footer";
import {SettingsFieldType} from '../../redux/reducers/settingsState/settingsState';
import TextInput from "../../components/textInput/textInput";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import {
    getAvatarSelector,
    getLoginSelector,
    getNameSelector,
    getPhoneSelector
} from '../../redux/reducers/settingsState/settingsStateSelectors';
import AlertModalWindow from "../../components/modalWindow/alertModalWindow/alertModalWindow";

const SettingsPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const avatarRedux = useSelector(getAvatarSelector)
    const nameRedux = useSelector(getNameSelector)
    const phoneRedux = useSelector(getPhoneSelector)
    const loginRedux = useSelector(getLoginSelector)

    //-----LOCAL-STATE-----//
    const [state, setLogin] =
        useState({
            avatar: {value: avatarRedux, isValid: true},
            name: {value: nameRedux, isValid: true},
            phone: {value: phoneRedux, isValid: true},
            login: {value: loginRedux, isValid: true}
        })

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const postSettingByField = useCallback((data, field) => dispatch(postSettingByFieldThunk(data, field)), [dispatch])
    const logoutUser = useCallback(() => dispatch(postLogoutOrDeleteUser("logout")), [dispatch])
    const deleteUser = useCallback(() => dispatch(postLogoutOrDeleteUser("delete")), [dispatch])

    //Функция - setter, для установки состояния value.
    const setStateValue = (value: string | ArrayBuffer | null, field: SettingsFieldType) => {
        console.log("setStateValue", value, field)
        setLogin((prevState: any) => {
            const prevFieldState = prevState[field]
            return {...prevState, [field]: {...prevFieldState, value}}
        })
    }

    const onChangeFileHandler = (event: any) => {
        const file = event.target.files[0]
        const {name = `uploadUserImg${Date.now()}`} = file
        const reader = new FileReader();

        reader.onload = () => {
            const {result} = reader
            const postData = {photo: result, name}
            setStateValue(result, "avatar")
            postSettingByField(postData, "avatar")
        }

        reader.readAsDataURL(file)
    }


    //Функция - setter, для установки состояния isValid.
    const setStateIsValid = (isValid: boolean, field: SettingsFieldType) => {
        console.log("setStateIsValid", isValid, field)
        setLogin((prevState: any) => {
            const prevFieldState = prevState[field]
            return {...prevState, [field]: {...prevFieldState, isValid}}
        })
    }

    //Функция для проверки валидности значения ввёдного в инпут.
    const checkIsValid = (value: string, field: SettingsFieldType) => {
        console.log("checkIsValid", value, field)
        switch (field) {
            case "avatar":
                return true
            case "name":
                return !!value.length
            case "login":
                return !!value.length
            case "phone":
                return !!value.length
            case "password":
                return !!value.length
            case "currentPassword":
                return !!value.length
            default:
                return true
        }
    }

    //Функция - обработчик события изменеия в инпуте. Проверка на валидность значения в инпуте.
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, field: SettingsFieldType) => {
        console.log("onChangeHandler", field)
        // @ts-ignore
        const {isValid}: any = state[field]
        const {currentTarget: {value}} = event
        !isValid && checkIsValid(value, field) && setStateIsValid(true, field)
        setStateValue(value, field)
    }

    //Функция - обработчик события блур. Проверка на валидность значения в инпуте,
    // а так-же, если блур в поле логин, то отправка запроса на существование пользователя
    const onBlurHandler = (event: FocusEvent, field: SettingsFieldType) => {
        console.log("onBlurHandler", field)
        // @ts-ignore
        const {value} = state[field]
        const isValid = checkIsValid(value, field)
        setStateIsValid(isValid, field)
    }

    //Функция - обработчик события клик по кнопке отправить или зарегестрироваться
    const onClickHandler = (field: SettingsFieldType) => {
        // @ts-ignore
        const {isValid, value} = state[field]
        console.log("onClickHandler", isValid)
        const postData = {[field] : value}
        isValid && postSettingByField(postData, field)
    }

    //Функция возращает массив с конфигурацией для полей ввода
    const getInputsConfig = () => {
        return [
            {
                field: "name",
                label: "Имя",
                inputType: "text",
                value: name.value,
                isValid: name.isValid
            },
            {
                field: "login",
                label: "Логин",
                inputType: "text",
                value: login.value,
                isValid: login.isValid
            },
            {
                field: "phone",
                label: "Номер телефона",
                inputType: "tel",
                value: phone.value,
                isValid: phone.isValid
            },
        ]
    }

    const {avatar, name, phone, login} = state

    return (
        <div className={"settingsPage fullHeightContent"}>
            <Header/>
            <div className="settingsPage__container container">
                <div className="settingsPage__settings-wrapper">

                    <div className="settingsPage__setting-avatar">
                        <Image photo={avatar.value}/>
                        <input onChange={onChangeFileHandler} type="file" className="settingsPage__setting-avatar-file"/>
                    </div>

                    <div className="settingsPage__logouOrDel-wrapper">
                        <AlertModalWindow openBtnElement={<Button label={"Выйти из аккаунта"}/>}
                                          btnOneConfiguration={{btnOneLabel: "Нет"}}
                                          btnTwoConfiguration={{btnTwoLabel: "Да", handler:logoutUser }}
                                          alertText={"Выйти из аккаунта?"}/>

                        <AlertModalWindow openBtnElement={<Button label={"Удалить аккаунт"}/>}
                                          btnOneConfiguration={{btnOneLabel: "Нет"}}
                                          btnTwoConfiguration={{btnTwoLabel: "Да", handler:deleteUser }}
                                          alertText={"Удалить аккаунт?"}/>
                    </div>

                </div>

                <div className="settingsPage__settings-wrapper">
                    { getInputsConfig().map( ({field, ...restConfig}) => {
                        return (
                            <div className="settingsPage__setting">
                            <TextInput key={field} {...restConfig}
                                       onBlurHandler={(event: FocusEvent) => onBlurHandler(event, field)}
                                       onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, field)}/>
                                <Button onClickHandler={() => onClickHandler(field)} label={"Сохранить"}/>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default SettingsPage;
