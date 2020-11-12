import React, {ChangeEvent, useCallback, useEffect} from 'react';
import "./settingsPageStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import {postLogoutOrDeleteUser, postSettingByFieldThunk} from "../../redux/thunks/thunks";
import Footer from "../../components/footer/footer";
import {SettingsFieldType} from '../../redux/reducers/settingsState/settingsState';
import TextInput from "../../components/textInput/textInput";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import {getSettingsFieldValueByFieldSelector} from '../../redux/reducers/settingsState/settingsStateSelectors';
import AlertModalWindow from "../../components/modalWindow/alertModalWindow/alertModalWindow";
import {setIsValidFormReducerAC, seValueFormReducerAC} from "../../redux/reducers/formState/formStateActionCreators";
import {getFieldsByPageFormReducerSelector} from "../../redux/reducers/formState/formStateSelectors";
import withAuthRedirectHoc from '../../hocs/withAuthRedirectHoc';
import ImagePicker from "../../components/imagePicker/imagePicker";

const SettingsPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const formState = useSelector((state) => getFieldsByPageFormReducerSelector(state, "settings"))
    const {avatar, name, phone, login,} = formState

    const settingsState = useSelector( (state) => ({
        avatar: getSettingsFieldValueByFieldSelector(state, "avatar"),
        name: getSettingsFieldValueByFieldSelector(state, "name"),
        phone: getSettingsFieldValueByFieldSelector(state, "phone"),
        login: getSettingsFieldValueByFieldSelector(state, "login")
    }) )
    const settingsStateEntries = Object.entries(settingsState)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const postSettingByField = useCallback((data, field) => dispatch(postSettingByFieldThunk(data, field)), [dispatch])
    const logoutUser = useCallback(() => dispatch(postLogoutOrDeleteUser("logout")), [dispatch])
    const deleteUser = useCallback(() => dispatch(postLogoutOrDeleteUser("delete")), [dispatch])
    const seValueFormReducer = useCallback((value, field) => dispatch(seValueFormReducerAC(value, field, "settings")), [dispatch])
    const setIsValidFormReducer = useCallback((field) => dispatch(setIsValidFormReducerAC(field, "settings")), [dispatch])

    //------DID-MOUNT-LIFE-CYCLE-----//
    useEffect(() => {
        settingsStateEntries.forEach( ([key, value]) => seValueFormReducer(value, key) )
    }, [])

    const onLoadImageHandler = (image: any, imageName: string) => {
        const postData = {photo: image, name: imageName}
        seValueFormReducer(image, "avatar")
        postSettingByField(postData, "avatar")
    }

    //Функция - обработчик события изменеия в инпуте. Проверка на валидность значения в инпуте.
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, field: SettingsFieldType) => {
        console.log("onChangeHandler", field)
        const {currentTarget: {value}} = event
        seValueFormReducer(value, field)
    }

    //Функция - обработчик события клик по кнопке отправить или зарегестрироваться
    const onClickHandler = (field: SettingsFieldType) => {
        // @ts-ignore
        const {isValid, value} = formState[field]
        // @ts-ignore
        const valueFromSettingsState = settingsState[field]
        console.log("onClickHandler", isValid)
        const postData = {[field] : value}
        isValid && value !== valueFromSettingsState && postSettingByField(postData, field)
    }

    //TODO Вынести конфиги для всех инпутов в formState!!
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

    return (
        <div className={"settingsPage fullHeightContent"}>
            <Header/>
            <div className="container-lg pb-5 pt-5">
                <h2 className="display-5 jumbotron p-2 mb-5">Настройки профиля</h2>
                <div className="d-flex justify-content-around">
                    <div className="settingsPage__settings-wrapper">

                        <div className="settingsPage__setting-avatar w-100">
                            <Image photo={avatar.value}/>
                            <ImagePicker className={"position-absolute fixed-top opacity-0"} onLoadHandler={onLoadImageHandler}/>
                        </div>

                        <div className="settingsPage__logouOrDel-wrapper">
                            <AlertModalWindow openBtnElement={<Button className={"btn-warning w-100 mb-4"} label={"Выйти из аккаунта"}/>}
                                              btnOneConfiguration={{btnOneLabel: "Нет"}}
                                              btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler:logoutUser }}
                                              alertText={"Выйти из аккаунта?"}/>

                            <AlertModalWindow openBtnElement={<Button className={"btn-danger w-100"} label={"Удалить аккаунт"}/>}
                                              btnOneConfiguration={{btnOneLabel: "Нет"}}
                                              btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler:deleteUser }}
                                              alertText={"Удалить аккаунт?"}/>
                        </div>

                    </div>
                    <div className="settingsPage__settings-wrapper col-lg-5">
                        { getInputsConfig().map( ({field, ...restConfig}) => <>
                            <div className="settingsPage__setting input-group w-100">
                                <TextInput className={"w-75"} key={field} {...restConfig}
                                           onBlurHandler={() => setIsValidFormReducer(field)}
                                           onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, field)}/>
                                <Button className={"input-group-append btn-success align-self-end"} onClickHandler={() => onClickHandler(field)} label={"Сохранить"}/>
                            </div>
                            <hr className="my-4"/> </>) }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default withAuthRedirectHoc(SettingsPage);
