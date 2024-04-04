const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="bg-white">
      <header>헤더</header>
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
