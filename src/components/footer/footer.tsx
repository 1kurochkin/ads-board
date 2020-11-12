import React from 'react';
import "./footerStyles.css"
import { NavLink } from 'react-router-dom';
import Logo from "../logo/logo";
import {PATH_CREATE_ANNOUNCEMENT} from "../../app/App";
import NavCategoryButton from "../navCategoryButton/navCategoryButton";
import {useSelector} from "react-redux";
import {getCategoriesDataSelector} from "../../redux/reducers/mainState/mainStateSelectors";

const Footer = (props: any) => {

    //------MAP-STATE-TO-PROPS-----//
    const categoriesData = useSelector(getCategoriesDataSelector)

    //TODO Вынести в компонент navigation
  return (
      <div className="navbar navbar-dark bg-info pl-5 pr-5">
          <Logo/>
          <div className="navbar-nav flex-row">
              {categoriesData.map((categoryData: any, index:number) => {
                  const {category, label, id} = categoryData
                  return index !== 0 &&
                      <NavCategoryButton className={"nav-link ml-3"} key={id} category={category} configCategory={categoryData}>
                          {label}
                      </NavCategoryButton> })}
          </div>
          <NavLink className="btn btn-outline-light" to={PATH_CREATE_ANNOUNCEMENT}>
              Разместить объявление
          </NavLink>
      </div>
  );
}

export default Footer;
