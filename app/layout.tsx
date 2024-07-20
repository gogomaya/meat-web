import type {Metadata} from "next"
import "./globals.css"
import Backdrop from "@/components/common/Backdrop"
import Toast from "@/components/common/Toast"
import {Noto_Serif_KR} from "next/font/google"
import {ChannelIOComponent} from "./channelIo"

const notoSerifKr = Noto_Serif_KR({
  weight: ["500"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "한솔축산",
  description: "한솔축산"
}

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
        {/* 모바일 가로스크롤 방지 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"></meta>
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="minimum-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no" name="viewport" />
        {/* 구글 사이트 등록 */}
        <meta name="google-site-verification" content="j44_zipfpz0VmBMAcic04MKOShkonDN8RxjpYfUyqzs" />
      </head>
      <body
        className={`${notoSerifKr.className} min-w-80 overflow-x-hidden`}
      >
        <Backdrop />
        <Toast />
        {children}
        <ChannelIOComponent />
        {/* <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6564340f7b64a3bebf176e50" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> */}
        {/* <script src="https://assets-global.website-files.com/6564340f7b64a3bebf176e50/js/webflow.277fd9a98.js" type="text/javascript"></script> */}
      </body>
    </html>
  )
}

export default RootLayout
