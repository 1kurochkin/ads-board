import React from 'react';
import Preloader from "../preloader/preloader";
import AlertEmptyResponse from "../alertEmptyResponse/alertEmptyResponse";
import useFetchState from '../../hooks/useFetchState';

type AnnouncementsMappedListType = {
    preloader?: JSX.Element
    alertErrorFetching?: JSX.Element
    alertEmptyResponse?: JSX.Element
    isErrorFetching?: boolean
    isEmptyResponse?: boolean
    isFetching?: boolean
    children: any
}

const WithBadFetchingCasesWrapper = (props: AnnouncementsMappedListType) => {

    const {isFetching:isFetchingRedux, isEmptyResponse:isEmptyResponseRedux, isErrorFetching:isErrorFetchingRedux} = useFetchState()
    const {
        preloader = <Preloader/>,
        alertEmptyResponse = <AlertEmptyResponse/>,
        isFetching = isFetchingRedux,
        isEmptyResponse = isEmptyResponseRedux,
        children = null
    } = props

  return (
      isFetching ?
          <>{children}{preloader}</> :
              isEmptyResponse ?
                  alertEmptyResponse :
                  children
  )
}

export default WithBadFetchingCasesWrapper;
