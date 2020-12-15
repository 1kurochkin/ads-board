import React from 'react';
import "./navBarStyles.css"
import {NavLink} from "react-router-dom";
import {PATH_CONTACTS, PATH_COOPERATION, PATH_CREATE_ANNOUNCEMENT, PATH_SUPPORT} from "../../app/App";
import CategoryNavigationButton from "../categoryNavButton/categoryNavigationButton";
import {initialStateCategory} from "../../redux/reducers/mainState/mainState";
import Button from "../button/button";
import ContestModalWindow from "../modalWindow/contestModalWindow/contestModalWindow";

type NavBarPropsType = {
    className?: string
}

const NavBar = (props: NavBarPropsType) => {

    const linkConfigs = [
        {path: PATH_COOPERATION, label: "Сотрудничество", svgIconName: "cooperation"},
        {path: PATH_SUPPORT, label: "Поддержка" , svgIconName: "setting"},
    ]


    const {className} = props

  return (
      <div className={`navbar-nav my-4 my-md-0 d-flex  justify-content-md-center flex-fill flex-md-row p-0 ${className}`}>
          <CategoryNavigationButton className={"nav-link p-md-0"} category={"all"} configCategory={initialStateCategory}>
              <Button svgIconName={"announcements"} className={"btn-light w-100"} label={"Объявления"}/>
          </CategoryNavigationButton>
          {linkConfigs.map( ({path, label, svgIconName}) =>
              <NavLink className="nav-link ml-md-2 p-md-0" to={path}>
                  <Button svgIconName={svgIconName} className={"btn-light w-100"} label={label}/>
              </NavLink> )}
          <ContestModalWindow isActiveFromProps={false} openBtnElement={<Button svgIconName={"gift"} className={"ml-md-2 mt-2 mt-md-0 btn-light"} label={"Конкурс"}/>}/>
      </div>
  )
}

export default NavBar;
