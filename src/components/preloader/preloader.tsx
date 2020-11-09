import React from "react";
import "./preloaderStyle.css";

const Preloader = (props: any) => {
    const {className} = props

    return (
    <span className={`cssload-loader ${className}`}>
        <span className="cssload-loader-inner"/>
    </span>
    )
}

export default React.memo(Preloader)