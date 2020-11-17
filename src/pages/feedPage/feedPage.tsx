import React, {useCallback, useEffect} from 'react';
import "./feedPageStyles.css"
import Header from "../../components/header/header";
import SearchBox from "../../components/searchBox/searchBox";
import {useDispatch, useSelector} from "react-redux";
import {getLastAnnouncementsThunk} from "../../redux/thunks/thunks";
import {
    getDescriptionSalamRuSelector,
    getLastAnnouncementsSelector
} from "../../redux/reducers/feedState/feedStateSelectors";
import Announcement from "../../components/announcement/announcement";
import Footer from "../../components/footer/footer";
import ButtonUp from "../../components/buttonUp/buttonUp";
import Button from "../../components/button/button";
import WithBadFetchingCasesWrapper from "../../components/withBadFetchingCasesWrapper/withBadFetchingCasesWrapper";
import CategoryNavigation from "../../components/categoryNavigation/categoryNavigation";
import CategoryNavigationButton from "../../components/categoryNavButton/categoryNavigationButton";
import {initialStateCategory} from "../../redux/reducers/mainState/mainState";


const FeedPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const lastAnnouncements = useSelector(getLastAnnouncementsSelector)
    const descriptionSalamRu = useSelector(getDescriptionSalamRuSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getLastAnnouncements = useCallback((page, withConcat = false) => dispatch(getLastAnnouncementsThunk(page, withConcat)), [dispatch])

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        window.scrollTo(0,0)
        getLastAnnouncements(0)
        getLastAnnouncements(1, true)
    }, [])

    return (
        <div className={"feedPage"}>
            <Header/>
            {/*<div style={{height:"81px", width: "100%"}} className="ads-banner"></div>*/}
            <SearchBox className={"mt-4"} placeHolder={"Поиск по объявлениям"}/>
            <div className="container-fluid d-lg-flex">
                <CategoryNavigation />
                <div className="col-lg-8">

                    <div className="mb-5">
                        <h2 className="jumbotron p-2 pl-0">Последние объявления</h2>
                        <WithBadFetchingCasesWrapper>
                            {lastAnnouncements.map((lastAnnouncement: any) =>
                                <Announcement className={"horizontalCard"} {...lastAnnouncement}/>)}
                        </WithBadFetchingCasesWrapper>
                        <CategoryNavigationButton category={"all"} configCategory={initialStateCategory}>
                            <Button className={"btn-success col-md-12 mt-4"} label={"Посмотерть все объявления"}/>
                        </CategoryNavigationButton>
                    </div>
                    <hr className="my-4"/>
                    <div className="jumbotron p-4 ">
                        <h1 className="display-5">О проекте</h1>
                        <hr className="my-4"/>
                        <p className="lead">{descriptionSalamRu}</p>
                    </div>

                </div>
                <ButtonUp/>
            </div>
            <Footer/>
        </div>
    );
}

export default FeedPage;
