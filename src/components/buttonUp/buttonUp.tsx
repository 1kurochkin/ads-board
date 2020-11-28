import React, {useEffect, useState} from 'react';
import "./buttonUpStyles.css"
import Button from '../button/button';


const ButtonUp = (props: any) => {

    const [isView, setIsView] = useState(false)

    useEffect(() => {
        document.addEventListener("scroll", onScrollHandler)
        return () => document.removeEventListener("scroll", onScrollHandler)
    }, [])

    const onScrollHandler = (event: Event) => {
        const currentHeight = Math.ceil(window.innerHeight + window.scrollY)
        const innerHeight = window.innerHeight
        currentHeight < innerHeight + 300 ? setIsView(false) : setIsView(true)
    }

  return isView ?
      <Button svgIconName={"arrowUo"} className={"btn-up btn-primary"} label={"Наверх"}
              onClickHandler={() => window.scrollTo(0,0)} /> : null
}

export default ButtonUp;