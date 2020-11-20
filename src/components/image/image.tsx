import React from 'react';
import "./imageStyles.css"

type ImagePropsType = {
    photo: string
    className?: string
    onClickHandler?: any
    styles?: any
}

const Image = (props: ImagePropsType) => {

    const {photo, className, onClickHandler = null, styles={}} = props

  return <div onClick={onClickHandler} style={{backgroundImage: `url(http://localhost:8080/photo/${photo})`, ...styles}} className={`image ${className}`}/>
}

export default Image;
