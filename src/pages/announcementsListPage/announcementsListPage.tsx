import React, {useCallback, useEffect, useState} from 'react';
import "./announcementsListPageStyles.css"
import Header from "../../components/header/header";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../../components/footer/footer";
import {getAnnouncementsByFiltersThunk, getAnnouncementsListThunk} from "../../redux/thunks/thunks";
import Announcement from "../../components/announcement/announcement";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {
    getAnnouncementsListSelector,
    getCurrentPageAnnouncementsListReducerSelector,
    getTotalNumOfPagesAnnouncementsListReducerSelector
} from "../../redux/reducers/announcementsListState/announcementsListStateSelectors";
import {
    getCategoriesDataSelector,
    getIsFetchingMainStateSelector
} from "../../redux/reducers/mainState/mainStateSelectors";
import {
    resetToInitialStateAnnouncementsListReducerAC,
    setCurrentPageAnnouncementsListReducerAC
} from "../../redux/reducers/announcementsListState/announcementsListStateActionCreators";
import {NavLink, useHistory} from 'react-router-dom';
import {
    getCurrentPageSearchReducerSelector,
    getIsFetchingSearchReducerSelector, getSearchConfigCategorySelector, getSearchConfigSubwayStationsSelector,
    getSearchedDataSelector,
    getTotalNumOfPageSearchReducerSelector
} from "../../redux/reducers/searchBoxState/searchBoxStateSelectors";
import SearchBox from "../../components/searchBox/searchBox";
import {
    resetToInitialStateSearchReducerAC,
    setCurrentPageSearchReducerAC
} from '../../redux/reducers/searchBoxState/searchBoxStateActionCreators';
import Preloader from "../../components/preloader/preloader";
import ButtonUp from "../../components/buttonUp/buttonUp";
import {GET_PATH_SEARCH} from "../../app/App";
import NavCategoryButton from "../../components/navCategoryButton/navCategoryButton";


const AnnouncementsListPage = (props: any) => {

    //------USE-HISTORY-----//
    const {location : {pathname}} = useHistory()
    const category = pathname.substr(1)

    //------MAP-STATE-TO-PROPS-----//
    const categoriesData = useSelector( (state) => getCategoriesDataSelector(state))
        //---SEARCHED-BOX-STATE---//
    const {label:currentCategory} = useSelector(getSearchConfigCategorySelector)
    const {label:currentSubway}: any = useSelector(getSearchConfigSubwayStationsSelector)

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

    //---LOCAL-STATE---//
    const [state, setState] = useState(() => ( {currentCategory, currentSubway} ) )

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
        setState({currentCategory, currentSubway})
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
            <SearchBox className={"mt-4"} placeHolder={"Поиск по объявлениям"}/>
            <hr className={"my-4"}/>
            <div className="row d-flex justify-content-center col-lg-12">
                <h5 className={"alert alert-success"}>
                    <span className={"font-weight-bold"}>Поиск по : </span>
                    {state.currentSubway}> {state.currentCategory}
                </h5>
            </div>
            <hr className={"my-4"}/>
            <div className="announcementsList__slider-container d-flex container-fluid pt-2 pb-5">
                <div className="slider-container__slider col-lg-2 p-0 ">
                    {categoriesData.map( (categoryData: any) => {
                        const {id, label, category, subCategories = []} = categoryData
                        return <>
                            <NavCategoryButton key={id} category={category} activeClassName={"text-warning"} configCategory={categoryData}>
                            <h5>{label}</h5>
                        </NavCategoryButton>
                            {subCategories.map( (subCategoryData: any) => {
                                const {id, label, category} = subCategoryData
                                return <NavCategoryButton key={id} activeClassName={"text-warning"} category={category} configCategory={categoryData}>
                                    <h6>- {label}</h6>
                                </NavCategoryButton> } )}
                        </> } ) }
                    <hr className={"my-0 mt-4"}/>
                </div>
                <div className="slider-container__content col-lg-8">
                    {getDataState().map( ({id, ...restMyAnnouncement}: any) =>
                        <div key={id} className="announcementsList__item">
                            <Announcement className={"horizontalCard"} id={id} {...restMyAnnouncement}/>
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
