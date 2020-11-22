import React from 'react';
import "./announcementStyles.css"
import {NavLink} from "react-router-dom";
import Image from "../picture/picture";
import {GET_PATH_SEARCH} from "../../app/App";

type AnnouncementPropsType = {
    photos: string
    id: number
    name: string
    categoryName: string
    price: number
    creationDate: string
    station: string
    hasLike: boolean
    className?: string
}

const Announcement = (props: AnnouncementPropsType) => {

    const {photos, name, creationDate, categoryName, className, price, station, id} = props


  return (
      <div className={`border text-center d-flex flex-column flex-md-row text-white border-dark mb-3 mr-3 p-0 ${className}`}>
              <NavLink className={"col-lg-4 col-md-5 col-sm-12 p-0 card-header"} to={`${GET_PATH_SEARCH(categoryName)}/${id}`}>
          {/*<div className="card-header p-0">*/}
                  <Image photo={photos[0]}/>
          {/*</div>*/}
              </NavLink>
              <div className={"card-inner-wrapper d-flex flex-column justify-content-between"}>
                  <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-primary">{name}</h5>
                      <h6 className="card-text text-dark">{`Цена: ${price} руб.`}</h6>
                      <h6 className="card-text text-dark">{`Метро: ${station}`}</h6>
                  </div>
                  <div className="card-footer">
                      <small className="text-muted">{`Дата создания: ${creationDate}`}</small>
                  </div>
              </div>
      </div>
  )
}

export default Announcement;
