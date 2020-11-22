import React, {useCallback, useEffect} from 'react';
import "./myAnnouncementsPageStyles.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageMyAnnouncementsReducerSelector,
    getIsFetchingMyAnnouncementsReducerSelector,
    getMyAnnouncementsSelector,
    getTotalNumOfPagesMyAnnouncementsReducerSelector
} from '../../redux/reducers/myAnnouncementState/myAnnouncementStateSelectors';
import {getMyAnnouncementsThunk, postDeleteAnnouncementThunk} from "../../redux/thunks/thunks";
import Announcement from "../../components/announcement/announcement";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {setCurrentPageMyAnnouncementReducerAC} from "../../redux/reducers/myAnnouncementState/myAnnouncementStateActionCreators";
import Button from "../../components/button/button";
import withAuthRedirectHoc from "../../hocs/withAuthRedirectHoc";
import ButtonUp from "../../components/buttonUp/buttonUp";
import WithBadFetchingCasesWrapper from "../../components/withBadFetchingCasesWrapper/withBadFetchingCasesWrapper";
import AlertModalWindow from "../../components/modalWindow/alertModalWindow/alertModalWindow";
import {
    getIsEmptyResponseMainStateSelector,
    getIsErrorFetchMainStateSelector
} from "../../redux/reducers/mainState/mainStateSelectors";

const MyAnnouncementsPage = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const myAnnouncements = useSelector(getMyAnnouncementsSelector)
    const isFetching = useSelector(getIsFetchingMyAnnouncementsReducerSelector)
    const currentPage = useSelector(getCurrentPageMyAnnouncementsReducerSelector)
    const totalNumOfPages = useSelector(getTotalNumOfPagesMyAnnouncementsReducerSelector)

    const isErrorFetchMainState = useSelector(getIsErrorFetchMainStateSelector)
    const isEmptyResponseMainState = useSelector(getIsEmptyResponseMainStateSelector)

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
        if (currentPage !== totalNumOfPages) {
            !isErrorFetchMainState && !isEmptyResponseMainState && setCurrentPage()
            !isEmptyResponseMainState && getMyAnnouncements(true)
        }
    }
    useInfinityScroll(infinityScrollHandler)

    return (
        <div className="myAnnouncements__container container-lg pt-5 pb-5">
            <h2 className="display-5 jumbotron p-2">Мои объявления</h2>
            <WithBadFetchingCasesWrapper>
                {myAnnouncements.map(({id, ...restMyAnnouncement}: any) =>
                    <div key={id} className="d-flex mb-3">
                        <Announcement className={"horizontalCard"} id={id} {...restMyAnnouncement}/>
                        <AlertModalWindow openBtnElement={<Button
                            className={"btn-danger align-self-stretch mb-3 align-items-center d-flex"}
                            isDisabled={isFetching} label={"Удалить объявление"}/>}
                                          btnOneConfiguration={{btnOneLabel: "Нет"}}
                                          btnTwoConfiguration={{
                                              btnTwoLabel: "Да",
                                              btnTwoHandler: () => postDeleteAnnouncement(id)
                                          }}
                                          alertText={"Удалить объявление?"}/>
                    </div>)}
            </WithBadFetchingCasesWrapper>
            {currentPage !== totalNumOfPages &&
            <Button className={"btn-success w-100 my-4 mobile"} onClickHandler={infinityScrollHandler}
                    label={"Загрузить еще объявления"}/>}
            <ButtonUp/>
        </div>
    );
}

export default withAuthRedirectHoc(MyAnnouncementsPage);
