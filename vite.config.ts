import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['react-html-attrs']
      },
      jsxImportSource: '@emotion/react'
    }),
    unocss({
      presets: [
        presetWind()
      ]
    })
  ]
})
