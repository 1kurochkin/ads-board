import React, {useCallback, useEffect, useState} from 'react';
import "./announcementsListPageStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../../components/footer/footer";
import {getAnnouncementsByFiltersThunk, getAnnouncementsListThunk} from "../../redux/thunks/thunks";
import Announcement from "../../components/announcement/announcement";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import Button from "../../components/button/button";
import {
    getAnnouncementsListSelector,
    getCurrentPageAnnouncementsListReducerSelector,
    getTotalNumOfPagesAnnouncementsListReducerSelector
} from "../../redux/reducers/announcementsListState/announcementsListStateSelectors";
import {
    getCategoriesDataSelector,
    getIsFetchingMainStateSelector
} from "../../redux/reducers/mainState/mainStateSelectors";
import {setCurrentPageAnnouncementsListReducerAC, resetToInitialStateAnnouncementsListReducerAC} from "../../redux/reducers/announcementsListState/announcementsListStateActionCreators";
import {useHistory, NavLink} from 'react-router-dom';
import {
    getSearchedDataSelector,
    getIsFetchingSearchReducerSelector,
    getCurrentPageSearchReducerSelector,
    getTotalNumOfPageSearchReducerSelector
} from "../../redux/reducers/searchBoxState/searchBoxStateSelectors";
import SearchBox from "../../components/searchBox/searchBox";
import {
    resetToInitialStateSearchReducerAC,
    setCurrentPageSearchReducerAC
} from '../../redux/reducers/searchBoxState/searchBoxStateActionCreators';
import Preloader from "../../components/preloader/preloader";
import ButtonUp from "../../components/buttonUp/buttonUp";


const AnnouncementsListPage = (props: any) => {

    //------USE-HISTORY-----//
    const {location : {pathname}} = useHistory()
    const category = pathname.substr(1)

    //------MAP-STATE-TO-PROPS-----//
    const categoriesData = useSelector(getCategoriesDataSelector)
        //---SEARCHED-BOX-STATE---//
    const searchedData = useSelector(getSearchedDataSelector)
    const isFetchingSearchState = useSelector(getIsFetchingSearchReducerSelector)
    const currentPageSearch = useSelector(getCurrentPageSearchReducerSelector)
    const totalNumOfPageSearch = useSelector(getTotalNumOfPageSearchReducerSelector)
    const isEqualsCurrAndTotalPageSearch = currentPageSearch === totalNumOfPageSearch
        //----------------------//
    const isSearchState = searchedData.length || isFetchingSearchState
    //---ANNOUNCEMENTS-LIST-STATE---//
    const announcementsList = useSelector(getAnnouncementsListSelector)
    const isFetchingMainState = useSelector(getIsFetchingMainStateSelector)
    const currentPage = useSelector(getCurrentPageAnnouncementsListReducerSelector)
    const totalNumOfPages = useSelector(getTotalNumOfPagesAnnouncementsListReducerSelector)
    const isEqualsCurrAndTotalPage = currentPage === totalNumOfPages

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getAnnouncements = useCallback((category, withConcat = false) => dispatch(getAnnouncementsListThunk(category, withConcat)), [dispatch])
    const getAnnouncementsByFilters = useCallback(() => dispatch(getAnnouncementsByFiltersThunk(true)), [dispatch])
    const setCurrentPage = useCallback(() => dispatch(setCurrentPageAnnouncementsListReducerAC()), [dispatch])
    const setCurrentPageSearchBox = useCallback(() => dispatch(setCurrentPageSearchReducerAC()), [dispatch])
    const resetToInitialStateAnnouncementsList = useCallback(() => dispatch(resetToInitialStateAnnouncementsListReducerAC()), [dispatch])
    const resetToInitialStateSearchReducer = useCallback(() => dispatch(resetToInitialStateSearchReducerAC()), [dispatch])

    //---GET-ACTIONS---//
    const getDataAction: () => Function = () => isSearchState ? getAnnouncementsByFilters : getAnnouncements
    const getDataState: () => Array<any> = () => isSearchState ? searchedData : announcementsList
    const getSetCurrentPageAction: () => Function = () => isSearchState ? setCurrentPageSearchBox : setCurrentPage
    const getIsEqualsCurrAndTotalPage: () => boolean = () => isSearchState ? isEqualsCurrAndTotalPageSearch : isEqualsCurrAndTotalPage

    //----COMPONENT-DID-MOUNT/UNMOUNT-LIFECYCLE----//
    useEffect(() => {
        getAnnouncements(category)
        return () => {
            resetToInitialStateAnnouncementsList()
            resetToInitialStateSearchReducer()
        }
    }, [])

    //----COMPONENT-DID-UPDATE-LIFECYCLE----//
    useEffect(() => {
        resetToInitialStateAnnouncementsList()
        getAnnouncements(category)
    }, [category])

    //------INFINITY-SCROLL------//
    const infinityScrollHandler = () => (event: any) => {
        if(!getIsEqualsCurrAndTotalPage()) {
            getSetCurrentPageAction()()
            getDataAction()(category, true)
        }
    }
    useInfinityScroll(infinityScrollHandler())

    return (
        <div className={"announcementsList fullHeightContent"}>
            <Header/>
            <div className="announcementsList__slider-container slider-container">
                <div className="slider-container__slider">
                    {categoriesData.map( ({id, label, category}: any) => {
                        return <NavLink className={"slider__category-item"} activeClassName={"navLink__active"} to={`/${category}`}>
                            <h4>{label}</h4>
                        </NavLink>
                    } ) }
                </div>
                <div className="slider-container__content">
                    <SearchBox placeHolder={"Поиск по объявлениям"}/>
                    {getDataState().map( ({id, ...restMyAnnouncement}: any) =>
                        <div key={id} className="announcementsList__item">
                            <Announcement id={id} {...restMyAnnouncement}/>
                        </div>) }
                    <ButtonUp/>
                    {isFetchingSearchState || isFetchingMainState && <Preloader/>}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AnnouncementsListPage;
