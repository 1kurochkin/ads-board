import React from 'react';
import Picture from "../../picture/picture";
import {PATH_CREATE_ANNOUNCEMENT} from "../../../app/App";
import {NavLink} from "react-router-dom";
import {API_URL} from "../../../api/serverAPI";
import {useSelector} from "react-redux";
import {getIsAuthSelector} from "../../../redux/reducers/authorizationState/authorizationStateSelectors";
import {getMyAnnouncementsSelector} from "../../../redux/reducers/myAnnouncementState/myAnnouncementStateSelectors";
import AuthorizationModalWindow from "../authorizationModalWindow/authorizationModalWindow";
import AlertCreateAnnouncement from '../alertCreateAnnouncement/alertCreateAnnouncement';
import {OKShareButton, OKIcon,  VKShareButton, FacebookShareButton, FacebookIcon, VKIcon} from "react-share";

export type ContestPopupBoxTypes = {
    closeModalWindow?: (boolean:boolean | any) => void
}

const giftPicture = "https://salamkg.ru/api/photo/D4771AE61CCAB62E285BC8BBBE1E127C5E52C6C8962F061B48D41A5D11697E1B"

console.log(giftPicture, "PICTUREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
const ContestPopupBox = (props: ContestPopupBoxTypes) => {

    //------MAP-STATE-TO-PROPS-----//
    const isAuth = useSelector(getIsAuthSelector)
    const myAnnouncements = useSelector(getMyAnnouncementsSelector)

    const url = API_URL.substr(0, API_URL.length - 4)
    const shareComponents = [
        <OKShareButton title={"Доска объявлений - salamkg.ru"} image={giftPicture} description={"Salam.ru – доска объявлений, на которой, есть возможность разместить объявления, либо найти себе жильё или работу."} className={"ml-3"} url={url}>
            <OKIcon size={36} />
        </OKShareButton>,
        <VKShareButton title={"Доска объявлений - salamkg.ru"} image={giftPicture} className={"ml-3"} url={url}>
            <VKIcon size={36} />
        </VKShareButton>,
        <FacebookShareButton title={"Доска объявлений - salamkg.ru"} className={"ml-3"} url={url}>
            <FacebookIcon size={36} />
        </FacebookShareButton>,
    ]

    const {closeModalWindow = () => null} = props

    return (
        <div className="modalWindow__popupBox overflow-auto">
            <h3>Конкурс</h3>
            <hr className={"my-4"}/>
            <div className="d-flex flex-column">
                <p className={"alert alert-success"}>
                    Встречай новый год с НОВЫМ макбуком!<br/>
                    В качестве новогоднего подарка победителя ждет новый макбук.<br/>
                    Принимай участие в розыгрыше от salamkg.ru!<br/>
                    Условия конкурса очень просты:<br/>
                    <span className={"d-flex flex-column justify-content-center mt-2"}>
                        <span className={"d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start"}>- Зарегистрироваться {isAuth ? "✅" : <AuthorizationModalWindow classNameForBtn={"btn-success ml-3"}/>}</span><br/>
                        <span className={"d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start"}>- Создать объявление {myAnnouncements.length ? "✅" : <AlertCreateAnnouncement classNameForBtn={"btn-success ml-3"}/>}</span><br/>
                        <span className={"d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start mb-3"}>
                            - Сделать репост сайта salamkg.ru в одной из соц. сетей
                            <span>{shareComponents.map(component => component)}</span>
                        </span>
                    </span><br/>
                    Победитель определится случайным образом 31 декабря в 20:00 по Московскому времени
                </p>
                <Picture className={"mb-4"} styles={{height: "200px"}} photo={giftPicture}/>
                <NavLink onClick={() => closeModalWindow(true)} className={"btn btn-success"} to={PATH_CREATE_ANNOUNCEMENT}>
                    Разместить объявление
                </NavLink>
            </div>
        </div>
    );
}

export default ContestPopupBox;
