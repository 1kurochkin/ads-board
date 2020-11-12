import React from 'react';
import ModalWindow from "../modalWindow";
import AuthorizationPopupBox from "./authorizationPopupBox";
import Button from "../../button/button";

type AuthorizationModalWindowType = {
  isActiveFromProps?: boolean
  alertCloseHandler?:Function
}
const AuthorizationModalWindow = (props: AuthorizationModalWindowType) => {

  const {isActiveFromProps = false, alertCloseHandler} = props

  return (
      <ModalWindow alertCloseHandler={alertCloseHandler} isActiveFromProps={isActiveFromProps} withOpenBtn={true} modal={<AuthorizationPopupBox/>}>{
          (openModalWindow:any) =>
              <Button label="Вход и регистрация" onClickHandler={openModalWindow} className="btn-outline-light"/>
      }</ModalWindow>
  );
}

export default AuthorizationModalWindow;
