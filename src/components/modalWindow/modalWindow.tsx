import React, {useEffect, useState} from 'react';
import "./modalWindowStyles.css"

type propsTypes = {
  isActiveFromProps?:boolean
  children?:any
}

const ModalWindow = (props: propsTypes) => {

  const {isActiveFromProps, children} = props

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    isActiveFromProps && setIsActive(true)
  }, [])


  return (
    <div className={`modalWindow ${isActive && "modalWindow__active"} `}>
      <div className="modalWindow__popupBox">
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
