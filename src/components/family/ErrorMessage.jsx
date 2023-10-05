import React from 'react'

const ErrorMessage = ({ error }) => {
  return (
    <div id="feedback" style={{ color: 'red', textAlign: 'left', margin: '2em 0' }} key={error}>❌ {error}</div>
  )
}

export default ErrorMessage
