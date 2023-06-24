import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'

const NotFoundPage: React.FunctionComponent = () => {
  const location = ReactRouterDOM.useLocation()

  return (
    <>
      <h1>404 Not Found</h1>

      <p>The URL <code>{location.pathname}</code> you requested was not found.</p>
    </>
  )
}

export default NotFoundPage
