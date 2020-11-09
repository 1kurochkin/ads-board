import React, {useCallback, useEffect} from 'react';
import "./appStyles.css"
import { Switch, Route, Redirect } from 'react-router-dom';
import FeedPage from "../pages/feedPage/feedPage";
import ContactsPage from "../pages/contactsPage/contactsPage";
import SettingsPage from "../pages/settingsPage/settingsPage";
import AnnouncementPage from '../pages/announcementPage/announcementPage';
import MyAnnouncementsPage from "../pages/myAnnouncementsPage/myAnnouncementsPage";
import CreateAnnouncement from "../pages/createAnnouncement/createAnnouncement";

import {useDispatch, useSelector} from "react-redux";
import {getSubwayStationsThunk, getUserInfoThunk} from "../redux/thunks/thunks";
import AnnouncementsListPage from "../pages/announcementsListPage/announcementsListPage";
import {getCategoriesDataSelector} from "../redux/reducers/mainState/mainStateSelectors";

export const PATH_FEED = "/feed"
export const PATH_MY_ANNOUNCEMENTS = "/myAnnouncements"
export const PATH_CREATE_ANNOUNCEMENT = "/createAnnouncement"
export const PATH_SETTINGS = "/settings"
export const PATH_JOB = "/job"
export const PATH_HOUSING = "/housing"
export const PATH_CONTACTS = "/contacts"

const App = () => {

    //------MAP-STATE-TO-PROPS-----//
    const categoriesData = useSelector(getCategoriesDataSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getSubwayStations = useCallback(() => dispatch(getSubwayStationsThunk()), [dispatch])
    const getUserData = useCallback(() => dispatch(getUserInfoThunk()), [dispatch])

    useEffect(() => {
        getSubwayStations()
        getUserData()
    }, [])

    return (
    <div className="App">
        <Switch>
            <Route exact path={PATH_CREATE_ANNOUNCEMENT} component={CreateAnnouncement}/>
            <Route exact path={PATH_FEED} component={FeedPage}/>
            <Route exact path={PATH_MY_ANNOUNCEMENTS} component={MyAnnouncementsPage}/>
            <Route exact path={PATH_SETTINGS} component={SettingsPage}/>
            <Route exact path={PATH_CONTACTS} component={ContactsPage}/>
            {categoriesData.map( ({category}:any) => <Route exact path={`/${category}`} component={AnnouncementsListPage}/>)}
            {categoriesData.map( ({category}:any) =>  <Route exact path={`/${category}/:id`} component={AnnouncementPage}/>)}
            <Redirect to={PATH_FEED}/>
        </Switch>
    </div>
  );
}

export default App;
