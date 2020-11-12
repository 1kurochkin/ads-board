import React from 'react';
import "./imageStyles.css"

type ImagePropsType = {
    photo: string
    className?: string
    onClickHandler?: any
}

const Image = (props: ImagePropsType) => {

    const {photo, className, onClickHandler = null} = props

  return <div onClick={onClickHandler} style={{backgroundImage: `url(${photo})`}} className={`image ${className}`}/>
}

export default Image;
