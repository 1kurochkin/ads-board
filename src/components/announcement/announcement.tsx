import React from 'react';
import "./announcementStyles.css"
import {NavLink} from "react-router-dom";
import Image from "../picture/picture";
import {GET_PATH_SEARCH} from "../../app/App";

type AnnouncementPropsType = {
    photos: Array<string>
    id: number
    name: string
    categoryName: string,
    description:string,
    price: number
    creationDate: string
    station: string
    hasLike: boolean
    className?: string
}

const Announcement = (props: AnnouncementPropsType) => {

    const {photos = [], description, name, creationDate, categoryName, className, price, station, id} = props


  return (
      <NavLink className={`announcement border cursor-pointer text-center d-flex flex-column flex-md-row text-white border-dark mb-3 mr-3 p-0 ${className}`} to={`${GET_PATH_SEARCH(categoryName)}/${id}`}>
          <div className="col-lg-4 col-md-5 p-0 card-header">
              <Image photo={photos[0]}/>
          </div>
              <div className={"card-inner-wrapper d-flex flex-column justify-content-between"}>
                  <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-primary">{name}</h5>
                      <span className="text-dark mb-2">{description.length > 60 ? `${description.substr(0, 60)}...`: description}</span>
                      {price !== 0 && <h6 className="card-text text-dark">{`Цена: ${price} руб.`}</h6>}
                      <h6 className="card-text text-dark">{`Метро: ${station}`}</h6>
                  </div>
                  <div className="card-footer">
                      <small className="text-muted">{`Дата создания: ${creationDate}`}</small>
                  </div>
              </div>
      </NavLink>
  )
}

export default Announcement;
