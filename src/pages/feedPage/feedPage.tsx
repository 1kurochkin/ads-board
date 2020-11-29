import React, {useCallback, useEffect} from 'react';
import "./feedPageStyles.css"
import SearchBox from "../../components/searchBox/searchBox";
import {useDispatch, useSelector} from "react-redux";
import {getLastAnnouncementsThunk} from "../../redux/thunks/thunks";
import {getLastAnnouncementsSelector} from "../../redux/reducers/feedState/feedStateSelectors";
import Announcement from "../../components/announcement/announcement";
import ButtonUp from "../../components/buttonUp/buttonUp";
import Button from "../../components/button/button";
import WithBadFetchingCasesWrapper from "../../components/withBadFetchingCasesWrapper/withBadFetchingCasesWrapper";
import CategoryNavigation from "../../components/categoryNavigation/categoryNavigation";
import CategoryNavigationButton from "../../components/categoryNavButton/categoryNavigationButton";
import {initialStateCategory} from "../../redux/reducers/mainState/mainState";
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";


const FeedPage = (props: any) => {

    useSetMetaTitleAndDescription(
        "Salam.ru — объявления в Москве — Объявления на сайте Salam.ru",
        "Salam.ru – доска объявлений, на которой, есть возможность разместить объявления, либо найти себе жильё или работу."
    )

    //------MAP-STATE-TO-PROPS-----//
    const lastAnnouncements = useSelector(getLastAnnouncementsSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getLastAnnouncements = useCallback(() => dispatch(getLastAnnouncementsThunk()), [dispatch])

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        getLastAnnouncements()
        // getLastAnnouncements(1, true)
    }, [])

    return (
        <>
            <SearchBox className={"mt-4"} placeHolder={"Поиск по объявлениям"}/>
            <div className="container-fluid d-lg-flex">
                <CategoryNavigation/>
                <div className="col-lg-8">

                    <div className="mb-5">
                        <h2 className="jumbotron p-2 pl-0">Последние объявления</h2>
                        <WithBadFetchingCasesWrapper>
                            {lastAnnouncements.map((lastAnnouncement: any) =>
                                <Announcement className={"horizontalCard"} {...lastAnnouncement}/>)}
                        </WithBadFetchingCasesWrapper>
                        <CategoryNavigationButton category={"all"} configCategory={initialStateCategory}>
                            <Button svgIconName={"arrowRight"} className={"btn-success col-md-12 mt-4"} label={"Посмотерть все объявления"}/>
                        </CategoryNavigationButton>
                    </div>
                    <hr className="my-4"/>
                    <div className="jumbotron p-4 ">
                        <h1 className="display-5">О проекте</h1>
                        <hr className="my-4"/>
                        <p className="lead">
                            Salam.ru – веб-приложение, выполняющее функцию доски объявлений, на которой, есть
                            возможность разместить объявления, либо найти себе жильё или работу.<br/>
                            Этот проект создан для помощи братским народам, проживающим на территории города Москвы/МО,
                            в поиске жилья и работы.
                        </p>
                    </div>
                </div>
                <ButtonUp/>
            </div>
        </>
    );
}

export default FeedPage;
