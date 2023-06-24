import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import * as ReactRouterDOM from 'react-router-dom'
import * as M from '@mui/material'
import router from './router'
import '@fontsource/roboto/500.css'
import 'virtual:uno.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <M.CssBaseline />
    <ReactRouterDOM.RouterProvider router={router} />
  </React.StrictMode>
)
