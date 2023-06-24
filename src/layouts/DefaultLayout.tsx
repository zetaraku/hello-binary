import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import * as M from '@mui/material'
import { css } from '@emotion/react'
import { Icon } from '@iconify/react'

const DefaultLayout: React.FunctionComponent = () => {
  return (
    <>
      <header>
        <div
          css={css`
            color: white;
            background-color: #2e86c1;
            padding: 4px 0;
          `}
        >
          <M.Container maxWidth="xl">
            <ReactRouterDOM.Link
              to="/"
              css={css`
                display: inline-flex;
                align-items: center;
                font-size: 36px;
                color: inherit;
                text-decoration: none;
              `}
            >
              <Icon icon="mdi:memory" css={{ marginRight: '12px' }}/>
              <span>Hello Binary</span>
            </ReactRouterDOM.Link>
          </M.Container>
        </div>
      </header>
      <main
        css={css`
          min-height: calc(100vh - 62px - 54px);
          margin: 40px 0;
        `}
      >
        <M.Container maxWidth="xl">
          <ReactRouterDOM.Outlet />
        </M.Container>
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
    </>
  )
}

export default DefaultLayout
