import type {Metadata} from "next"
import "./globals.css"

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
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
