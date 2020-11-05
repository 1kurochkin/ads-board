import React from 'react';
import "./imageStyles.css"

type ImagePropsType = {
    photo: string
    className?: string
}

const Image = (props: ImagePropsType) => {

    const {photo, className} = props

  return <div style={{backgroundImage: `url(${photo})`}} className={`image ${className}`}/>
}

export default Image;
