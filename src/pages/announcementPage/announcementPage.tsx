import React, {useCallback, useEffect} from 'react';
import "./announcementPageStyles.css"
import {useDispatch, useSelector} from "react-redux";
import {getAnnouncementByIdThunk} from "../../redux/thunks/thunks";
import {useHistory, useParams} from 'react-router-dom';
import {
    getAnnouncementSelector,
    getIsFetchingAnnouncementReducerSelector
} from '../../redux/reducers/announcementState/announcementStateSelectors';
import Button from "../../components/button/button";
import Slider from "../../components/slider/slider";
import Picture from "../../components/picture/picture";
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";
import {resetToInitialAnnouncementStateAC} from "../../redux/reducers/announcementState/announcementStateActionCreators";

const AnnouncementPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const {
        photos = [],
        name = "",
        price = 0,
        description = "",
        station = "",
        contactName = "",
        contactPhone = "",
        creationDate = ""
    } = useSelector(getAnnouncementSelector)

    useSetMetaTitleAndDescription(
        name,
        `Страница объявления ${name} на Salam.ru`
    )

    //------CATCH-PARAMS-FROM-URL-----//
    const {id} = useParams()

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getAnnouncementById = useCallback(() => dispatch(getAnnouncementByIdThunk(id)), [dispatch])
    const resetToInitialAnnouncementState = useCallback(() => dispatch(resetToInitialAnnouncementStateAC()), [dispatch])

    const {goBack} = useHistory()

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        getAnnouncementById()
        return () => {
            resetToInitialAnnouncementState()
        }
    }, [id])

    return (
        <div className="announcementPage__container container-lg pt-5 pb-5">
            <div className="d-flex flex-column flex-md-row justify-content-md-between">
                <Button svgIconName={"arrowLeft"} className={"btn-primary order-md-1"} onClickHandler={goBack} label={"Назад"}/>
                <hr className="my-4 mobile"/>
                <h1 className="announcementPage__name text-left m-0">{name}</h1>
            </div>

            <hr className="my-4"/>
            <div className="announcementPage__photoAndInfo-wrapper d-block d-lg-flex mb-lg-5">

                <div className="announcementPage__photo-slider">
                    {!photos.length ? <Picture photo={""}/> : <Slider>
                        {photos.map((photo: string) => <Picture photo={photo}/>)}
                    </Slider>}
                </div>

                <div className="announcementPage__info-wrapper mt-5 ml-lg-5 col-sm-12 col-lg-5 p-0">
                    {price !== 0 &&
                    <h3 className="announcementPage__info-price bg-warning p-2 m-0 text-left">{`Цена: ${price} руб.`}</h3>}
                    <hr className="my-lg-4 my-3"/>
                    <h5 className="announcementPage__info-location text-left alert alert-warning">{`Метро: ${station}`}</h5>
                    <hr className="my-lg-4 my-3"/>
                    <div className="announcementPage__info-inner-wrapper alert alert-success">
                        <h5 className="announcementPage__info-name text-left">Продавец: {contactName}</h5>
                        <h5 className="announcementPage__info-name text-left">Телефон: {contactPhone}</h5>
                    </div>
                    <hr className="my-lg-4 my-3"/>
                    <h5 className="announcementPage__creationDate alert alert-dark">Дата создания
                        объявления: {creationDate}</h5>
                </div>
            </div>
            <div className="announcementPage__description alert alert-primary">
                <h5 className={"text-left"}>Описание:</h5>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default AnnouncementPage;
