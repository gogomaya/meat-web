"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {Accordion, AccordionDetails, AccordionSummary, Badge, Box, Button, Collapse, Divider, Drawer, IconButton, InputAdornment, InputBase, Menu, MenuList, TextField, Typography} from "@mui/material"
import Users from "@/components/users/users"
import {User} from "@/types/usersTypes"
import {commonServices} from "@/services/commonServices"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import {usersServices} from "@/services/usersServices"
import {useRouter} from "next/navigation"


const MainLayout = ({
  children,
  user
}: {
  children: React.ReactNode
  user: User
}) => {
  const [cartProductsLength, setCartProductsLength] = useState(0)
  const [headerOpacity, setHeaderOpacity] = useState(1)
  const userStatus = user.user_pk ? true : false
  useEffect(() => {
    const getCartProducts = () => {
      const cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")
      return cartProducts.length
    }
    setCartProductsLength(getCartProducts())
    const onMessage = (event: MessageEvent<any>) => {
      if (event.data.cartProductsLength) {
        setCartProductsLength(getCartProducts())
      }
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const headerHeight = document.getElementById("header")?.clientHeight || 0
      const maxOpacity = 0.7
      const opacity = scrollPosition === 0 ? 1 : maxOpacity
      setHeaderOpacity(opacity)
    }
    window.addEventListener("message", onMessage)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("message", onMessage)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [open, setOpen] = useState(false)
  const handleLinkClick = () => {
    window.postMessage({loginPopup: "on"}, "*")
    setOpen(false)
  }

  return (
    <div className="mx-auto">
      <header
        id="header"
        className="p-4 sticky top-0 z-20 bg-cover bg-center bg-opacity-90 w-full flex items-center md:px-10 transition-opacity -300 border-b border-yellow-200"
        style={{
          backgroundImage: "url('/images/Bg_3.png')",
          backgroundPosition: "center calc(50% - 38px)",
          opacity: headerOpacity,
          backgroundPositionX: "45%",
          backgroundPositionY: "68%"
        }}
      >
        <MainMobileMenu user={user} />
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt=""
            width={32}
            height={32}
            sizes="100vw"
            className="md:w-16"
            priority
          />
        </Link>
        <MegaMenu user={user} />
        <div className="flex items-center gap-2.5">
          <MainSearch />
          <Users user={user} />
          {userStatus ? (
            <Link href="/carts" className="text-black">
              <Badge badgeContent={cartProductsLength} color="warning">
                <ShoppingCartIcon className="md:w-8 md:h-8" />
              </Badge>
            </Link>
          ) : (
            <Badge badgeContent={0} color="warning">
              <ShoppingCartIcon onClick={handleLinkClick} className="md:w-8 md:h-8" />
            </Badge>
          )}
        </div>
      </header>
      <main>{children}</main>
      <CsIcon />
      <MainBottom />
    </div>
  )
}

export default MainLayout


export const CsIcon = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setIsVisible(scrollTop > 100)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className={`fixed bottom-28 z-1000 right-6 gap-2 flex flex-col justify-center items-center ${isVisible ? "visible" : "hidden"}`}>
      <button onClick={scrollToTop} className="p-1 rounded-full flex items-center justify-center w-16 h-16">
        <ExpandLessIcon style={{fontSize: "32px"}} />
      </button>
      <Link href="http://pf.kakao.com/_xeDxgxkG">
        <Image
          src="/images/quick_kakao.png"
          alt=""
          width={40}
          height={40}
          sizes="100vw"
          className="md:w-16"
          priority
        />
      </Link>
      <Link href="https://www.ilogen.com/web/personal/tkSearch">
        <Image
          src="/images/quick_shipping.png"
          alt=""
          width={40}
          height={40}
          sizes="100vw"
          className="md:w-16"
          priority
        />
      </Link>
    </div>
  )
}

export const MegaMenu = ({user}: {user: User}) => {
  const getMenu = () => {
    return {
      todayMenu: false,
      megaMenu: false,
      giftSet: false,
      cow: false,
      imported: false,
      pork: false,
      simple: false,
      review: false,
      board: false
    }
  }

  const [menu, setMenu] = useState(getMenu())

  const overMenu = (event: { currentTarget: { id: any } }) => {
    setMenu({...getMenu(), [event.currentTarget.id]: true})
  }

  const outMenu = () => {
    setMenu(getMenu())
  }
  const categoriesMenu = commonServices.categoriesMenu()
  return (
    <nav id="header" className="invisible md:visible flex-1 flex justify-center items-center">
      <ul className="flex">
        <li style={{width: "140px"}} id="giftSet" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=giftSet" className="text-black">선물세트</Link>
          <ol id="submenu" onMouseOut={outMenu} className={`w-full px-4 py-2 border border-[#FACC15] ${menu.giftSet || menu.todayMenu || menu.cow || menu.pork || menu.simple || menu.imported || menu.board ? "block" : "hidden"}  rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            <div className="flex">
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.giftSet.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=giftSet&category_menu=${category_menu}`} className="text-black px-2">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.cow.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=cow&category_menu=${category_menu}`} className="text-black px-2">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.pork.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=pork&category_menu=${category_menu}`} className="text-black">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.imported.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=imported&category_menu=${category_menu}`} className="text-black">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.simple.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=simple&category_menu=${category_menu}`} className="text-black">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                <li><Link href="/boards?category=notice" className="text-black">공지사항</Link></li>
                <li><Link href="/faq" className="text-black">자주하는질문</Link></li>
                <li><Link href="/boards?category=qna" className="text-black">문의하기</Link></li>
              </div>
            </div>
          </ol>
        </li>
        <li style={{width: "140px"}} id="cow" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=cow" className="text-black">소고기🐮</Link>
        </li>
        <li style={{width: "140px"}} id="pork" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=pork" className="text-black">돼지고기🐷</Link>
        </li>
        <li style={{width: "140px"}} id="imported" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=imported" className="text-black">수입육</Link>
        </li>
        <li style={{width: "140px"}} id="simple" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=simple" className="text-black">간편식</Link>
        </li>
        <li style={{width: "140px"}} id="board" className="relative" onMouseOver={overMenu} >
          <Link href="/boards" className="text-black">고객센터</Link>
        </li>
        {user.is_admin ? (
          <li style={{width: "140px"}} id="board" className="relative" onMouseOver={overMenu}>
            <Link href="/admin" className="text-black">관리자</Link>
          </li>
        ) : null}
        {/* 관리자 페이지 연결 */}
      </ul>
    </nav>
  )
}

export const loading = () => {
  return (
    <div data-w-id="10b5160c-e47e-9440-7d20-e9b9b40a9855" className="preloader">
      <div className="preloader-lottie-animation" data-w-id="10b5160c-e47e-9440-7d20-e9b9b40a9856" data-animation-type="lottie" data-src="https://assets-global.website-files.com/6564340f7b64a3bebf176e50/65704989fc28f3d8c4a2d42b_Zaisop%20Logo.json" data-loop="0" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="1.5833333333333333" data-duration="0"></div>
    </div>
  )
}

const MainSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showSearch, setShowSearch] = useState<boolean>(false)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const router = useRouter()

  const handleButtonClick = () => {
    if (showSearch) {
      if (searchTerm) {
        router.push(`/search?query=${searchTerm}`)
      } else {
        setShowSearch(false)
      }
    } else {
      setShowSearch(true)
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick()
    }
  }

  return (
    <div className="flex items-center">
      {!showSearch && (
        <IconButton onClick={handleButtonClick}>
          <SearchIcon style={{color: "black"}}/>
        </IconButton>
      )}
      <Collapse in={showSearch} timeout="auto" unmountOnExit>
        <Box ml={2}>
          <TextField
            variant="outlined"
            placeholder="검색어를 입력해주세요."
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleButtonClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                height: "32px",
                padding: "0 14px",
                fontSize: "0.875rem"
              }
            }}
            sx={{
              width: "330px",
              backgroundColor: "white",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              ".MuiOutlinedInput-root": {
                height: "42px",
                minHeight: "42px"
              },
              ".MuiOutlinedInput-input": {
                padding: "0",
                fontSize: "0.875rem"
              }
            }}
          />
        </Box>
      </Collapse>
    </div>
  )
}

const MainMobileMenu = ({user}: { user: User }) => {
  const [open, setOpen] = useState(false)
  const categoriesMenu = commonServices.categoriesMenu()

  const handleLinkClick = () => {
    window.postMessage({loginPopup: "on"}, "*")
    setOpen(false)
  }

  return (
    <div className="flex items-center">
      <IconButton
        style={{display: "none", color: "black"}}
        className="!block md:!hidden gap-3"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className="w-full"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{sx: {width: "100%"}}}
      >
        <Box className="p-4" style={{backgroundImage: "url('/images/Bg_3.png')", backgroundColor: "rgba(255, 255, 255, 0.9)"}}>
          <nav className="py-4">
            <div className="flex justify-end">
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="flex items-center gap-3 px-4">
              {user.user_pk > 0 ? (
                <div className="flex items-center gap-8 p-4">
                  <div>
                    <Image
                      src="/images/cow.png"
                      alt="Logo"
                      width={80}
                      height={80}
                      sizes="100vw"
                      className="md:w-16"
                      priority
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-red-700">
                      <strong>{user.name || user.nickname || "고객"}</strong><span className="text-black">님, 안녕하세요 :)</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <button type="button"
                        className="focus:outline-none text-white bg-yellow-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => window.location.href = "/carts"}
                        style={{marginBottom: "20px", padding: "5px 10px"}}
                      >
                        장바구니
                      </button>
                      <button type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={async () => {
                          await usersServices.usersLogout()
                          setOpen(false)
                          window.location.reload()
                        }}
                        style={{marginBottom: "20px", padding: "5px 10px"}}
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={handleLinkClick}
                    className="px-2 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer"
                  >
                    로그인
                  </div>
                  <div
                    onClick={handleLinkClick}
                    className="px-2 py-2 bg-red-700 text-white rounded-full hover:bg-brown-600 cursor-pointer"
                  >
                    회원가입
                  </div>
                  <div
                    onClick={handleLinkClick}
                    className="px-2 py-2 bg-gray-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer">
                    {/* 모바일 비회원도 주문할 수 있도록 장바구니로 가기 */}
                      장바구니
                  </div>
                </>
              )}
              <span className="flex-1"></span>
            </div>
          </nav>
          <nav>
            <ul className="items-center p-8">
              <li>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Link href="/products?category=giftSet">선물세트</Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      {categoriesMenu.giftSet.map((category_menu) => (
                        <li key={category_menu}>
                          <Link href={`/products?category=giftSet&category_menu=${category_menu}`}>{category_menu}</Link>
                        </li>
                      ))}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Link href="/products?category=cow">소고기</Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      {categoriesMenu.cow.map((category_menu) => (
                        <li key={category_menu}>
                          <Link href={`/products?category=cow&category_menu=${category_menu}`}>{category_menu}</Link>
                        </li>
                      ))}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Link href="/products?category=pork">돼지고기</Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      {categoriesMenu.pork.map((category_menu) => (
                        <li key={category_menu}>
                          <Link href={`/products?category=pork&category_menu=${category_menu}`}>{category_menu}</Link>
                        </li>
                      ))}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Link href="/products?category=simple">간편식</Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      {categoriesMenu.simple.map((category_menu) => (
                        <li key={category_menu}>
                          <Link href={`/products?category=simple&category_menu=${category_menu}`}>{category_menu}</Link>
                        </li>
                      ))}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Link href="/products">고객센터</Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      <li><Link href="/boards?category=notice">공지사항</Link></li>
                      <li><Link href="/faq">자주하는질문</Link></li>
                      <li><Link href="/boards?category=qna">문의하기</Link></li>
                    </ol>
                  </AccordionDetails>
                </Accordion>
              </li>
            </ul>
          </nav>
        </Box>
      </Drawer>
      <IconButton className="flex md:!hidden">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={32}
            height={32}
            sizes="100vw"
            className="md:w-16"
            priority
          />
        </Link>
      </IconButton>
      {/* <SearchBar /> */}
    </div>
  )
}


// const SearchBar = () => {
//   return (
//     <section className="flex items-center bg-white shadow-lg rounded-full p-2">
//       <InputBase
//         className="flex-1 ml-3 text-gray-700 placeholder-gray-500 focus:outline-none"
//         placeholder="검색어를 입력해주세요."
//       />
//       <IconButton type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none">
//         <SearchIcon />
//       </IconButton>
//     </section>
//   )
// }

const MainBottom = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <section
      className="section footer bg-cover bg-center bg-no-repeat border border-yellow-200 px-8"
      style={{
        backgroundImage: "url(\"/images/Bg_3.png\")",
        boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="bg-transparent p-4 md:p-12">
        <div className="flex footer-menu-link space-x-4">
          <Link href={"https://smartstore.naver.com/hansolmeat1534"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-black whitespace-nowrap">회사소개</div>
          </Link>
          <Link href={"/faq"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-black whitespace-nowrap">이용안내</div>
          </Link>
          <Link href={"/policy"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-black whitespace-nowrap">이용약관</div>
          </Link>
          <Link href={"/policy"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-black whitespace-nowrap">개인정보처리방침</div>
          </Link>
        </div>
        <style jsx>{`
          .footer-menu-content {
            white-space: nowrap;
          }
        `}</style>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-2xl font-bold text-black" style={{textAlign: "left"}}>
          (주) 한솔축산
          </div>
          <div className="mt-6 md:mt-0 flex justify-center w-full md:w-auto">
            <Link href="/home">
              <Image
                src="/images/logo.png"
                alt="한솔축산 로고"
                width={60}
                height={60}
                sizes="100vw"
                className="w-20 h-20 md:w-24 md:h-24 cursor-pointer"
                priority
                onClick={scrollToTop}
              />
            </Link>
          </div>
        </div>
        <div className="footer-left space-y-4 mt-6">
          <div className="footer-info text-lg leading-loose text-black" style={{fontFamily: "Arial, sans-serif"}}>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">대표자</span> | 한승구, 박수현
            </span>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">주소</span> | 대전 서구 둔산3동 1862번지 1층
            </span>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">사업자등록번호</span> | 405-98-61344
            </span>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">통신판매업신고 번호</span> | 2022-대전서구-0556호
            </span>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">이메일</span> | whddlrs1@naver.com
            </span>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">전화</span> | 042-471-1534
            </span>
          </div>
          <div className="footer-info-detail block">
            <span className="text-style-1 text-black">
            © 2024 한솔. All right reserved.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

