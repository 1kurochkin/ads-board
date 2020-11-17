import React from 'react';

type AlertEmptyResponsePropsType = {
  alertText?: string
  className?: string
}

const AlertErrorFetching: React.FC<AlertEmptyResponsePropsType> = (props) => {
  const {className, alertText = "При отправке запроса возникла ошибка, попробуйте еще раз!!"} = props

  return (
          <div className={`alert alert-danger text-center ${className}`}>
            {alertText}
          </div>
  )
}

export default AlertErrorFetching;