import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'

const ErrorPage: React.FunctionComponent = () => {
  const error = ReactRouterDOM.useRouteError() as Error

  const errorMessage = ReactRouterDOM.isRouteErrorResponse(error) ? error.statusText : error.message

  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <h1>Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>

      <code>{errorMessage}</code>
    </>
  )
}

export default ErrorPage
