import React from 'react';
import ModalWindow from "../modalWindow";
import AlertPopupBox from "./alertPopupBox";

export type AlertModalType = {
  btnOneConfiguration : {
    btnOneHandler?: Function
    btnOneClassName? : string
    btnOneLabel : string
  }
  btnTwoConfiguration : {
    btnTwoHandler?: Function
    btnTwoLabel : string
    btnTwoClassName? : string
  }
  className?:string
  alertText: string
  openBtnElement?: any
  isActiveFromProps?: boolean
}

const AlertModalWindow = (props: AlertModalType) => {
  const {openBtnElement, btnOneConfiguration: {btnOneHandler}, isActiveFromProps} = props
  return (
      <ModalWindow isActiveFromProps={isActiveFromProps} alertCloseHandler={btnOneHandler} withOpenBtn={true} modal={<AlertPopupBox {...props}/>}>{ (openModalWindow:any) =>
          openBtnElement && React.cloneElement(openBtnElement, {onClickHandler: openModalWindow})
      }</ModalWindow>
  );
}

export default AlertModalWindow;
