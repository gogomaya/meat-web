"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {Accordion, AccordionDetails, AccordionSummary, Badge, Box, Divider, Drawer, IconButton, InputBase, Menu, MenuList, Typography} from "@mui/material"
import Users from "@/components/users/users"
import {User} from "@/types/usersTypes"
import {commonServices} from "@/services/commonServices"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"


const MainLayout = ({
  children,
  user
}: {
  children: React.ReactNode
  user: User
}) => {
  const [cartProductsLength, setCartProductsLength] = useState(0)
  const [headerOpacity, setHeaderOpacity] = useState(1)

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

  return (
    <div className="mx-auto">
      <header
        id="header"
        className="p-4 sticky top-0 z-20 bg-cover bg-center bg-opacity-90 w-full flex items-center md:py-4 md:px-10 text-white transition-opacity -300 border-b border-white"
        style={{backgroundImage: "url('/images/Bg.png')", backgroundPosition: "center calc(50% - 185px)", opacity: headerOpacity}}
      >
        <MainMobileMenu />
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
        <div className="flex gap-3">
          <MainSearch />
          <Users user={user} />
          <Link href="/carts" className="text-white">
            <Badge badgeContent={cartProductsLength} color="primary">
              <ShoppingCartIcon className="md:w-8 md:h-8" />
            </Badge>
          </Link>
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
      <Link href="http://pf.kakao.com/_NZDHK">
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
        {/* <li style={{width: "140px"}} id="todayMenu" className={`relative ${menu.todayMenu ? "text-red-500" : ""}`} onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products?is_today=true" className="text-red-600">오늘의 메뉴</Link>
        </li> */}
        <li style={{width: "140px"}} id="cow" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=cow" className="text-white">소고기🐮</Link>
          {/* <ol id="submenu" className={`category-menu-flex flex w-30 absolute border border-[#FACC15] ${menu.cow ? "block" : "hidden"} py-2 rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            {categoriesMenu.cow.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=cow&category_menu=${category_menu}`} className="text-white px-2">{category_menu}</Link></li>
            ))}
          </ol> */}
          <ol id="submenu" onMouseOut={outMenu} className={`w-full px-4 py-2 border border-[#FACC15] ${menu.todayMenu || menu.cow || menu.pork || menu.simple || menu.imported || menu.board ? "block" : "hidden"}  rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            <div className="flex">
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.cow.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=cow&category_menu=${category_menu}`} className="text-white px-2">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.pork.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=pork&category_menu=${category_menu}`} className="text-white">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.imported.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=imported&category_menu=${category_menu}`} className="text-white">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                {categoriesMenu.simple.map((category_menu) => (
                  <li key={category_menu}><Link href={`/products?category=simple&category_menu=${category_menu}`} className="text-white">{category_menu}</Link></li>
                ))}
              </div>
              <div className="item" style={{width: "140px"}}>
                <li><Link href="/boards?category=notice" className="text-white">공지사항</Link></li>
                <li><Link href="/faq" className="text-white">자주하는질문</Link></li>
                <li><Link href="/boards?category=qna" className="text-white">문의하기</Link></li>
              </div>
            </div>
          </ol>
        </li>
        <li style={{width: "140px"}} id="pork" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=pork" className="text-white">돼지고기🐷</Link>
          {/* <ol id="submenu" className={`w-18 absolute border border-[#FACC15] ${menu.pork ? "block" : "hidden"} py-2 rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            {categoriesMenu.pork.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=pork&category_menu=${category_menu}`} className="text-white">{category_menu}</Link></li>
            ))}
          </ol> */}
        </li>
        <li style={{width: "140px"}} id="imported" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=imported" className="text-white">수입육</Link>
          {/* <ol id="submenu" className={`w-18 absolute border border-[#FACC15] ${menu.simple ? "block" : "hidden"} py-2 rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            {categoriesMenu.simple.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=simple&category_menu=${category_menu}`} className="text-white">{category_menu}</Link></li>
            ))}
          </ol> */}
        </li>
        <li style={{width: "140px"}} id="simple" className="relative" onMouseOver={overMenu} >
          <Link href="/products?category=simple" className="text-white">간편식</Link>
          {/* <ol id="submenu" className={`w-18 absolute border border-[#FACC15] ${menu.simple ? "block" : "hidden"} py-2 rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            {categoriesMenu.simple.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=simple&category_menu=${category_menu}`} className="text-white">{category_menu}</Link></li>
            ))}
          </ol> */}
        </li>
        {/* <li id="review" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/reviews" className="text-white">리뷰</Link>
          <ol id="submenu" className={`w-18 absolute border border-[#FACC15] ${menu.review ? "block" : "hidden"} py-2 rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            <li><Link href="#" className="text-white">고객 리뷰</Link></li>
            <li><Link href="#" className="text-white">전문가 리뷰</Link></li>
          </ol>
        </li> */}
        <li style={{width: "140px"}} id="board" className="relative" onMouseOver={overMenu} >
          <Link href="/boards" className="text-white">고객센터</Link>
          {/* <ol id="submenu" className={`w-18 absolute border border-[#FACC15] ${menu.board ? "block" : "hidden"} py-2 rounded-lg shadow-md text-sm font-semibold bg-[#271A11]`}>
            <li><Link href="/boards?category=notice" className="text-white">공지사항</Link></li>
            <li><Link href="/faq" className="text-white">자주하는질문</Link></li>
            <li><Link href="/boards?category=qna" className="text-white">1:1문의하기</Link></li>
          </ol> */}
        </li>
        {user.is_admin ? (
          <li style={{width: "140px"}} id="board" className="relative" onMouseOver={overMenu}>
            <Link href="/admin" className="text-white">관리자</Link>
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  return <>
    <Link
      href=""
      className="hidden md:block p-0 text-white"
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
      }}
    >
      <SearchIcon className="w-[32px] h-[32px]" />
    </Link>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuList>
        <SearchBar />
      </MenuList>
    </Menu>
  </>
}

const MainMobileMenu = () => {
  const [open, setOpen] = useState(false)
  const categoriesMenu = commonServices.categoriesMenu()
  const handleLinkClick = () => {
    window.postMessage({loginPopup: "on"}, "*")
    return
  }
  return <>
    <div className="flex items-center">
      <IconButton style={{display: "none", color:"white"}} className="!block md:!hidden gap-3" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        className="w-full"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{sx: {width: "100%"}}}
      >
        <Box className="p-2">
          <nav>
            <div className="flex items-center gap-3">
              <div onClick={handleLinkClick}>로그인</div>
              <div onClick={handleLinkClick}>회원가입</div>
            </div>
            <span className="flex-1"></span>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon/>
            </IconButton>
          </nav>
          <SearchBar />
          <nav>
            <ul className="items-center">
              {/* <li>
              <Accordion>
                <AccordionSummary>
                  <Link href="/products?is_today=true">오늘의 메뉴</Link>
                </AccordionSummary>
              </Accordion>
            </li> */}
              <li>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Link href="/products?category=cow">소고기</Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol>
                      {categoriesMenu.cow.map((category_menu) => (
                        <li key={category_menu}><Link href={`/products?category=cow&category_menu=${category_menu}`}>{category_menu}</Link></li>
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
                        <li key={category_menu}><Link href={`/products?category=pork&category_menu=${category_menu}`}>{category_menu}</Link></li>
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
                        <li key={category_menu}><Link href={`/products?category=simple&category_menu=${category_menu}`}>{category_menu}</Link></li>
                      ))}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              </li>
              {/* <li>
              <Accordion>
                <AccordionSummary>
                  <Link href="/products">리뷰</Link>
                </AccordionSummary>
              </Accordion>
            </li> */}
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
            alt=""
            width={32}
            height={32}
            sizes="100vw"
            className="md:w-16"
            priority
          />
        </Link>
      </IconButton>
    </div>
  </>
}

const SearchBar = () => {
  return (
    <section className="flex items-center bg-gray-100 rounded-full p-1">
      <InputBase
        className="flex-1 ml-2"
        placeholder="검색어를 입력해주세요."
      />
      <IconButton type="button">
        <SearchIcon />
      </IconButton>
    </section>
  )
}

const MainBottom = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <section
      className="section footer bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(\"/images/Bg.png\")"
      }}
    >
      <div className="bg-transparent p-6 md:p-12 text-white">
        <div className="flex footer-menu-link space-x-4">
          <Link href={"https://smartstore.naver.com/hansolmeat1534"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-white">회사소개</div>
          </Link>
          <Link href={"https://smartstore.naver.com/hansolmeat1534"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-white">이용안내</div>
          </Link>
          <Link href={"/policy"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-white">이용약관</div>
          </Link>
          <Link href={"/policy"}>
            <div className="footer-menu-content cursor-pointer hover:underline text-white">개인정보처리방침</div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-2xl font-bold" style={{textAlign: "left"}}>
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
          <div className="footer-info text-sm leading-loose">
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
              <span className="text-style-1 font-semibold">이메일</span> | whddlrs1@naver.com
            </span>
            <span className="footer-info-detail block">
              <span className="text-style-1 font-semibold">전화</span> | 042-471-1534
            </span>
          </div>
          <div className="footer-info-detail block">
            <span className="text-style-1">
            © 2024 한솔. All right reserved.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

