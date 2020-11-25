import React from 'react';
import "./selectItem.css"

type PropsType = {
    name?: string
    isActive: any
    onChangeHandler: any
    className?: string
}

const SelectItem = (props: PropsType) => {

    const {name = "", isActive, onChangeHandler, className} = props

    return (
        <div style={{cursor: "pointer"}} onClick={onChangeHandler} className={`selectItem dropdown-item p-3 border-bottom ${className} ${isActive && "active"}`}>
            {name}
            {/*<input checked={isActive} type="radio" className="selectItem__checkBox"/>*/}
        </div>
    );
}

export default SelectItem;
