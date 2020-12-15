import React, {useState} from 'react';
import AlertModalWindow from "../alertModalWindow/alertModalWindow";
import Button from "../../button/button";
import AuthorizationModalWindow from "../authorizationModalWindow/authorizationModalWindow";

type AlertCreateAnnouncementTypes = {
  classNameForBtn?: string
}

const AlertCreateAnnouncement = ({classNameForBtn}: AlertCreateAnnouncementTypes) => {

  const [isActiveAuthModal, setIsActiveAuthModal] = useState(false)

  return <>
      {  isActiveAuthModal && <AuthorizationModalWindow alertCloseHandler={() => setIsActiveAuthModal(false)} isActiveFromProps={true}/>}
      <AlertModalWindow openBtnElement={<Button svgIconName={"createAnnouncement"} className={`btn-outline-light createAnnouncement__link my-sm-2 ${classNameForBtn}`} label={"Разместить объявление"}/>}
                        btnOneConfiguration={{btnOneLabel: "Позже", btnOneHandler:() => setIsActiveAuthModal(false) }}
                        btnTwoConfiguration={{btnTwoLabel: "Авторизироваться", btnTwoHandler:() => setIsActiveAuthModal(true) }}
                        alertText={"Для размещения объявления, необходимо авторизироваться!"}/>
  </>
}

export default AlertCreateAnnouncement;
