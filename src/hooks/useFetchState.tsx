import React, {useCallback} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getIsEmptyResponseSelector,
    getIsErrorFetchSelector,
    getIsFetchingSelector
} from "../redux/reducers/fetchingState/fetchingStateSelectors";
import {GET_PATH_SEARCH, PATH_CREATE_ANNOUNCEMENT, PATH_FEED, PATH_MY_ANNOUNCEMENTS, PATH_SETTINGS} from "../app/App";
import {setIsErrorFetchAC} from "../redux/reducers/fetchingState/fetchingStateActionCreators";

const useFetchState = () => {

    //------USE-HISTORY-----//
    const {location: {pathname}} = useHistory()

    const getPageName = () => {
        switch (pathname) {
            case PATH_FEED : return PATH_FEED.substr(1)
            case PATH_MY_ANNOUNCEMENTS : return PATH_MY_ANNOUNCEMENTS.substr(1)
            case PATH_CREATE_ANNOUNCEMENT : return PATH_CREATE_ANNOUNCEMENT.substr(1)
            case GET_PATH_SEARCH(pathname.substr(8)) : return "announcementsList"
            case `${GET_PATH_SEARCH(pathname.substr(8))}/${pathname.split("/")[3]}` : return "announcement"
            case PATH_SETTINGS : return "settings"
            default : return "createAnnouncement"
        }
    }

    //------MAP-STATE-TO-PROPS-----//
    const isFetching = useSelector((state) => getIsFetchingSelector( state, getPageName() ))
    const isEmptyResponse = useSelector( (state) => getIsEmptyResponseSelector( state, getPageName() ))
    const isErrorFetching = useSelector( (state) => getIsErrorFetchSelector( state, getPageName() ))

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const setIsErrorFetch = useCallback((value) => dispatch(setIsErrorFetchAC(getPageName(), value)), [dispatch])

    return {isFetching, isEmptyResponse, isErrorFetching, setIsErrorFetch}
}

export default useFetchState;
