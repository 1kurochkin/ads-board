import React, {useCallback, useEffect} from 'react';
import "./myAnnouncementsPageStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../../components/footer/footer";
import {
    getIsFetchingMyAnnouncementsReducerSelector,
    getMyAnnouncementsSelector,
    getCurrentPageMyAnnouncementsReducerSelector,
    getTotalNumOfPagesMyAnnouncementsReducerSelector
} from '../../redux/reducers/myAnnouncementState/myAnnouncementStateSelectors';
import {getMyAnnouncementsThunk, postDeleteAnnouncementThunk} from "../../redux/thunks/thunks";
import Announcement from "../../components/announcement/announcement";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {setCurrentPageMyAnnouncementReducerAC} from "../../redux/reducers/myAnnouncementState/myAnnouncementStateActionCreators";
import Button from "../../components/button/button";
import withAuthRedirectHoc from "../../hocs/withAuthRedirectHoc";

const MyAnnouncementsPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const myAnnouncements = useSelector(getMyAnnouncementsSelector)
    const isFetching = useSelector(getIsFetchingMyAnnouncementsReducerSelector)
    const currentPage = useSelector(getCurrentPageMyAnnouncementsReducerSelector)
    const totalNumOfPages = useSelector(getTotalNumOfPagesMyAnnouncementsReducerSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getMyAnnouncements = useCallback((withConcat = false) => dispatch(getMyAnnouncementsThunk(withConcat)), [dispatch])
    const setCurrentPage = useCallback(() => dispatch(setCurrentPageMyAnnouncementReducerAC()), [dispatch])
    const postDeleteAnnouncement = useCallback((id) => dispatch(postDeleteAnnouncementThunk(id)), [dispatch])

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        getMyAnnouncements()
    }, [])

    //------INFINITY-SCROLL------//
    const infinityScrollHandler = (event: any) => {
        if(currentPage !== totalNumOfPages) {
            setCurrentPage()
            getMyAnnouncements(true)
        }
    }
    useInfinityScroll(infinityScrollHandler)


    const onClickBtnUpHandler = () => window.scrollTo(0, 0)

    return (
        <div className={"myAnnouncements fullHeightContent"}>
            <Header/>
            <div className="myAnnouncements__container container-lg pt-5 pb-5">
                <h2 className="display-5 jumbotron p-2">Мои объявления</h2>
                {myAnnouncements.map( ({id, ...restMyAnnouncement}: any) =>
                    <div key={id} className="d-flex mb-3">
                        <Announcement className={"horizontalCard"} id={id} {...restMyAnnouncement}/>
                        <Button className={"btn-danger align-self-stretch mb-3 align-items-center d-flex font-weight-bold"} isDisabled={isFetching} onClickHandler={() => postDeleteAnnouncement(id)}
                                label={"Удалить объявление"}/>
                    </div>) }
                {myAnnouncements.length > 5 && <Button className={"myAnnouncements__btn-up"} onClickHandler={onClickBtnUpHandler} label={"Наверх"}/>}
            </div>
            <Footer/>
        </div>
    );
}

export default withAuthRedirectHoc(MyAnnouncementsPage);
