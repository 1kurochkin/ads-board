import React from 'react';
import "./textInputStyles.css"

type propsTypes = {
  placeholder?:string
  inputType?: string
  value: string
  key?: number | string
  onBlurHandler?: Function
  onChangeHandler?: Function
  isValid?: boolean
  className?: string
  label?: string,
  isReadOnly?: boolean
}

const TextInput = (props: propsTypes) => {

  const {
    className,
    placeholder,
    value, key,
    onBlurHandler = () => null,
    onChangeHandler = () => null,
    inputType = "text",
    label = "",
    isReadOnly = false,
    isValid = true} = props

  return (
        <div className={`textInput ${!isValid ? "textInput__alert" : null} ${className}`}>
          <label>{label}</label>
          {inputType === "textArea" ?
              <textarea style={{resize: "none"}} rows={6} className={"form-control"} onChange={(event) => onChangeHandler(event)} placeholder={placeholder}
                        onBlur={(event) => onBlurHandler(event)} value={value}/> :
              <input readOnly={isReadOnly} className={"form-control"} key={key} onBlur={(event) => onBlurHandler(event)} value={value} type={inputType} placeholder={placeholder}
                     onChange={(event) => onChangeHandler(event)} />}
        </div>
  );
}

export default TextInput;
