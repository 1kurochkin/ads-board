import React, {useCallback, useEffect, useRef, useState} from 'react';
import "./headerStyles.css"
import {Link, useHistory} from 'react-router-dom';
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

    //------USE-HISTORY-----//
    const {location} = useHistory()

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

    //------DID-UODATE-DEP-LOCATION-----//
    useEffect( () => {
        setIsActiveMobileMenu(false)
        setIsActiveAuthMenu(false)
    }, [location])

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
        <AlertModalWindow openBtnElement={<Button svgIconName={"createAnnouncement"} className={"btn-outline-light createAnnouncement__link my-sm-2"} label={"Разместить объявление"}/>}
                          btnOneConfiguration={{btnOneLabel: "Позже", btnOneHandler:() => setIsActiveAuthModal(false) }}
                          btnTwoConfiguration={{btnTwoLabel: "Авторизироваться", btnTwoHandler:() => setIsActiveAuthModal(true) }}
                          alertText={"Для размещения объявления, необходимо авторизироваться!"}/>, [])

    const alertLogout = useCallback(() =>
        <AlertModalWindow isActiveFromProps={true} alertText={"Выйти из аккаунта?"}
                          btnOneConfiguration={{btnOneLabel: "Нет", btnOneHandler:() => setIsActiveLogoutAlert(false)}}
                          btnTwoConfiguration={{btnTwoLabel: "Да", btnTwoHandler:logoutUser }}/>, [])

    const authMenu = <>
        <div ref={ref} onClick={toggleIsActiveAuthMenu} className="dropdown header__authMenu mr-md-4">
            <Button svgIconName={"profile"} className={"btn-warning dropdown-toggle w-100"} label={name}/>
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
        <div className="navbar justify-content-center navbar-dark d-flex flex-column flex-lg-row align-items-center bg-info">
            <div className={"d-flex col-sm-12 justify-content-between justify-content-md-center col-md-1 mb-md-3 mb-lg-0 align-items-center "}>
                <Logo/>
                <span style={{cursor: "pointer"}} onClick={() => setIsActiveMobileMenu(prevState => !prevState)}
                      className="navbar-toggler-icon mobile border rounded border-color-dark p-3"/>
            </div>
            <div className={`d-flex header__menu flex-column mobile flex-lg-row flex-fill col-sm-12 col-md-10 flex-md-column align-items-md-center flex-md-row p-0 justify-content-md-around ${isActiveMobileMenu && "header__show"}`}>
                <NavBar className={"mb-md-3 mb-lg-0"}/>
            <div className="d-flex align-items-md-center flex-column flex-md-row flex-grow-1 flex-md-grow-0">
                {isAuth ? authMenu : <AuthorizationModalWindow alertCloseHandler={() => setIsActiveAuthModal(false)} isActiveFromProps={isActiveAuthModal}/>}
                {isAuth ? linkToCreateAnnouncement("") : alertCreateAnnouncement()}
            </div>
            </div>
            {isActiveLogoutAlert && alertLogout()}
        </div>
    );
}

export default Header;
