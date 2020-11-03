import React, {useRef, useState} from 'react';
import "./selectStyles.css"
import SelectItem from "./selectItem/selectItem";
import useOutsideClick from "../../../hooks/useOutsideClick";

const Select = (props: any) => {
    const {
        selectItems = [],
        placeHolder,
        onChangeHandler,
        value,
    } = props

    const [isActive, setIsActive] = useState(false)
    const ref = useRef(null)
    const outsideClickHandler = () => isActive && setIsActive(false)
    useOutsideClick(ref, outsideClickHandler)

    const toggleIsActive = () => {
        setIsActive(prevIsActive => !prevIsActive)
    }

    return (
        <div ref={ref} className={"select"}>
            <div onClick={toggleIsActive} className="select__current">
                <input onChange={onChangeHandler}
                       placeholder={placeHolder}
                       className={"select__current-input"}
                       value={value} type="text"/>
                <div className={"select__current-arrow"}>&darr;</div>
            </div>
            <div className={`select__items ${isActive && "select__items-active"}`}>
                {selectItems.map((selectItem: any) =>
                    <SelectItem {...selectItem} onChangeHandler={() => console.log("CHANGE")}/>)}
            </div>
        </div>
    );
}

export default Select;
