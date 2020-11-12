import React from 'react';
import "./footerStyles.css"
import {NavLink} from 'react-router-dom';
import Logo from "../logo/logo";
import {PATH_CONTACTS, PATH_CREATE_ANNOUNCEMENT} from "../../app/App";

const Footer = (props: any) => {

    const linkConfigs = [
        {path: PATH_CONTACTS, label: "Контакты"},
        {path: PATH_CONTACTS, label: "Реклама"},
        {path: PATH_CONTACTS, label: "Поддержка"}
    ]


    //TODO Вынести в компонент navigation
  return (
      <div className="navbar navbar-dark bg-info pl-5 pr-5">
          <Logo/>
          <div className="navbar-nav flex-row">
            {linkConfigs.map( ({path, label}) =>
              <NavLink className="nav-link ml-3" to={path}>
                {label}
              </NavLink> )}
          </div>
          <NavLink className="btn btn-outline-light" to={PATH_CREATE_ANNOUNCEMENT}>
              Разместить объявление
          </NavLink>
      </div>
  );
}

export default Footer;
