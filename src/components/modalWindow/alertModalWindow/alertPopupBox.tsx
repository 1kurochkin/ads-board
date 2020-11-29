import React from 'react';
import "./alertPopupBoxStyles.css"
import Button from "../../button/button";

export type AlertPopupBoxType = {
    closeModalWindow?: (boolean:boolean | any) => void
    btnOneConfiguration? : {
        btnOneClassName? : string
        btnOneLabel : string
    }
    btnTwoConfiguration? : {
        btnTwoHandler?: Function
        btnTwoLabel : string
        btnTwoClassName? : string
    }
    className?:string
    alertText: string
}

const AlertPopupBox = (props: AlertPopupBoxType) => {

    const {
        closeModalWindow = () => null,
        alertText,
        btnOneConfiguration,
        btnTwoConfiguration
    } = props

    const {btnOneLabel = ""} = btnOneConfiguration || {}
    const {btnTwoHandler = () => null, btnTwoLabel = ""} = btnTwoConfiguration || {}

    const onClickBtnTwoHandler = () => {
        btnTwoHandler()
        closeModalWindow(false)
    }

    return (
        <div className="alertPopupBox">
            <h3 className={"alertPopupBox__title"}>{alertText}</h3>
            <hr className={"my-4"}/>
            <div className="d-lg-flex justify-content-between">
                {btnOneConfiguration && <Button className={"btn-success col-lg-5"} onClickHandler={closeModalWindow} label={btnOneLabel}/>}
                {btnTwoConfiguration && <Button className={"btn-danger my-4 my-lg-0 col-lg-5"} onClickHandler={onClickBtnTwoHandler}
                         label={btnTwoLabel}/>}
            </div>
        </div>
    );
}

export default AlertPopupBox;
