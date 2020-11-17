import React from 'react';
import "./announcementStyles.css"
import {NavLink} from "react-router-dom";
import Image from "../image/image";
import {GET_PATH_SEARCH} from "../../app/App";

type AnnouncementPropsType = {
    photo: string
    id: number
    name: string
    category: string
    price: number
    creationDate: string
    subwayStation: string
    hasLike: boolean
    className?: string
}

const Announcement = (props: AnnouncementPropsType) => {

    const {photo, name, creationDate, category, className, price, subwayStation, id} = props


  return (
      <div className={`border text-center text-white border-dark mb-3 mr-3 p-0 ${className}`}>
              <NavLink to={`${GET_PATH_SEARCH(category)}/${id}`}>
          <div className="card-header p-0">
                  <Image photo={photo}/>
          </div>
              </NavLink>
              <div className={"card-inner-wrapper d-flex flex-column justify-content-between"}>
                  <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-primary">{name}</h5>
                      <h6 className="card-text text-dark">{`Цена: ${price} руб.`}</h6>
                      <h6 className="card-text text-dark">{`Метро: ${subwayStation}`}</h6>
                  </div>
                  <div className="card-footer">
                      <small className="text-muted">{`Дата создания: ${creationDate}`}</small>
                  </div>
              </div>
      </div>
  )
}

export default Announcement;