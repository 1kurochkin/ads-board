import React from 'react';
import "./pictureStyles.css"
import useBadCaseImage from "../../hooks/useBadCaseImage";

type ImagePropsType = {
    photo: string
    className?: string
    onClickHandler?: any
    styles?: any
}

const Picture = (props: ImagePropsType) => {

    const {photo, className, onClickHandler = null, styles={}} = props

    const imageSRC = useBadCaseImage(photo)

  return <div onClick={onClickHandler} style={{backgroundImage: `url(${imageSRC})`, ...styles}} className={`image ${className}`}/>
}

export default Picture;
