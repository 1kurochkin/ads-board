import React from 'react';
import "./buttonStyles.css"

type ButtonPropsType = {
    onClickHandler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    label: string
    isDisabled?: boolean
    className?: string
}

const Button = (props: ButtonPropsType) => {

    const {className, isDisabled = false, label, onClickHandler} = props

  return isDisabled ?
       <div className={`btn ${className}`}>Отправка...</div> :
      <div onClick={onClickHandler} className={`btn ${className}`}>{label}</div>

}

export default Button;
