import React from 'react';
import "./buttonStyles.css"

type ButtonPropsType = {
    onClickHandler?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    label: any
    isDisabled?: boolean
    className?: string
}

const Button = (props: ButtonPropsType) => {

    const {className, isDisabled = false, label, onClickHandler} = props

  return isDisabled ?
       <div className={`btn ${className} font-weight-bold`}>Отправка...</div> :
      <div onClick={onClickHandler} className={`btn ${className} font-weight-bold`}>{label}</div>

}

export default Button;
