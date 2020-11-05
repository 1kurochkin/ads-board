import React from 'react';
import ModalWindow from "../modalWindow";
import AlertPopupBox from "./alertPopupBox";

export type AlertModalType = {
  btnOneConfiguration : {
    btnOneClassName? : string
    btnOneLabel : string
  }
  btnTwoConfiguration : {
    handler?: Function
    btnTwoLabel : string
    btnTwoClassName? : string
  }
  className?:string
  alertText: string
  openBtnElement?: any
}

const AlertModalWindow = (props: AlertModalType) => {
  const {openBtnElement} = props
  return (
      <ModalWindow withOpenBtn={true} modal={<AlertPopupBox {...props}/>}>{ (openModalWindow:any) =>
          React.cloneElement(openBtnElement, {onClickHandler: openModalWindow})
      }</ModalWindow>
  );
}

export default AlertModalWindow;
