import React from 'react';
import "./footerStyles.css"
import Logo from "../logo/logo";
import {linkToCreateAnnouncement} from "../../app/App";
import NavBar from "../navBar/navBar";

const Footer = (props: any) => {

  return (
      <div className="navbar navbar-dark bg-info flex-md-column flex-lg-row pl-5 pr-5 flex-column justify-content-center flex-md-row">
          <Logo className={"mb-3 mb-lg-0"}/>
          <div className="d-flex flex-column flex-lg-row flex-fill col-sm-12 col-md-10 flex-md-column align-items-md-center flex-md-row p-0 justify-content-md-around">
              <NavBar/>
              {linkToCreateAnnouncement("mt-4 mt-lg-0")}
          </div>

      </div>
  );
}

export default Footer;
