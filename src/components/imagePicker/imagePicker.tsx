import React from 'react';
import "./imagePickerStyles.css"

type ImagePickerPropsType = {
    onLoadHandler: Function
    className?: string
    styles?: any
}

export const MAX_FILE_SIZE = 1900000

const ImagePicker = (props: ImagePickerPropsType) => {

    const {onLoadHandler, className, styles=null} = props

    const onChangeFileHandler = (event: any) => {
        const file = event.target.files[0]
        file && onLoadHandler(file)
    }

  return <div style={styles} className={`h-100 w-100 ${className}`}>
      <input style={{cursor: "pointer"}} onChange={onChangeFileHandler} type="file" accept=".png, .jpg, .jpeg" className={`imagePicker`}/>
      <div className="h-100 w-100 d-flex justify-content-center align-items-center border border-dark alert-dark">
         <h2 className={"display-4"}>+</h2>
      </div>
  </div>
}

export default ImagePicker;
