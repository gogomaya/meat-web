import type {Metadata} from "next"
import "./globals.css"
import Backdrop from "@/components/common/Backdrop"
import Toast from "@/components/common/Toast"
import {Noto_Serif_KR} from "next/font/google"

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
      </head>
      <body
        className={`${notoSerifKr.className} min-w-80`}
      >
        <Backdrop />
        <Toast />
        {children}
        {/* <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6564340f7b64a3bebf176e50" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> */}
        {/* <script src="https://assets-global.website-files.com/6564340f7b64a3bebf176e50/js/webflow.277fd9a98.js" type="text/javascript"></script> */}
      </body>
    </html>
  )
}

export default RootLayout
