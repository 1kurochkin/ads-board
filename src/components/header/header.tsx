import React from 'react';
import "./headerStyles.css"
import { NavLink } from 'react-router-dom';
import Logo from "../logo/logo";
import AuthorizationModalWindow from "../modalWindow/authorizationModalWindow/authorizationModalWindow";

const Header = (props: any) => {

  const linkConfigs = [
      {path: "/housing", label: "Недвижимость"},
      {path: "/job", label: "Работа"},
      {path: "/trading", label: "Купить или Продать"},
  ]

  return (
      <div className="header">
        <div className="header__inner-wrapper">
          <Logo/>
          <div className="header__navigation-wrapper">
            {linkConfigs.map( ({path, label}) =>
              <NavLink className="header__navigation-link" to={path}>
                {label}
              </NavLink> )}
          </div>
        </div>
        <div className="header__inner-wrapper">
          <div className="header__btn-link btn">Разместить объявление</div>
          <AuthorizationModalWindow/>
        </div>
      </div>
  );
}

export default Header;
