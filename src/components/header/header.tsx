import React, {useCallback, useRef, useState} from 'react';
import "./headerStyles.css"
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo/logo";
import AuthorizationModalWindow from "../modalWindow/authorizationModalWindow/authorizationModalWindow";
import {PATH_CREATE_ANNOUNCEMENT, PATH_HOUSING, PATH_JOB, PATH_MY_ANNOUNCEMENTS, PATH_SETTINGS} from "../../app/App";
import {useDispatch, useSelector} from "react-redux";
import {
    getIsAuthSelector,
} from "../../redux/reducers/authorizationState/authorizationStateSelectors";
import AlertModalWindow from "../modalWindow/alertModalWindow/alertModalWindow";
import Button from "../button/button";
import {postLogoutOrDeleteUser, postSettingByFieldThunk} from "../../redux/thunks/thunks";
import useOutsideClick from "../../hooks/useOutsideClick";
import {getSettingsFieldValueByFieldSelector} from "../../redux/reducers/settingsState/settingsStateSelectors";

const Header = (props: any) => {

    //------USE-REF-----//
    const ref = useRef(null)

    //------MAP-STATE-TO-PROPS-----//
    const isAuth = useSelector(getIsAuthSelector)
    const name = useSelector((state) => getSettingsFieldValueByFieldSelector(state, "name"))

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

    const linkConfigs = [
        {path: PATH_HOUSING, label: "Недвижимость"},
        {path: PATH_JOB, label: "Работа"}
    ]

    const alertCreateAnnouncement = useCallback(() =>
        <AlertModalWindow openBtnElement={<Button className={"header__btn-link"} label={"Разместить объявление"}/>}
                          btnOneConfiguration={{btnOneLabel: "Позже", btnOneHandler:() => setIsActiveAuthModal(false) }}
                          btnTwoConfiguration={{btnTwoLabel: "Авторизироваться", btnTwoHandler:() => setIsActiveAuthModal(true) }}
                          alertText={"Для размещения объявления, необходимо авторизироваться!"}/>, [])

    const alertLogout = useCallback(() =>
        <AlertModalWindow isActiveFromProps={true} alertText={"Выйти из аккаунта?"}
                          btnOneConfiguration={{btnOneLabel: "Нет", btnOneHandler:() => setIsActiveLogoutAlert(false)}}
                          btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler:logoutUser }}/>, [])


    const linkToCreateAnnouncement = <>
        <Link className="header__btn-link btn" to={PATH_CREATE_ANNOUNCEMENT}>
            Разместить объявление
        </Link>
    </>

    const authMenu = <>
        <div ref={ref} onClick={toggleIsActiveAuthMenu} className="header__authMenu">
            <h3 className="header__authMenu-name">{name}</h3>
            <div className={`header__authMenu-menu ${isActiveAuthMenu && "header__authMenu-menu-active"}`}>
                <Link to={PATH_MY_ANNOUNCEMENTS} className="header__authMenu-menu-item">
                    Мои объявления
                </Link>
                <Link to={PATH_SETTINGS} className="header__authMenu-menu-item">
                    Настройки
                </Link>
                <div onClick={() => setIsActiveLogoutAlert(true)} className="header__authMenu-menu-item">Выход</div>
            </div>
        </div>
    </>

    return (
        <div className="header">
            <div className="header__inner-wrapper">
                <Logo/>
                <div className="header__navigation-wrapper">
                    {linkConfigs.map(({path, label}) =>
                        <NavLink className="header__navigation-link" to={path}>
                            {label}
                        </NavLink>)}
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
