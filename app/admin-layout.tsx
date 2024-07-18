"use client"
import {useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import Link from "next/link"
import {Paper, Breadcrumbs, Drawer, Dialog, DialogTitle, DialogContent, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, DialogActions} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import {usersServices} from "@/services/usersServices"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGift, faCow, faP, faGlobe, faUtensils, faMagic} from "@fortawesome/free-solid-svg-icons"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"


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
  const [open, setOpen] = useState(false)
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
          href="/admin/cancel"
          className={`${pathname.includes("/admin/cancel") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
          onClick={() => {
            setTimeout(() => setHeaderMenuOpen?.(), 500)
          }}
        >취소내역</Link>
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
      <ul className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center">
          <span className="block text-xl font-bold text-white bg-yellow-500 py-2 px-4">
            상품관리
          </span>
          <PlaylistAddIcon
            className="ml-2 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
        {/* 1차메뉴 조정 */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <form onSubmit={(event) => {
            event.preventDefault()
          }}>
            <DialogTitle>메뉴 조정</DialogTitle>
            <DialogContent>
              <div>
                <Paper className="p-4 mb-4 flex justify-between">
                  <TextField
                    autoFocus
                    label="이름"
                    placeholder="한글명"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    className="!ml-4"
                    label="URL 영문주소"
                    placeholder="영문명"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <Button
                    className="!ml-4 !bg-[#1976d2] hover:!bg-[#1565c0]"
                    variant="contained"
                    type="submit"
                  >등록</Button>
                </Paper>
                <Paper className="p-4">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>이름</TableCell>
                          <TableCell>URL 영문주소</TableCell>
                          <TableCell>
                            <Button
                              className="!bg-[#ed6c02] hover:!bg-[#e65100]"
                              variant="contained"
                            >순서 변경</Button>
                          </TableCell>
                          <TableCell>삭제</TableCell>
                        </TableRow>
                      </TableHead>
                      {/* <TableBody>
                        {brands.map((brand, index) => (
                          <TableRow key={brand.brand_pk}>
                            <TableCell>{brand.name}</TableCell>
                            <TableCell>{brand.id}</TableCell>
                            <TableCell>
                              <ArrowCircleUpIcon
                                className={`${index === 0 ? "text-black/20" : "cursor-pointer"}`}
                                onClick={() => {
                                  if (index === 0) return
                                  orderChange(index, -1)
                                }}
                              />
                              <ArrowCircleDownIcon
                                className={`ml-1 ${index === brands.length - 1 ? "text-black/20" : "cursor-pointer"}`}
                                onClick={() => {
                                  if (index === brands.length - 1) return
                                  orderChange(index, 1)
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                className="!bg-[#d32f2f] hover:!bg-[#d32f2f]/[.4]"
                                variant="contained"
                                onClick={() => brandsDelete(brand)}
                              >삭제</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody> */}
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>닫기</Button>
            </DialogActions>
          </form>
        </Dialog>
        <li className="flex items-center px-4 py-2 border-b border-gray-700 lg:border-0">
          <FontAwesomeIcon icon={faGift} className="text-yellow-500 mr-3" />
          <Link
            href="/admin/products/giftSet"
            className={`${pathname.includes("/admin/products/giftSet") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
            onClick={() => {
              setTimeout(() => setHeaderMenuOpen?.(), 500)
            }}
          >
            선물세트
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 border-b border-gray-700 lg:border-0">
          <FontAwesomeIcon icon={faCow} className="text-yellow-500 mr-3" />
          <Link
            href="/admin/products/cow"
            className={`${pathname.includes("/admin/products/cow") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
            onClick={() => {
              setTimeout(() => setHeaderMenuOpen?.(), 500)
            }}
          >
            소고기
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 border-b border-gray-700 lg:border-0">
          <FontAwesomeIcon icon={faMagic} className="text-yellow-500 mr-3" />
          <Link
            href="/admin/products/pork"
            className={`${pathname.includes("/admin/products/pork") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
            onClick={() => {
              setTimeout(() => setHeaderMenuOpen?.(), 500)
            }}
          >
            돼지고기
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 border-b border-gray-700 lg:border-0">
          <FontAwesomeIcon icon={faGlobe} className="text-yellow-500 mr-3" />
          <Link
            href="/admin/products/imported"
            className={`${pathname.includes("/admin/products/imported") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
            onClick={() => {
              setTimeout(() => setHeaderMenuOpen?.(), 500)
            }}
          >
            수입육
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 border-gray-700 lg:border-0">
          <FontAwesomeIcon icon={faUtensils} className="text-yellow-500 mr-3" />
          <Link
            href="/admin/products/simple"
            className={`${pathname.includes("/admin/products/simple") ? "text-yellow-700 " : "text-white "}block no-underline hover:text-yellow-600 text-sm lg:text-base`}
            onClick={() => {
              setTimeout(() => setHeaderMenuOpen?.(), 500)
            }}
          >
            간편식
          </Link>
        </li>
      </ul>
    </ul>
  )
}

export default AdminLayout
