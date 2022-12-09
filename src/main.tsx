import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import * as M from '@mui/material'
import App from './App'
import '@fontsource/roboto/500.css'
import 'virtual:uno.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <M.CssBaseline />
    <App />
  </React.StrictMode>
)
