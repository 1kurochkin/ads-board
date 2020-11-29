import React, {useCallback, useEffect} from 'react';
import "./myAnnouncementsPageStyles.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageMyAnnouncementsReducerSelector,
    getMyAnnouncementsSelector,
    getTotalNumOfPagesMyAnnouncementsReducerSelector
} from '../../redux/reducers/myAnnouncementState/myAnnouncementStateSelectors';
import {getMyAnnouncementsThunk, postDeleteAnnouncementThunk} from "../../redux/thunks/thunks";
import Announcement from "../../components/announcement/announcement";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {
    resetToInitialStateMyAnnouncementReducerAC,
    setCurrentPageMyAnnouncementReducerAC
} from "../../redux/reducers/myAnnouncementState/myAnnouncementStateActionCreators";
import Button from "../../components/button/button";
import withAuthRedirectHoc from "../../hocs/withAuthRedirectHoc";
import ButtonUp from "../../components/buttonUp/buttonUp";
import WithBadFetchingCasesWrapper from "../../components/withBadFetchingCasesWrapper/withBadFetchingCasesWrapper";
import AlertModalWindow from "../../components/modalWindow/alertModalWindow/alertModalWindow";
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";
import {getIsFetchingSelector} from '../../redux/reducers/fetchingState/fetchingStateSelectors';
import ErrorFetchModalWindow from "../../components/modalWindow/errorFetchModalWindow/errorFetchModalWindow";

const MyAnnouncementsPage = (props: any) => {

    useSetMetaTitleAndDescription(
        "Мои объявления",
        "Посмотреть созданные мною объявления на Salam.ru"
    )

    //------MAP-STATE-TO-PROPS-----//
    const myAnnouncements = useSelector(getMyAnnouncementsSelector)
    const isFetching = useSelector( (state) => getIsFetchingSelector(state, "myAnnouncements") )
    const currentPage = useSelector(getCurrentPageMyAnnouncementsReducerSelector)
    const totalNumOfPages = useSelector(getTotalNumOfPagesMyAnnouncementsReducerSelector)


    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getMyAnnouncements = useCallback(() => dispatch(getMyAnnouncementsThunk()), [dispatch])
    const setCurrentPage = useCallback(() => dispatch(setCurrentPageMyAnnouncementReducerAC()), [dispatch])
    const postDeleteAnnouncement = useCallback((id) => dispatch(postDeleteAnnouncementThunk(id)), [dispatch])
    const resetToInitialState = useCallback(() => dispatch(resetToInitialStateMyAnnouncementReducerAC()), [dispatch])

    //----COMPONENT-DID-MOUNT-LIFECYCLE----//
    useEffect(() => {
        getMyAnnouncements()
        return () => {
            resetToInitialState()
        }
    }, [])

    //------INFINITY-SCROLL------//
    const infinityScrollHandler = (event: any) => {
        if (currentPage !== totalNumOfPages && !isFetching) {
            setCurrentPage()
            getMyAnnouncements()
        }
    }
    useInfinityScroll(infinityScrollHandler)

    return (
        <div className="myAnnouncements__container container-lg pt-5 pb-5">
            <h1 className="display-5 jumbotron p-2">Мои объявления</h1>
            <WithBadFetchingCasesWrapper isEmptyResponse={!myAnnouncements.length}>
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
