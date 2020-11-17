import * as React from "react"
import "./sliderStyle.css"
import {useState} from "react";


type NextOrPrevArgType = "next" | "prev" | string
type SliderPropsTypes = {
    children : any
    className?: string
}

function Slider(props: SliderPropsTypes) {

    const {children, className} = props

    //-------------LOCAL-STATE--------------//
    const [currentSlide, setCurrentSlide] = useState(0)

    const isLastSlide = () => currentSlide === children["length"] - 1
    const isFirstSlide = () => currentSlide === 0

    const changeSlide: any = (nextOrPrev: NextOrPrevArgType) => {
        console.log("changeSlide", nextOrPrev)
        if(nextOrPrev === "next") setCurrentSlide(currentSlide + 1)
        if(nextOrPrev === "prev") setCurrentSlide(currentSlide - 1)
    }

    const transformStyle = {
        transform: `translateX( ${currentSlide * -100}% )`
    }

    return (
        <div className={`slider ${className}`}>
                {React.Children.map(children, child =>
                    <div style={transformStyle} className={`slider__page`}>
                        { React.cloneElement(child) }
                    </div>)}
            {!isFirstSlide() && <div onClick={() => changeSlide("prev")} className="carousel-control carousel-control-prev">
                <span className="carousel-control-prev-icon"/>
            </div>}
            {!isLastSlide() && <div onClick={() => changeSlide("next")} className="carousel-control carousel-control-next">
                <span className="carousel-control-next-icon"/>
            </div>}
        </div>
    )
}


export default React.forwardRef(Slider)