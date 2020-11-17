import React from 'react';

type AlertEmptyResponsePropsType = {
  alertText?: string
  className?: string
}

const AlertEmptyResponse: React.FC<AlertEmptyResponsePropsType> = (props) => {
  const {className, alertText = "По вашему запросу ничего не найдено!!"} = props

  return (
          <div className={`alert alert-warning ${className}`}>
            {alertText}
          </div>
  )
}

export default AlertEmptyResponse;