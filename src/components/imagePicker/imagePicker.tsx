import React from 'react';
import "./imagePickerStyles.css"

type ImagePickerPropsType = {
    onLoadHandler: Function
    className?: string
}

const ImagePicker = (props: ImagePickerPropsType) => {

    const {onLoadHandler, className} = props

    const onChangeFileHandler = (event: any) => {
        const file = event.target.files[0]
        const {name = `uploadUserImg${Date.now()}`} = file || {}
        const reader = new FileReader();

        reader.onload = () => {
            const {result} = reader
            onLoadHandler(result, name)
        }

        reader.readAsDataURL(file)
    }

  return <input onChange={onChangeFileHandler} type="file" className={`imagePicker ${className}`}/>
}

export default ImagePicker;
