/**
 * This is the main App component in a TypeScript React application that provides session management
 * and renders a header component.
 * @param {AppProps}  - - `Component`: This is the main component that will be rendered for each page.
 * @returns The App component is being returned.
 */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Header } from '@/components/header'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <Header/>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
