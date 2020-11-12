import React, {ChangeEvent, useCallback, useEffect} from 'react';
import "./createAnnouncementStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import {postNewAnnouncementThunk} from "../../redux/thunks/thunks";
import Footer from "../../components/footer/footer";
import TextInput from "../../components/textInput/textInput";
import Select from "../../components/searchBox/select/select";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import {
    getCategoriesDataSelector,
    getIsFetchingMainStateSelector,
    getSubwayStationsDataSelector
} from "../../redux/reducers/mainState/mainStateSelectors";
import {
    checkIsReadyToSendByPageFormReducerAC, resetToInitialByPageFormReducerAC,
    setIsValidFormReducerAC,
    seValueFormReducerAC
} from "../../redux/reducers/formState/formStateActionCreators";
import {getFieldsByPageFormReducerSelector} from "../../redux/reducers/formState/formStateSelectors";
import {prepareFormStateByPageForSend} from "../../redux/reducers/formState/formState";
import {getSettingsFieldValueByFieldSelector} from "../../redux/reducers/settingsState/settingsStateSelectors";
import withAuthRedirectHoc from "../../hocs/withAuthRedirectHoc";
import ImagePicker from "../../components/imagePicker/imagePicker";

type CreateAnnouncementFieldsType =
    "photos"
    | "name"
    | "price"
    | "category"
    | "description"
    | "subway"
    | "phone"
    | string

const CreateAnnouncement = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const subwayStationsData = useSelector(getSubwayStationsDataSelector)
    const categoriesData = useSelector(getCategoriesDataSelector)
    const phoneRedux = useSelector( (state) => getSettingsFieldValueByFieldSelector(state, "phone"))
    const formState = useSelector((state) => getFieldsByPageFormReducerSelector(state, "createAnnouncement"))
    const {
        photos, name,
        price, category,
        description,
        phone, subway,
        isReadyToSend
    } = formState
    const isFetching = useSelector(getIsFetchingMainStateSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const postNewAnnouncement = useCallback((data) => dispatch(postNewAnnouncementThunk(data)), [dispatch])
    const seValueFormReducer = useCallback((value, field) => dispatch(seValueFormReducerAC(value, field, "createAnnouncement")), [dispatch])
    const setIsValidFormReducer = useCallback((field) => dispatch(setIsValidFormReducerAC(field, "createAnnouncement")), [dispatch])
    const checkIsReadyToSend = useCallback(() => dispatch(checkIsReadyToSendByPageFormReducerAC("createAnnouncement")), [dispatch])
    const resetToInitialByPageFormReducer = useCallback(() => dispatch(resetToInitialByPageFormReducerAC("createAnnouncement")), [dispatch])

    //------DID-MOUNT-LIFE-CYCLE-----//
    useEffect(() => {
        seValueFormReducer(phoneRedux, "phone")
    }, [])

    //------DID-UPDATE-LIFE-CYCLE-----//
    useEffect(() => {
        if(isReadyToSend) {
            const condition = (postData: any, key: any, value: any) => {
                key === "category" || key === "subway" ? postData[key] = value.id : postData[key] = value
                return postData
            }
            const postData = prepareFormStateByPageForSend(formState)(condition)
            postNewAnnouncement(postData)
        }
    }, [isReadyToSend])

    const selectItemOnChangeHandler = (field: "category" | "subway", selectItem: any, setIsActiveSelect: Function) => {
        seValueFormReducer(selectItem, field)
        setIsActiveSelect(false)
    }

    const onLoadImageHandler = (image: any, imageName: string) => {
        const value = photos.value.concat({photo: image, name: imageName})
        seValueFormReducer(value, "photos")
    }

    //Функция - обработчик события изменеия в инпуте. Проверка на валидность значения в инпуте.
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, field: CreateAnnouncementFieldsType) => {
        console.log("onChangeHandler", field)
        const {currentTarget: {value}} = event
        seValueFormReducer(value, field)
    }

    const deleteLoadedImage = (imageName: string) => {
        const newPhotosValue = photos.value.filter( ({photo, name}: any) => name !== imageName)
        seValueFormReducer(newPhotosValue, "photos")
    }

    //Функция возращает массив с конфигурацией для полей ввода
    const getInputsParamsConfig = () => {
        return [
            {
                field: "name",
                label: "Имя",
                inputType: "text",
                value: name.value,
                isValid: name.isValid
            },
            {
                field: "price",
                label: "Цена",
                inputType: "number",
                value: price.value,
                isValid: price.isValid
            },
            {
                field: "description",
                label: "Описание",
                inputType: "textArea",
                value: description.value,
                isValid: description.isValid
            },
        ]
    }

    // const {name, subway, photos, description, phone, category, price} = state

    const getErrorClassName = (field: "category" | "subway") =>
        !formState[field].isValid && "createAnnouncement__title-error"

    return (
        <div className={"createAnnouncement fullHeightContent"}>
            <Header/>
            <div className="createAnnouncement__container container-lg pt-5">
                <h1 className="display-5 jumbotron p-2 mb-5">Создание объявления</h1>
                <div className="createAnnouncement__category d-flex">
                    <h4 className={`createAnnouncement__category-title col-lg-3 text-left p-0 ${getErrorClassName("category")}`}>
                        Категория
                    </h4>
                    <Select className={"col-lg-4"} onBlurHandler={() => setIsValidFormReducer("category")}
                        onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("category", selectItem, handler)}
                        value={category.value.label} selectItems={categoriesData} placeHolder={"Выбор категории"}/>
                </div>
                <hr className="my-4"/>
                <div className="createAnnouncement__params d-flex">
                    <h4 className="createAnnouncement__params-title col-lg-3 text-left p-0">Параметры</h4>
                    <div className="col-lg-4 p-0">
                        {getInputsParamsConfig().map(({field, ...restConfig}) =>
                            <TextInput className={"mb-3"} key={field} {...restConfig}
                                       onBlurHandler={() => setIsValidFormReducer(field)}
                                       onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, field)}/>)}

                        <div className="createAnnouncement__params-photos position-relative">
                            <div className="createAnnouncement__params-photos-label mb-3">
                                <span>{`Фотографии ${photos.value.length} из 5`}</span>
                            </div>
                            <div style={{height: "73px"}} className="createAnnouncement__params-photos-files d-flex">
                                {photos.value.map( ({photo, name}: any) => <Image onClickHandler={() => deleteLoadedImage(name)} className={"createAnnouncement__params-photos-files-file col-lg-4 mr-2"} photo={photo}/> )}
                                {photos.value.length < 5 &&
                                <ImagePicker className={"col-lg-4 p-0"} onLoadHandler={onLoadImageHandler}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4"/>
                <div className="createAnnouncement__location d-flex">
                    <h4 className={`createAnnouncement__location-title col-lg-3 text-left p-0 ${getErrorClassName("subway")}`}>Место сделки</h4>
                    <Select className={"col-lg-4 p-0"} onBlurHandler={() => setIsValidFormReducer("subway")}
                        onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("subway", selectItem, handler)}
                        value={subway.value.label} selectItems={subwayStationsData} placeHolder={"Выбор метро"}/>
                </div>
                <hr className="my-4"/>

                <div className="createAnnouncement__contacts d-flex">
                    <h4 className="createAnnouncement__contacts-title col-lg-3 text-left p-0">Контакты</h4>
                    <TextInput className={"col-lg-3 p-0"} isValid={phone.isValid} value={phone.value}
                               placeholder={"Номер телефона"} label={"Телефон"} inputType={"number"}
                               onBlurHandler={() => setIsValidFormReducer("phone")}
                               onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, "phone")}/>
                </div>
                <hr className="my-4"/>
                <div className={"d-flex justify-content-around mb-5 col-lg-7 p-0"}>
                    <Button className={"btn-success col-lg-7"} label={"Создать объявление"} isDisabled={isFetching} onClickHandler={checkIsReadyToSend}/>
                    <Button className={"btn-danger col-lg-4"} label={"Очистить поля"} isDisabled={isFetching} onClickHandler={resetToInitialByPageFormReducer}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default withAuthRedirectHoc(CreateAnnouncement);
