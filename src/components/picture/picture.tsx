import React, {useEffect, useState} from 'react';
import "./pictureStyles.css"
import badCaseImage from "../../pictures/badCaseImage.png";
import Preloader from "../preloader/preloader";
import {API_URL} from "../../api/serverAPI";

type PicturePropsType = {
    photo: string | null | any
    className?: string
    onClickHandler?: any
    styles?: any
}

const Picture = (props: PicturePropsType) => {

    const {photo = "", className, onClickHandler = null, styles={}} = props
    const isImageFromServer = !photo.includes("data")

    const getImageSrc = () => isImageFromServer ? `${API_URL}/photo/${photo}` : photo

    const [imageSRC, setImageSRC] = useState(() => "")
    const [isLoadImage, setIsLoadImage] = useState(!isImageFromServer)

    useEffect(() => {
        setImageSRC(getImageSrc())
        if(isImageFromServer && photo) {
            const image = new Image
            image.src = getImageSrc()
            image.onerror = () => {
                setIsLoadImage(true)
                setImageSRC(badCaseImage)
            }
            image.onload = () => setIsLoadImage(true)
        }
        if(!photo) {
            setImageSRC(badCaseImage)
            setIsLoadImage(true)
        }
    }, [photo])

  return isLoadImage ?
      <div onClick={onClickHandler}  className={`image ${className}`}
           style={{backgroundImage: `url(${imageSRC})`, ...styles}} /> :
      <Preloader/>
}

export default Picture;
