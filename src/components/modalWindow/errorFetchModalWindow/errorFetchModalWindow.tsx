import React from 'react';
import AlertModalWindow from '../alertModalWindow/alertModalWindow';
import useFetchState from "../../../hooks/useFetchState";

export type ErrorModalType = {
}

const ErrorFetchModalWindow = (props: ErrorModalType) => {

  const {setIsErrorFetch, isErrorFetching}= useFetchState()

  const errorModalWindow = <AlertModalWindow isActiveFromProps={true} alertText={"Возникла ошибка при отправке запроса!"}
                                             btnOneConfiguration={{btnOneLabel: "Закрыть", btnOneHandler:() => setIsErrorFetch(false) }}/>

  return isErrorFetching ? errorModalWindow : null

}

export default ErrorFetchModalWindow;
