import React, {useState} from 'react';
import {API_URL} from "../app/App";
import badCaseImage from "../pictures/badCaseImage.png"

const useBadCaseImage = (photo:string) => {

    const [imageSRC, setImageSRC] = useState(`${API_URL}/photo/${photo}`)
    const image = new Image
    image.src = imageSRC
    image.onerror = () => setImageSRC(badCaseImage)

    return imageSRC
}

export default useBadCaseImage;
