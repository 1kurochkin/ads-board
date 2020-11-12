import React, {useCallback, useRef, useState} from 'react';
import "./headerStyles.css"
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo/logo";
import AuthorizationModalWindow from "../modalWindow/authorizationModalWindow/authorizationModalWindow";
import {PATH_CREATE_ANNOUNCEMENT, PATH_MY_ANNOUNCEMENTS, PATH_SETTINGS} from "../../app/App";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthSelector,} from "../../redux/reducers/authorizationState/authorizationStateSelectors";
import AlertModalWindow from "../modalWindow/alertModalWindow/alertModalWindow";
import Button from "../button/button";
import {postLogoutOrDeleteUser} from "../../redux/thunks/thunks";
import useOutsideClick from "../../hooks/useOutsideClick";
import {getSettingsFieldValueByFieldSelector} from "../../redux/reducers/settingsState/settingsStateSelectors";
import {getCategoriesDataSelector} from "../../redux/reducers/mainState/mainStateSelectors";
import NavCategoryButton from "../navCategoryButton/navCategoryButton";

const Header = (props: any) => {

    //------USE-REF-----//
    const ref = useRef(null)

    //------MAP-STATE-TO-PROPS-----//
    const isAuth = useSelector(getIsAuthSelector)
    const name = useSelector((state) => getSettingsFieldValueByFieldSelector(state, "name"))
    const categoriesData = useSelector(getCategoriesDataSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const logoutUser = useCallback(() => dispatch(postLogoutOrDeleteUser("logout")), [dispatch])

    //------LOCAL-STATE-----//
    const [isActiveAuthModal, setIsActiveAuthModal] = useState(false)
    const [isActiveAuthMenu, setIsActiveAuthMenu] = useState(false)
    const [isActiveLogoutAlert, setIsActiveLogoutAlert] = useState(false)

    const outsideClickHandler = () => {
        isActiveAuthMenu && toggleIsActiveAuthMenu()
    }

    useOutsideClick(ref, outsideClickHandler)

    const toggleIsActiveAuthMenu = () => {
        console.log("toggleIsActiveAuthMenu")
        setIsActiveAuthMenu(prevState => !prevState)
    }

    // const linkConfigs = [
    //     {path: PATH_HOUSING, label: "Недвижимость"},
    //     {path: PATH_JOB, label: "Работа"}
    // ]

    const alertCreateAnnouncement = useCallback(() =>
        <AlertModalWindow openBtnElement={<Button className={"header__btn-link btn-outline-light"} label={"Разместить объявление"}/>}
                          btnOneConfiguration={{btnOneLabel: "Позже", btnOneHandler:() => setIsActiveAuthModal(false) }}
                          btnTwoConfiguration={{btnTwoLabel: "Авторизироваться", btnTwoHandler:() => setIsActiveAuthModal(true) }}
                          alertText={"Для размещения объявления, необходимо авторизироваться!"}/>, [])

    const alertLogout = useCallback(() =>
        <AlertModalWindow isActiveFromProps={true} alertText={"Выйти из аккаунта?"}
                          btnOneConfiguration={{btnOneLabel: "Нет", btnOneHandler:() => setIsActiveLogoutAlert(false)}}
                          btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler:logoutUser }}/>, [])


    const linkToCreateAnnouncement = <>
        <NavLink activeClassName={"active"} className="header__btn-link btn btn-outline-light" to={PATH_CREATE_ANNOUNCEMENT}>
            Разместить объявление
        </NavLink>
    </>

    const authMenu = <>
        <div ref={ref} onClick={toggleIsActiveAuthMenu} className="dropdown">
            <Button className={"btn-warning dropdown-toggle"} label={name}/>
            <div className={`dropdown-menu ${isActiveAuthMenu && "show"}`}>
                <Link to={PATH_MY_ANNOUNCEMENTS} className="dropdown-item">
                    Мои объявления
                </Link>
                <Link to={PATH_SETTINGS} className="dropdown-item">
                    Настройки
                </Link>
                <div className="dropdown-divider"/>
                <div onClick={() => setIsActiveLogoutAlert(true)} className="dropdown-item">Выход</div>
            </div>
        </div>
    </>

    return (
        <div className="navbar navbar-dark bg-info pl-5 pr-5">
            <div className="d-flex">
                <Logo/>
                <div className="header__navigation-wrapper navbar-nav flex-row ml-5">
                    {categoriesData.map((categoryData: any, index:number) => {
                        const {category, label, id} = categoryData
                        return index !== 0 &&
                            <NavCategoryButton className={"nav-link ml-3"} key={id} category={category} configCategory={categoryData}>
                            {label}
                        </NavCategoryButton> })}
                </div>
            </div>
            <div className="header__inner-wrapper">
                {isAuth ? authMenu : <AuthorizationModalWindow alertCloseHandler={() => setIsActiveAuthModal(false)} isActiveFromProps={isActiveAuthModal}/>}
                {isAuth ? linkToCreateAnnouncement : alertCreateAnnouncement()}
            </div>
            {isActiveLogoutAlert && alertLogout()}
        </div>
    );
}

export default Header;
