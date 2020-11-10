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
    checkIsReadyToSendByPageFormReducerAC,
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
                field: "description",
                label: "Описание",
                inputType: "text",
                value: description.value,
                isValid: description.isValid
            },
            {
                field: "price",
                label: "Цена",
                inputType: "number",
                value: price.value,
                isValid: price.isValid
            },
        ]
    }

    // const {name, subway, photos, description, phone, category, price} = state

    const getErrorClassName = (field: "category" | "subway") =>
        !formState[field].isValid && "createAnnouncement__title-error"

    return (
        <div className={"createAnnouncement fullHeightContent"}>
            <Header/>
            <div className="createAnnouncement__container container">
                <div className="createAnnouncement__category">
                    <h2 className={`createAnnouncement__category-title ${getErrorClassName("category")}`}>
                        Категория
                    </h2>
                    <Select onBlurHandler={() => setIsValidFormReducer("category")}
                        onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("category", selectItem, handler)}
                        value={category.value.label} selectItems={categoriesData} placeHolder={"Выбор категории"}/>
                </div>
                <div className="createAnnouncement__params">
                    <h2 className="createAnnouncement__params-title">Категория</h2>
                    {getInputsParamsConfig().map(({field, ...restConfig}) =>
                        <TextInput key={field} {...restConfig}
                                   onBlurHandler={() => setIsValidFormReducer(field)}
                                   onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, field)}/>)}

                    <div className="createAnnouncement__params-photos">
                        <div className="createAnnouncement__params-photos-label">
                            <span>Фотографии</span>
                            <span>{`${photos.value.length} из 5`}</span>
                        </div>
                        <div className="createAnnouncement__params-photos-files">
                            {photos.value.map( ({photo}: any) => <Image className={"createAnnouncement__params-photos-files-file"} photo={photo}/> )}
                            {photos.value.length < 5 &&
                            <ImagePicker className={"createAnnouncement__params-photos-files-load"} onLoadHandler={onLoadImageHandler}/>}
                        </div>
                    </div>
                </div>

                <div className="createAnnouncement__location">
                    <h2 className={`createAnnouncement__location-title ${getErrorClassName("subway")}`}>Место сделки</h2>
                    <Select onBlurHandler={() => setIsValidFormReducer("subway")}
                        onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("subway", selectItem, handler)}
                        value={subway.value.label} selectItems={subwayStationsData} placeHolder={"Выбор метро"}/>
                </div>
                <div className="createAnnouncement__contacts">
                    <h2 className="createAnnouncement__contacts-title">Контакты</h2>
                    <TextInput className={"createAnnouncement__input"} isValid={phone.isValid} value={phone.value}
                               placeholder={"Номер телефона"} label={"Телефон"} inputType={"number"}
                               onBlurHandler={() => setIsValidFormReducer("phone")}
                               onChangeHandler={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(event, "phone")}/>
                </div>

                <Button label={"Создать объявление"} isDisabled={isFetching} onClickHandler={checkIsReadyToSend}/>
            </div>
            <Footer/>
        </div>
    );
}

export default withAuthRedirectHoc(CreateAnnouncement);
