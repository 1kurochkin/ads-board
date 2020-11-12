import React from 'react';
import "./selectItem.css"

type PropsType = {
    label: string
    isActive: any
    onChangeHandler: any
    className?: string
}

const SelectItem = (props: PropsType) => {

    const {label, isActive, onChangeHandler, className} = props

    return (
        <div onClick={onChangeHandler} className={`selectItem dropdown-item ${className}`}>
            {label}
            {/*<input checked={isActive} type="radio" className="selectItem__checkBox"/>*/}
        </div>
    );
}

export default SelectItem;
