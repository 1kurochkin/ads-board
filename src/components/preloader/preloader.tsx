import React from "react";
import "./preloaderStyle.css";

type PreloaderPropsType = {
    className?: string
}

const Preloader = (props: PreloaderPropsType) => {
    const {className} = props

    return (
        <span className={`cssload-loader ${className}`}>
            <span className="cssload-loader-inner"/>
        </span>
    )
}

export default React.memo(Preloader)