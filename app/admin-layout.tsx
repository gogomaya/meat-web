"use client"
import {useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import Link from "next/link"
import {Paper, Breadcrumbs, Drawer} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import {usersServices} from "@/services/usersServices"

const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const logout = async () => {
    await usersServices.usersLogout()
    router.refresh()
    router.push("/")
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
                  {/* 주문취소, 주문확인 */}
                  {pathname.includes("/admin/orders") && (
                    <Link href={"/admin/orders"}>주문 관리</Link>
                  )}
                  {pathname.includes("/admin/qna") && (
                    <Link href={"/admin/qna"}>문의 관리</Link>
                  )}
                  {pathname.includes("/admin/products/giftSet") && (
                    <Link href={"/admin/products/giftSet"}>선물세트</Link>
                  )}
                  {pathname.includes("/admin/products/cow") && (
                    <Link href={"/admin/products/cow"}>소고기</Link>
                  )}
                  {pathname.includes("/admin/products/pork") && (
                    <Link href={"/admin/products/pork"}>돼지고기</Link>
                  )}
                  {pathname.includes("/admin/products/imported") && (
                    <Link href={"/admin/products/imported"}>수입육</Link>
                  )}
                  {pathname.includes("/admin/products/simple") && (
                    <Link href={"/admin/products/simple"}>간편식</Link>
                  )}
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
    <ul className={`${prefix === "lg" ? "hidden lg:block bg-[#383838] w-[150px] h-full text-white": "w-[300px]"}`}>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/users"
          className={`${pathname.includes("/admin/users") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >회원 관리</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/orders"
          className={`${pathname.includes("/admin/orders") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >주문 관리</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/qna"
          className={`${pathname.includes("/admin/qna") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >문의 관리</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/cancel"
          className={`${pathname.includes("/admin/cancel") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >취소내역</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/products/giftSet"
          className={`${pathname.includes("/admin/products/giftSet") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >선물세트</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/products/cow"
          className={`${pathname.includes("/admin/products/cow") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >소고기</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/products/pork"
          className={`${pathname.includes("/admin/products/pork") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >돼지고기</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/products/imported"
          className={`${pathname.includes("/admin/products/imported") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >수입육</Link>
      </li>
      <li className="px-4 py-2 border-b border-50 lg:border-0">
        <Link
          href="/admin/products/simple"
          className={`${pathname.includes("/admin/products/simple") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >간편식</Link>
      </li>
    </ul>
  )
}

export default AdminLayout
