import React, {useCallback} from 'react';
import Button from "../button/button";
import {GET_PATH_SEARCH} from "../../app/App";
import { NavLink } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setSearchConfigCategoryAC} from "../../redux/reducers/searchBoxState/searchBoxStateActionCreators";

type navCategoryButtonPropsType = {
    category: string
    activeClassName?: string
    configCategory: string
    children: any
    key?: any
    className?: string
}

const NavCategoryButton = (props: navCategoryButtonPropsType) => {

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const setSearchConfigCategory = useCallback((category) => dispatch(setSearchConfigCategoryAC(category)), [dispatch])

    const {activeClassName = "active", key, category, configCategory, className, children} = props

    return <NavLink className={className} key={key} onClick={() => setSearchConfigCategory(configCategory)} to={GET_PATH_SEARCH(category)} activeClassName={activeClassName}>
        {children}
    </NavLink>

}

export default NavCategoryButton;
