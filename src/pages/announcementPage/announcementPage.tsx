import React, {useCallback, useEffect} from 'react';
import "./announcementPageStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import {getAnnouncementByCategoryAndIdThunk} from "../../redux/thunks/thunks";
import Footer from "../../components/footer/footer";
import {useHistory, useParams} from 'react-router-dom';
import {
    getAnnouncementSelector,
    getIsFetchingAnnouncementReducerSelector
} from '../../redux/reducers/announcementState/announcementStateSelectors';
import Button from "../../components/button/button";
import Slider from "../../components/slider/slider";
import Image from "../../components/image/image";

const AnnouncementPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const isFetching = useSelector(getIsFetchingAnnouncementReducerSelector)
    const {
        photos = [],
        name = "",
        price = 0,
        description = "",
        subwayStation = "",
        contacts : {
            user = "",
            phone = "",
        } = {},
        creationDate = "",
    } = useSelector(getAnnouncementSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getAnnouncementByCategoryAndId = useCallback(() => dispatch(getAnnouncementByCategoryAndIdThunk(category, id)), [dispatch])

    //------CATCH-PARAMS-FROM-URL-----//
    const {category, id} = useParams()

    const {goBack} = useHistory()

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        getAnnouncementByCategoryAndId()
    }, [])

    return (
        <div className={"announcementPage fullHeightContent"}>
            <Header/>
            <Button className={"arrowBack"} onClickHandler={goBack} label={"Назад"}/>
            <div className="announcementPage__container container-lg pt-5 pb-5">
                <h2 className="announcementPage__name text-left m-0">{name}</h2>
                <hr className="my-4"/>
            <div className="announcementPage__photoAndInfo-wrapper mb-5">
                <div className="announcementPage__photo-slider float-left">
                    <Slider>
                        {photos.map( (photo:string) => <Image photo={photo}/> ) }
                    </Slider>
                </div>

                <div className="announcementPage__info-wrapper ml-5 col-lg-5 p-0">
                    <h3 className="announcementPage__info-price bg-warning p-2 m-0 text-left">{`Цена: ${price} руб.`}</h3>
                    <hr className="my-4"/>
                    <h5 className="announcementPage__info-location text-left alert alert-warning">{`Метро: ${subwayStation}`}</h5>
                    <hr className="my-4"/>
                    <div className="announcementPage__info-inner-wrapper alert alert-success">
                        <h5 className="announcementPage__info-name text-left">Продавец: {user}</h5>
                        <h5 className="announcementPage__info-name text-left">Телефон: {phone}</h5>
                    </div>
                    <hr className="my-4"/>
                    <h5 className="announcementPage__creationDate alert alert-dark">Дата создания объявления: {creationDate}</h5>
                </div>
            </div>
                <div className="announcementPage__description alert alert-primary">
                    <h5 className={"text-left"}>Описание:</h5>
                    <p>{description}</p>
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default AnnouncementPage;
