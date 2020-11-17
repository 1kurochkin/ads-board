import React from 'react';
import "./imagePickerStyles.css"

type ImagePickerPropsType = {
    onLoadHandler: Function
    className?: string
    styles?: any
}

const ImagePicker = (props: ImagePickerPropsType) => {

    const {onLoadHandler, className, styles=null} = props

    const onChangeFileHandler = (event: any) => {
        const file = event.target.files[0]
        const {name = `uploadUserImg${Date.now()}`} = file || {}
        const reader = new FileReader();

        reader.onload = () => {
            const {result} = reader
            onLoadHandler(result, name)
        }

        file && reader.readAsDataURL(file)
    }

  return <div style={styles} className={`h-100 w-100 ${className}`}>
      <input onChange={onChangeFileHandler} type="file" className={`imagePicker`}/>
      <div className="h-100 w-100 d-flex justify-content-center align-items-center border border-dark alert-dark">
         <h2 className={"display-4"}>+</h2>
      </div>
  </div>
}

export default ImagePicker;
