import 'react'

declare module 'react' {
  interface HTMLAttributes {
    class?: string
    for?: string
  }
}
