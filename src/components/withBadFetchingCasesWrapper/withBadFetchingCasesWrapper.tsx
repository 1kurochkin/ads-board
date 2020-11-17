import React from 'react';
import Preloader from "../preloader/preloader";
import AlertEmptyResponse from "../alertEmptyResponse/alertEmptyResponse";
import AlertErrorFetching from "../alertErrorFetching/alertErrorFetching";
import {useSelector} from "react-redux";
import {
    getIsEmptyResponseMainStateSelector, getIsErrorFetchMainStateSelector,
    getIsFetchingMainStateSelector
} from "../../redux/reducers/mainState/mainStateSelectors";

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

    const isFetchingRedux = useSelector(getIsFetchingMainStateSelector)
    const isEmptyResponseRedux = useSelector(getIsEmptyResponseMainStateSelector)
    const isErrorFetchingRedux = useSelector(getIsErrorFetchMainStateSelector)

    const {
        preloader = <Preloader/>,
        alertEmptyResponse = <AlertEmptyResponse/>,
        alertErrorFetching = <AlertErrorFetching/>,
        isErrorFetching = isErrorFetchingRedux,
        isFetching = isFetchingRedux,
        isEmptyResponse = isEmptyResponseRedux,
        children = null
    } = props

  return (
      isFetching ?
          <>{children}{preloader}</> :
          isErrorFetching ?
              alertErrorFetching :
              isEmptyResponse ?
                  alertEmptyResponse :
                  children
  )
}

export default WithBadFetchingCasesWrapper;
