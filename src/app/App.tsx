import React from 'react';
import "./appStyles.css"
import { Switch, Route, Redirect } from 'react-router-dom';
import FeedPage from "../pages/feedPage/feedPage";
import ContactsPage from "../pages/contactsPage/contactsPage";
import SettingsPage from "../pages/settingsPage/settingsPage";
import AnnouncementPage from '../pages/announcementPage/announcementPage';
import MyAnnouncementsPage from "../pages/myAnnouncementsPage/myAnnouncementsPage";

const App = () => {

  return (
    <div className="App">
        <Switch>
            <Route exact path="/feed" component={FeedPage}/>
            <Route exact path="/myAnnouncements" component={MyAnnouncementsPage}/>
            <Route exact path="/settings" component={SettingsPage}/>
            <Route exact path="/contacts" component={ContactsPage}/>
            <Route exact path="/housing" component={FeedPage}/>
            <Route exact path="/job" component={FeedPage}/>
            <Route exact path="/:category" component={FeedPage}/>
            <Route exact path="/:category/:id" component={AnnouncementPage}/>
            <Route exact path="/createAnnouncement" component={ContactsPage}/>
            <Redirect to="/feed"/>
        </Switch>
    </div>
  );
}

export default App;
