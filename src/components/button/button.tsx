import React from 'react';
import "./buttonStyles.css"
import getPicture from "../../pictures/svgIcons";

type ButtonPropsType = {
    onClickHandler?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    label: any
    isDisabled?: boolean
    className?: string
    svgIconName?: string
}

const Button = (props: ButtonPropsType) => {

    const {className, svgIconName, isDisabled = false, label, onClickHandler} = props

  return isDisabled ?
       <div className={`btn ${className} font-weight-bold`}>
           <span className={"mr-2"}>{getPicture("sending")}</span>
           Отправка...
       </div> :
      <div onClick={onClickHandler} className={`btn ${className} d-flex align-items-center justify-content-center font-weight-bold`}>
          {svgIconName && <span className={"mr-2"}>{getPicture(svgIconName)}</span>}
          {label}
      </div>

}

export default Button;
