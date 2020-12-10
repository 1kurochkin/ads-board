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
    key?: any
}

const Announcement = (props: AnnouncementPropsType) => {

    const {photos = [], description, name, categoryName, key, creationDate, className, price, station, id} = props

    const getCreationDate = () => {
        const [date, time] = creationDate.split(" ")
        const [numberOfMonth, month, year] = date.split(".")
        const todayNumberOfMonth = new Date().getDate()
        const numberOfMonthWithoutZero = () => Number(numberOfMonth)

        if(todayNumberOfMonth  == numberOfMonthWithoutZero()) return `Сегодня ${time}`
        if( numberOfMonthWithoutZero() + 1 == todayNumberOfMonth ) return `Вчера ${time}`

        switch (month) {
            case "1": return `${numberOfMonthWithoutZero()} Января ${year} г.`
            case "2": return `${numberOfMonthWithoutZero()} Февраля ${year} г.`
            case "3": return `${numberOfMonthWithoutZero()} Марта ${year} г.`
            case "4": return `${numberOfMonthWithoutZero()} Апреля ${year} г.`
            case "5": return `${numberOfMonthWithoutZero()} Мая ${year} г.`
            case "6": return `${numberOfMonthWithoutZero()} Июня ${year} г.`
            case "7": return `${numberOfMonthWithoutZero()} Июля ${year} г.`
            case "8": return `${numberOfMonthWithoutZero()} Августа ${year} г.`
            case "9": return `${numberOfMonthWithoutZero()} Сентября ${year} г.`
            case "10": return `${numberOfMonthWithoutZero()} Октября ${year} г.`
            case "11": return `${numberOfMonthWithoutZero()} Ноября ${year} г.`
            case "12": return `${numberOfMonthWithoutZero()} Декабря ${year} г.`
            default: return date
        }
    }


  return (
      <NavLink key={key} className={`announcement border cursor-pointer text-center d-flex flex-column flex-md-row text-white border-dark mb-3 mr-3 p-0 ${className}`} to={`${GET_PATH_SEARCH(categoryName)}/${id}`}>
          <div className="col-lg-4 col-md-5 p-0 card-header">
              <Image photo={photos[0]}/>
          </div>
              <div className={"card-inner-wrapper d-flex flex-column justify-content-between"}>
                  <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-primary">{name}</h5>
                      <span className="text-dark mb-2">{description.length > 60 ? `${description.substr(0, 60)}...`: description}</span>
                      {price !== 0 && <h6 className="card-text text-dark">{`Цена: ${price} руб.`}</h6>}
                      {station && <h6 className="card-text text-dark">{`Метро: ${station}`}</h6>}
                  </div>
                  <div className="card-footer">
                      <small className="text-muted">{`Дата создания: ${getCreationDate()}`}</small>
                  </div>
              </div>
      </NavLink>
  )
}

export default Announcement;
