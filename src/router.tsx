import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import IndexPage from './pages/IndexPage'
import HelloFloat32 from './pages/HelloFloat32'
import NotFoundPage from './pages/NotFoundPage'
import ErrorPage from './pages/ErrorPage'

const router = ReactRouterDOM.createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        children: [
          {
            index: true,
            element: <IndexPage />
          },
          {
            path: 'float32',
            element: <HelloFloat32 />
          },
          {
            path: '*',
            element: <NotFoundPage />
          }
        ],
        errorElement: <ErrorPage />
      }
    ]
  }
])

export default router
