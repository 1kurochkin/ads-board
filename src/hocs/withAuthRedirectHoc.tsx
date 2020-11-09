import React from 'react';
import {useSelector} from "react-redux";
import {getIsAuthSelector} from "../redux/reducers/authorizationState/authorizationStateSelectors";
import {Redirect} from 'react-router-dom';
import {PATH_FEED} from "../app/App";

const withAuthRedirectHoc = (Component: any) => {
    return (props: any) => {
        const isAuth = useSelector(getIsAuthSelector)
        return !isAuth ? <Redirect to={PATH_FEED}/> : <Component {...props}/>
    }
}

export default withAuthRedirectHoc;
