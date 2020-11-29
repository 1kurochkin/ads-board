import React, {useEffect} from 'react';
import useFetchState from "./useFetchState";

const useInfinityScroll = (handler: Function) => {

    const {isFetching, isEmptyResponse, isErrorFetching} = useFetchState()

    const scrollHandler = (event: any) => {

        const currentHeight = Math.ceil(window.innerHeight + window.scrollY)
        const allHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        )

        if(currentHeight >= allHeight) {
            !isFetching && !isEmptyResponse && !isErrorFetching && handler(event)
        }
    }

  useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
      }, [handler]
  );
}

export default useInfinityScroll;
