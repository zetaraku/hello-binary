import React from 'react'
import { css } from '@emotion/react'

const App: React.FunctionComponent = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <h1 class="text-red-500">Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p
          css={css`
            color: blue;
          `}
        >
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
