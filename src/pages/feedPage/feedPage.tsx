import React, {useCallback, useEffect} from 'react';
import "./feedPageStyles.css"
import Header from "../../components/header/header";
import SearchBox from "../../components/searchBox/searchBox";
import {useDispatch, useSelector} from "react-redux";
import {getLastAnnouncementsThunk} from "../../redux/thunks/thunks";
import {
    getDescriptionSalamRuSelector,
    getIsFetchingFeedReducerSelector,
    getLastAnnouncementsSelector
} from "../../redux/reducers/feedState/feedStateSelectors";
import Announcement from "../../components/announcement/announcement";
import Footer from "../../components/footer/footer";


const FeedPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const {lastAnnouncements, isFetching, descriptionSalamRu} = useSelector((state) => ({
        lastAnnouncements: getLastAnnouncementsSelector(state),
        isFetching: getIsFetchingFeedReducerSelector(state),
        descriptionSalamRu: getDescriptionSalamRuSelector(state)
    }))

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getLastAnnouncements = useCallback(() => dispatch(getLastAnnouncementsThunk()), [dispatch])

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        getLastAnnouncements()
    }, [])

    return (
        <div className={"feedPage"}>
            <Header/>
            <div className="feedPage__container container-lg">
                <div className="feedPage__searchBox">
                    <SearchBox placeHolder={"Поиск по объявлениям"}/>
                </div>
                {/*<div className="feedPage__category-cards">*/}
                {/*    */}
                {/*</div>*/}
                <div className="feedPage__lastAnnouncements mb-5">
                        <h2 className="display-5 jumbotron p-2">Последние объявления</h2>
                    {/*<h2 className="feedPage__lastAnnouncements-title">Последние объявления</h2>*/}
                    <div className="row justify-content-center">
                        {lastAnnouncements.map((lastAnnouncement: any) => <Announcement {...lastAnnouncement}/>)}
                    </div>
                </div>
                <div className="jumbotron p-4">
                    <h1 className="display-5">О проекте</h1>
                    <hr className="my-4"/>
                        <p className="lead">Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit.
                            Impedit minima perferendis tenetur?
                            Delectus dolores eaque est, explicabo laboriosam minus quia ut vel veniam.
                            Dignissimos fuga, quas quasi quisquam saepe sint.
                        </p>
                </div>
                {/*<div className="feedPage__descriptionSalamRu">*/}
                {/*    <h2 className="feedPage__descriptionSalamRu-title">О проекте</h2>*/}
                {/*    <p className="feedPage__descriptionSalamRu-description">*/}
                {/*        Lorem ipsum dolor sit amet,*/}
                {/*        consectetur adipisicing elit.*/}
                {/*        Impedit minima perferendis tenetur?*/}
                {/*        Delectus dolores eaque est, explicabo laboriosam minus quia ut vel veniam.*/}
                {/*        Dignissimos fuga, quas quasi quisquam saepe sint.*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
            <Footer/>
        </div>
    );
}

export default FeedPage;
