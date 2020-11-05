import React from 'react';
import "./announcementStyles.css"
import {NavLink} from "react-router-dom";
import Image from "../image/image";

type AnnouncementPropsType = {
    photo: string
    id: number
    name: string
    category: string
    price: number
    creationDate: string
    subwayStation: string
    hasLike: boolean
}

const Announcement = (props: AnnouncementPropsType) => {

    const {photo, name, creationDate, category, price, subwayStation, id} = props

  return (
      <div className="announcement">
          <NavLink to={`${category}/${id}`}>
              <div className="announcement__photo-wrapper">
                  <Image photo={photo}/>
                  {/*<div style={{backgroundImage: `url(${photo})`}} className="announcement__photo"/>*/}
              </div>
          </NavLink>
          <div className="announcement__info-wrapper">
              <h3 className="announcement__info-name">{name}</h3>
              <div className="announcement__info-price">{price}</div>
              <div className="announcement__info-subway">{subwayStation}</div>
              <div className="announcement__info-creationDate">{creationDate}</div>
          </div>
      </div>
  )
}

export default Announcement;
