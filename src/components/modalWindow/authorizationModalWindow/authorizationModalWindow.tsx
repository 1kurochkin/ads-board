import React from 'react';
import ModalWindow from "../modalWindow";
import AuthorizationPopupBox from "./authorizationPopupBox";


const AuthorizationModalWindow = () => {

  return (
      <ModalWindow withOpenBtn={true} modal={<AuthorizationPopupBox/>}>{
          (openModalWindow:any) =>
              <div onClick={openModalWindow} className="header__btn-link btn">Вход и регистрация</div>
      }</ModalWindow>
  );
}

export default AuthorizationModalWindow;
