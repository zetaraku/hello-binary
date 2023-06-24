import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'

const indexData = [
  { title: 'Float32 (Single-precision floating-point format)', to: './float32' }
]

const IndexPage: React.FunctionComponent = () => {
  return (
    <>
      <h1>Index</h1>
      <ul>
        {indexData.map(({ title, to }, index) => (
          <li key={index}>
            <ReactRouterDOM.Link to={to}>
              {title}
            </ReactRouterDOM.Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default IndexPage
