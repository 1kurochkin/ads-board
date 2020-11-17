import React, {useRef, useState} from 'react';
import "./selectStyles.css"
import SelectItem from "./selectItem/selectItem";
import useOutsideClick from "../../../hooks/useOutsideClick";

const Select = (props: any) => {
    const {
        selectItems = [],
        placeHolder,
        onChangeHandler,
        onBlurHandler = null,
        onChangeHandlerSelectItem,
        value,
        className
    } = props

    const [isActive, setIsActive] = useState(false)
    const ref = useRef(null)
    const outsideClickHandler = () => isActive && setIsActive(false)
    useOutsideClick(ref, outsideClickHandler)

    const toggleIsActive: (boolean?: any) => void = (boolean:boolean | null = null) => {
        setIsActive(prevIsActive => boolean !== null ? boolean : !prevIsActive)
    }

    return (
        <div ref={ref} className={`select dropdown ${className} p-0`}>
                <input onClick={() => toggleIsActive()} onBlur={onBlurHandler} readOnly={true} onChange={onChangeHandler}
                       placeholder={placeHolder}
                       className={"select__current form-control dropdown-toggle w-100"}
                       value={value} type="text"/>
                {/*<div className={"select__current-arrow"}>&darr;</div>*/}
            <div className={`select__items dropdown-menu w-100 ${isActive && "show"}`}>
                {selectItems.map((selectItem: any) =>
                    <SelectItem {...selectItem} isActive={selectItem["name"] === value}  onChangeHandler={(event:any) => onChangeHandlerSelectItem(selectItem, toggleIsActive)}/>)}
            </div>
        </div>
    );
}

export default Select;
