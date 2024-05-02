import type {Metadata} from "next"
import "./globals.css"
import Backdrop from "@/components/common/Backdrop"
import Toast from "@/components/common/Toast"

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
      <body className="min-w-80">
        <Backdrop />
        <Toast />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
