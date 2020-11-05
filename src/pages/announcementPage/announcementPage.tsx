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
            <div className="announcementPage__container container">
                <div className="announcementPage__arrowBack-wrapper">
                    <Button onClickHandler={goBack} label={"Назад"}/>
                    <div className="announcementPage__creationDate">{creationDate}</div>
                </div>
            <div className="announcementPage__photoAndInfo-wrapper">
                <div className="announcementPage__photo-slider">
                    <Slider>
                        {photos.map( (photo:string) => <Image photo={photo}/> ) }
                    </Slider>
                </div>

                <div className="announcementPage__info-wrapper">
                    <h1 className="announcementPage__name">{name}</h1>
                    <div className="announcementPage__info-inner-wrapper">
                        <div className="announcementPage__info-price">{price}</div>
                        <div className="announcementPage__info-location">{subwayStation}</div>
                    </div>

                    <div className="announcementPage__info-inner-wrapper">
                        <h3 className="announcementPage__info-name">{user}</h3>
                        <div className="announcementPage__info-phone">{phone}</div>
                    </div>

                </div>

            </div>

                <div className="announcementPage__description">
                    {description}
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default AnnouncementPage;
