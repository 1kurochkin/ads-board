import React, {useCallback, useEffect} from 'react';
import "./settingsPageStyles.css"
import {useDispatch, useSelector} from "react-redux";
import {postLogoutOrDeleteUser, postSettingByFieldThunk} from "../../redux/thunks/thunks";
import {SettingsFieldType} from '../../redux/reducers/settingsState/settingsState';
import TextInput from "../../components/textInput/textInput";
import Button from "../../components/button/button";
import Picture from "../../components/picture/picture";
import {getSettingsFieldValueByFieldSelector} from '../../redux/reducers/settingsState/settingsStateSelectors';
import AlertModalWindow from "../../components/modalWindow/alertModalWindow/alertModalWindow";
import {setIsValidFormReducerAC, seValueFormReducerAC} from "../../redux/reducers/formState/formStateActionCreators";
import {getFieldsByPageFormReducerSelector} from "../../redux/reducers/formState/formStateSelectors";
import withAuthRedirectHoc from '../../hocs/withAuthRedirectHoc';
import ImagePicker from "../../components/imagePicker/imagePicker";
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";

const SettingsPage = (props: any) => {

    useSetMetaTitleAndDescription(
        "Настройки профиля",
        "Страница настроек профиля на Salam.ru"
    )

    //------MAP-STATE-TO-PROPS-----//
    const formState = useSelector((state) => getFieldsByPageFormReducerSelector(state, "settings"))
    const {photo, name, phone, login} = formState

    const settingsState = useSelector((state) => ({
        photo: getSettingsFieldValueByFieldSelector(state, "photo"),
        name: getSettingsFieldValueByFieldSelector(state, "name"),
        phone: getSettingsFieldValueByFieldSelector(state, "phone"),
        login: getSettingsFieldValueByFieldSelector(state, "login")
    }))
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
        settingsStateEntries.forEach(([key, value]) => seValueFormReducer(value, key))
    }, [])

    const onLoadImageHandler = (file: any) => {
        seValueFormReducer(file, "photo")
        postSettingByField(file, "photo")
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
        const postData = {[field]: value}
        isValid && value !== valueFromSettingsState && postSettingByField(postData, field)
    }

    //TODO Вынести конфиги для всех инпутов в formState!!
    //Функция возращает массив с конфигурацией для полей ввода
    const getInputsConfig = () => {
        return [
            {
                field: "login",
                label: "Логин",
                inputType: "text",
                isReadOnly:true,
                value: login.value,
                isValid: login.isValid
            },
            {
                field: "name",
                label: "Имя",
                inputType: "text",
                value: name.value,
                onBlurHandler: () => setIsValidFormReducer("name"),
                onChangeHandler: (event: any) => onChangeHandler(event, "name"),
                isValid: name.isValid
            },
            {
                field: "phone",
                label: "Номер телефона",
                inputType: "number",
                value: phone.value,
                onBlurHandler: () => setIsValidFormReducer("phone"),
                onChangeHandler: (event: any) => onChangeHandler(event, "phone"),
                isValid: phone.isValid
            },
        ]
    }

    return (
        <div className="container-lg pb-5 pt-5">
            <h1 className="display-5 jumbotron p-2 mb-5">Настройки профиля</h1>
            <div className="d-lg-flex justify-content-around">
                <div className="settingsPage__settings-wrapper">

                    <div className="settingsPage__setting-avatar w-100">
                        <Picture photo={photo.value}/>
                        <ImagePicker className={"position-absolute fixed-top opacity-0"}
                                     onLoadHandler={onLoadImageHandler}/>
                        <span>Для изменения фотографии - нажмите на изображение</span>
                    </div>

                    <div className="settingsPage__logouOrDel-wrapper">
                        <AlertModalWindow
                            openBtnElement={<Button className={"btn-warning w-100 mb-4"} label={"Выйти из аккаунта"}/>}
                            btnOneConfiguration={{btnOneLabel: "Нет"}}
                            btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler: logoutUser}}
                            alertText={"Выйти из аккаунта?"}/>

                        <AlertModalWindow
                            openBtnElement={<Button className={"btn-danger w-100"} label={"Удалить аккаунт"}/>}
                            btnOneConfiguration={{btnOneLabel: "Нет"}}
                            btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler: deleteUser}}
                            alertText={"Удалить аккаунт?"}/>
                    </div>

                </div>
                <div className="settingsPage__settings-wrapper p-0 mt-5 col-lg-5">
                    {getInputsConfig().map(({field, ...restConfig}) => <>
                        <div className="settingsPage__setting d-flex input-group my-2">
                            <TextInput key={field} {...restConfig}/>
                            {field !== "login" ? <Button className={"input-group-append btn-success ml-4 align-self-end"}
                                    onClickHandler={() => onClickHandler(field)} label={"Сохранить"}/> : null}
                        </div>
                        <hr className="my-4"/>
                    </>)}
                </div>
            </div>
        </div>
    );
}

export default withAuthRedirectHoc(SettingsPage);
