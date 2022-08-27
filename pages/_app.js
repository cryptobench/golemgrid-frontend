import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <div>
      <SessionProvider session={session}>
        <NextNProgress color="#0c14d4" />

        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default MyApp
