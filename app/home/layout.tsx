import MainLayout from "@/app/main-layout"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default Layout
