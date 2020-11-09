import React from 'react';
import ModalWindow from "../modalWindow";
import AuthorizationPopupBox from "./authorizationPopupBox";

type AuthorizationModalWindowType = {
  isActiveFromProps?: boolean
  alertCloseHandler?:Function
}
const AuthorizationModalWindow = (props: AuthorizationModalWindowType) => {

  const {isActiveFromProps = false, alertCloseHandler} = props

  return (
      <ModalWindow alertCloseHandler={alertCloseHandler} isActiveFromProps={isActiveFromProps} withOpenBtn={true} modal={<AuthorizationPopupBox/>}>{
          (openModalWindow:any) =>
              <div onClick={openModalWindow} className="header__btn-link btn">Вход и регистрация</div>
      }</ModalWindow>
  );
}

export default AuthorizationModalWindow;
