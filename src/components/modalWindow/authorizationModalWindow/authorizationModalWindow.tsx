import React from 'react';
import ModalWindow from "../modalWindow";
import AuthorizationPopupBox from "./authorizationPopupBox";
import Button from "../../button/button";

type AuthorizationModalWindowType = {
  isActiveFromProps?: boolean
  alertCloseHandler?:Function
  classNameForBtn?: string
}
const AuthorizationModalWindow = (props: AuthorizationModalWindowType) => {

  const {isActiveFromProps = false, alertCloseHandler, classNameForBtn} = props

  return (
      <ModalWindow alertCloseHandler={alertCloseHandler} isActiveFromProps={isActiveFromProps} withOpenBtn={true} modal={<AuthorizationPopupBox/>}>{
          (openModalWindow:any) =>
              <Button svgIconName={"login"} label="Вход и регистрация" onClickHandler={openModalWindow} className={`btn-outline-light createAnnouncement__link align-items-end mr-md-3 mb-3 mb-md-0 ${classNameForBtn}`}/>
      }</ModalWindow>
  );
}

export default AuthorizationModalWindow;
