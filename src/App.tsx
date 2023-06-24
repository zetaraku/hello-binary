import * as React from 'react'
import { css } from '@emotion/react'
import HelloFloat32 from './pages/HelloFloat32'

const App: React.FunctionComponent = () => {
  return (
    <div>
      <header>

      </header>
      <main
        css={css`
          margin-bottom: 48px;
          min-height: calc(100vh - 48px - 36px);
        `}
      >
        <HelloFloat32 />
      </main>
      <footer
        css={css`
          background-color: #f5f5f5;
          text-align: right;
          padding: 6px 16px;
        `}
      >
        <a href="https://www.free-counter.jp/" css={{ marginRight: '6px' }}>
          <img src="https://www.f-counter.net/j/49/1670247597/" alt="アクセスカウンター" />
        </a>
        <span>
          © 2022 / made by @zetaraku with 🧐
        </span>
      </footer>
    </div>
  )
}

export default App
