import React, {useEffect} from 'react';

const useOutsideClick = (ref: any, handler: any) => {

    const listener = (event: any) => {
        const popupBox = ref.current
        const target = event.path || ( event.composed && event.composedPath() )
        !target.includes(popupBox) && handler(event);
    }

  useEffect(() => {
        document.addEventListener('click', listener)
        return () => document.removeEventListener('click', listener)
      }, [ref, handler]
  );
}

export default useOutsideClick;
