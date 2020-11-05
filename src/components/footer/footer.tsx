import React from 'react';
import "./footerStyles.css"
import { NavLink } from 'react-router-dom';
import Logo from "../logo/logo";

const Footer = (props: any) => {

  const linkConfigs = [
      {path: "/contacts", label: "Контакты"},
      {path: "/contacts", label: "Реклама"},
      {path: "/contacts", label: "Поддержка"}
  ]

  return (
      <div className="footer">
          <Logo/>
          <div className="footer__navigation-wrapper">
            {linkConfigs.map( ({path, label}) =>
              <NavLink className="footer__navigation-link" to={path}>
                {label}
              </NavLink> )}
          </div>
          <NavLink className="header__btn-link btn" to={"/createAnnouncement"}>
              Разместить объявление
          </NavLink>
      </div>
  );
}

export default Footer;
