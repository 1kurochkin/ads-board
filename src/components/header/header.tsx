import React, {useCallback, useRef, useState} from 'react';
import "./headerStyles.css"
import {Link} from 'react-router-dom';
import Logo from "../logo/logo";
import AuthorizationModalWindow from "../modalWindow/authorizationModalWindow/authorizationModalWindow";
import {linkToCreateAnnouncement, PATH_MY_ANNOUNCEMENTS, PATH_SETTINGS} from "../../app/App";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthSelector,} from "../../redux/reducers/authorizationState/authorizationStateSelectors";
import AlertModalWindow from "../modalWindow/alertModalWindow/alertModalWindow";
import Button from "../button/button";
import {postLogoutOrDeleteUser} from "../../redux/thunks/thunks";
import useOutsideClick from "../../hooks/useOutsideClick";
import {getSettingsFieldValueByFieldSelector} from "../../redux/reducers/settingsState/settingsStateSelectors";
import NavBar from "../navBar/navBar";

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
    const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false)
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
        <AlertModalWindow openBtnElement={<Button className={"btn-outline-light my-sm-2"} label={"Разместить объявление"}/>}
                          btnOneConfiguration={{btnOneLabel: "Позже", btnOneHandler:() => setIsActiveAuthModal(false) }}
                          btnTwoConfiguration={{btnTwoLabel: "Авторизироваться", btnTwoHandler:() => setIsActiveAuthModal(true) }}
                          alertText={"Для размещения объявления, необходимо авторизироваться!"}/>, [])

    const alertLogout = useCallback(() =>
        <AlertModalWindow isActiveFromProps={true} alertText={"Выйти из аккаунта?"}
                          btnOneConfiguration={{btnOneLabel: "Нет", btnOneHandler:() => setIsActiveLogoutAlert(false)}}
                          btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler:logoutUser }}/>, [])

    const authMenu = <>
        <div ref={ref} onClick={toggleIsActiveAuthMenu} className="dropdown header__authMenu mr-md-4">
            <Button className={"btn-warning dropdown-toggle w-100"} label={name}/>
            <div className={`header__authMenu-menu dropdown-menu ${isActiveAuthMenu && "header__show"}`}>
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
        <div className="navbar justify-content-center navbar-dark d-flex flex-column flex-lg-row align-items-center bg-info pl-5 pr-5">
            <div className={"d-flex col-sm-12 justify-content-between justify-content-md-center col-md-1 mb-md-3 mb-lg-0 align-items-center "}>
                <Logo/>
                <span onClick={() => setIsActiveMobileMenu(prevState => !prevState)}
                      className="navbar-toggler-icon mobile border rounded border-color-dark p-3"/>
            </div>
            <div className={`header__menu p-0 flex-md-fill flex-md-column flex-lg-row justify-content-center justify-content-lg-between align-items-center flex-wrap flex-lg-nowrap d-flex ${isActiveMobileMenu && "header__show"}`}>
                <NavBar className={"mb-md-3 mb-lg-0"}/>
            <div className="d-flex align-items-md-center flex-column flex-md-row flex-grow-1 flex-md-grow-0 justifu-content-center">
                {isAuth ? authMenu : <AuthorizationModalWindow alertCloseHandler={() => setIsActiveAuthModal(false)} isActiveFromProps={isActiveAuthModal}/>}
                {isAuth ? linkToCreateAnnouncement("") : alertCreateAnnouncement()}
            </div>
            </div>
            {isActiveLogoutAlert && alertLogout()}
        </div>
    );
}

export default Header;
