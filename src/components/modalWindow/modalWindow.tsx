import React, {ReactElement, Ref, useEffect, useRef, useState} from 'react';
import "./modalWindowStyles.css"
import useOutsideClick from '../../hooks/useOutsideClick';

type propsTypes = {
    alertCloseHandler?: Function
    isActiveFromProps?: boolean
    children?: any
    withOpenBtn?: boolean
    modal: ReactElement
}

const ModalWindow = (props: propsTypes) => {

    const {isActiveFromProps, modal, withOpenBtn = false, children, alertCloseHandler = () => null} = props
    const ref: Ref<any> = useRef(null)

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      isActiveFromProps && setIsActive(true)
    }, [isActiveFromProps])

    const outsideClickHandler = () => {
      isActive && closeModalWindow()
    }
    const closeModalWindow = (withAlertClose = true) => {
        setIsActive(false)
        withAlertClose && alertCloseHandler()
    }

    useOutsideClick(ref, outsideClickHandler)

    return (

        <>
            <div className={`modalWindow ${isActive && "modalWindow__active"} `}>
                <div ref={ref} className="modalWindow__popupBox">
                    {React.cloneElement(modal, {closeModalWindow})}
                    <span onClick={() => closeModalWindow()} className={"popup__close"}>&times;</span>
                </div>
            </div>
            { withOpenBtn && children(() => setIsActive(true)) }
        </>
    );
}

export default ModalWindow;
