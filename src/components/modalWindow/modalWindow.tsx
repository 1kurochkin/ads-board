import React, {ReactElement, Ref, useEffect, useRef, useState} from 'react';
import "./modalWindowStyles.css"
import useOutsideClick from '../../hooks/useOutsideClick';

type propsTypes = {
    isActiveFromProps?: boolean
    children?: any
    withOpenBtn?: boolean
    modal: ReactElement
}

const ModalWindow = (props: propsTypes) => {

    const {isActiveFromProps, modal, withOpenBtn = false, children} = props
    const ref: Ref<any> = useRef(null)

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      isActiveFromProps && setIsActive(true)
    }, [])

    const outsideClickHandler = () => {
      isActive && setIsActive(false)
    }

    useOutsideClick(ref, outsideClickHandler)

    return (
        <>
            <div className={`modalWindow ${isActive && "modalWindow__active"} `}>
                <div ref={ref} className="modalWindow__popupBox">
                    {React.cloneElement(modal, {closeModalWindow: () => setIsActive(false)})}
                </div>
            </div>
            { withOpenBtn && children(() => setIsActive(true)) }
        </>
    );
}

export default ModalWindow;
