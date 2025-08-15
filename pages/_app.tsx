import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/components/auth/AuthProvider";
import BackgroundFlowers from "@/components/BackgroundFlowers";
import localFont from 'next/font/local'
import Head from 'next/head'

const snoopyFont = localFont({
  src: '../snoopy_reg-webfont.otf',
  weight: '400',
  style: 'normal',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className={snoopyFont.className}>
        <BackgroundFlowers />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
