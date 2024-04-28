"use client"
import {useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import Link from "next/link"
import {Paper, Breadcrumbs, Drawer} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
// import {usersServices} from "@/services/usersServices"

const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const logout = async () => {
    // await usersServices.usersLogout()
    router.refresh()
    router.push("/admin")
  }
  return (
    <div className="min-h-full flex">
      <nav><AdminLayoutMenu prefix="lg" /></nav>
      <div className="bg-gray-200 flex-1">
        <Paper>
          <header className="bg-white">
            <nav className="h-12 p-2 flex items-center">
              <AdminLayoutMenuIcon />
              <div className="mr-4">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link href="/admin">
                    관리자
                  </Link>
                  {pathname.includes("/admin/users") && (
                    <span>회원 관리</span>
                  )}
                  {/* {pathname.includes(`/admin/products/${brand_id}`) && (
                    <Link href={`/admin/products/${brand_id}`}>
                      {brands.find((brand) => brand.id === brand_id)?.name}
                    </Link>
                  )} */}
                  {pathname.includes("/admin/boards/shipped") && (
                    <Link href={"/admin/boards/shipped"}>출고제품</Link>
                  )}
                  {pathname.includes("/admin/boards/notice") && (
                    <Link href={"/admin/boards/notice"}>공지사항</Link>
                  )}
                  {/* {(pathname.includes(`/admin/products/${brand_id}/create`) ||
                    (pathname.includes("/admin/boards/") && pathname.includes("/create"))) && (
                    <span>등록</span>
                  )} */}
                  {/* {(pathname.includes(`/admin/products/${brand_id}/detail`) ||
                    (pathname.includes("/admin/boards/") && pathname.includes("/detail"))) && (
                    <span>수정</span>
                  )} */}
                </Breadcrumbs>
              </div>
              <div className="flex-1"></div>
              <LogoutIcon className="cursor-pointer" onClick={logout} />
            </nav>
          </header>
        </Paper>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}

const AdminLayoutMenuIcon = () => {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false)
  return (
    <div className="lg:hidden mr-4">
      <MenuIcon
        className="cursor-pointer"
        onClick={() => setHeaderMenuOpen(true)}
      />
      <Drawer
        anchor="left"
        open={headerMenuOpen}
        onClose={() => setHeaderMenuOpen(false)}
      >
        <AdminLayoutMenu prefix="md" setHeaderMenuOpen={setHeaderMenuOpen} />
      </Drawer>
    </div>
  )
}

const AdminLayoutMenu = ({
  prefix,
  setHeaderMenuOpen
}: {
  prefix: "lg" | "md",
  setHeaderMenuOpen?: Function
}) => {
  const pathname = usePathname()
  return (
    <ul className={`${prefix === "lg" ? "hidden lg:block bg-[#383838] w-[150px] h-full text-gray-400": "w-[300px]"}`}>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/users"
          className={`${pathname.includes("/admin/users") ? "text-yellow-700 " : ""}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >회원 관리</Link>
      </li>
      {/* <li className="px-4 py-2 border-b border-50 lg:border-0">
        <AdminBrands brands={brands} />
      </li> */}
      {/* {brands.map((brand) => (
        <li key={brand.brand_pk} className="px-4 py-2 border-b border-50 lg:border-0">
          <Link
            href={`/admin/products/${brand.id}`}
            className={`${pathname.includes(brand.id) ? "text-yellow-700 " : ""}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
            onClick={() => {
              setTimeout(() => setHeaderMenuOpen?.(), 500)
            }}
          >- {brand.name}</Link>
        </li>
      ))} */}
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/boards/shipped"
          className={`${pathname.includes("/admin/boards/shipped") ? "text-yellow-700 " : ""}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >출고제품</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/boards/notice"
          className={`${pathname.includes("/admin/boards/notice") ? "text-yellow-700 " : ""}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >공지사항</Link>
      </li>
    </ul>
  )
}

export default AdminLayout
