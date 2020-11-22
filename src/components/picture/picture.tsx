import React, {useState} from 'react';
import "./pictureStyles.css"
import useBadCaseImage from "../../hooks/useBadCaseImage";
import badCaseImage from "../../pictures/badCaseImage.png";
import Preloader from "../preloader/preloader";

type PicturePropsType = {
    photo: string
    className?: string
    onClickHandler?: any
    styles?: any
}

const Picture = (props: PicturePropsType) => {

    const {photo, className, onClickHandler = null, styles={}} = props

    //
    // const [imageSRC, setImageSRC] = useState(photo)
    const [isLoadImage, setIsLoadImage] = useState(true)

    // const image = new Image
    // image.src = imageSRC
    // image.onload = () => {
    //     console.log("LOAD IMAGE")
    // }
    // image.onerror = () => setImageSRC(badCaseImage)

  return isLoadImage ?
      <div onClick={onClickHandler}  className={`image ${className}`}
           style={{backgroundImage: `url(${photo})`, ...styles}} /> :
      <Preloader/>
}

export default Picture;
