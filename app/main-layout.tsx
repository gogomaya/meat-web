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
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Users from "@/components/users/users"
import {User} from "@/types/usersTypes"
import {commonServices} from "@/services/commonServices"
import HeadsetIcon from "@mui/icons-material/Headset"
import DraftsIcon from "@mui/icons-material/Drafts"
import HomeIcon from "@mui/icons-material/Home"

const MainLayout = ({
  children,
  user
}: {
  children: React.ReactNode
  user: User
}) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <header id="header" className="fixed top-0 z-20 bg-white w-full max-w-screen-xl flex justify-center items-center px-4"
        style={{backgroundColor: "rgba(255, 245, 225, 0.88)"}}>
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
        <MegaMenu />
        <MainSearch />
        <IconButton className="hidden md:block p-0">
        </IconButton>
        <Users user={user} />
        <Link href="/carts">
          <Badge badgeContent={4} color="primary">
            <WorkOutlineIcon className="md:w-8 md:h-8" />
          </Badge>
        </Link>
      </header>
      <main className="pt-8 md:pt-16">{children}</main>
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
    <div className={`fixed bottom-8 right-8 gap-2 flex flex-col justify-center item-center ${isVisible ? "visible" : "hidden"}`}>
      <button onClick={scrollToTop} className="bg-gray-200 p-1 rounded-full flex items-center justify-center w-15 h-15">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      <Link href="https://pf.kakao.com/_anFaG">
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
      <Link href="https://www.cjlogistics.com/ko/tool/parcel/tracking">
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

const MegaMenu = () => {
  const getMenu = () => {
    return {
      todayMenu: false,
      cow: false,
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
        <li id="todayMenu" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products?is_today=true">오늘의 메뉴</Link>
        </li>
        <li id="cow" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products?category=cow">소고기</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.cow ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            {categoriesMenu.cow.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=cow&category_menu=${category_menu}`}>{category_menu}</Link></li>
            ))}
          </ol>
        </li>
        <li id="pork" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products?category=pork">돼지고기</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.pork ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            {categoriesMenu.pork.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=pork&category_menu=${category_menu}`}>{category_menu}</Link></li>
            ))}
          </ol>
        </li>
        <li id="simple" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products?category=simple">간편식</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.simple ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            {categoriesMenu.simple.map((category_menu) => (
              <li key={category_menu}><Link href={`/products?category=simple&category_menu=${category_menu}`}>{category_menu}</Link></li>
            ))}
          </ol>
        </li>
        <li id="review" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/reviews">리뷰</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.review ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">고객 리뷰</Link></li>
            <li><Link href="#">전문가 리뷰</Link></li>
          </ol>
        </li>
        <li id="board" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/boards">고객센터</Link>
          <ol id="submenu" className={`w- absolute border border-black ${menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">공지사항</Link></li>
            <li><Link href="/faq">자주하는질문</Link></li>
          </ol>
        </li>
      </ul>
    </nav>
  )
}


const MainSearch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  return <>
    <Link
      href=""
      className="hidden md:block p-0"
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
  return <>
    <IconButton style={{display: "none"}} className="!block md:!hidden" onClick={() => setOpen(true)}>
      <MenuIcon />
    </IconButton>
    <Drawer
      className="w-full"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{sx: {width: "100%"}}}
    >
      <Box className="p-8">
        <nav className="flex items-center gap-3">
          <Link href="/users/login">로그인</Link>
          <Link href="/users/sign-up">회원가입</Link>
          <span className="flex-1"></span>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon/>
          </IconButton>
        </nav>
        <SearchBar />
        <nav>
          <ul className="flex items-center">
            <li>
              <Accordion>
                <AccordionSummary>
                  <Link href="/products?is_today=true">오늘의 메뉴</Link>
                </AccordionSummary>
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
            <li>
              <Accordion>
                <AccordionSummary>
                  <Link href="/products">리뷰</Link>
                </AccordionSummary>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Link href="/products">고객센터</Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ol>
                    <li><Link href="#">공지사항</Link></li>
                    <li><Link href="/faq">자주하는질문</Link></li>
                  </ol>
                </AccordionDetails>
              </Accordion>
            </li>
          </ul>
        </nav>
      </Box>
    </Drawer>
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
  return (
    <section className="section footer">
      <div className="container">
        <div className="footer-content-wrap">
          <div className="footer-top-wrap">
            <Link href="/"></Link>
            <div className="footer-top-details">한솔축산은 직접 작업하여 적은 유통마진으로 한우 1++ no.9과 한돈을 판매합니다.</div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-menu-wrap">
            <div className="footer-single-menu-wrap _1">
              <div className="footer-menu-link-wrap">
                <a href="https://smartstore.naver.com/hansolmeat1534" className="footer-menu-link">회사 소개</a>
                <Link className="footer-menu-link" href={"/policy"}>이용약관</Link>
                <Link className="footer-menu-link" href={"/policy"}>개인정보처리방침</Link>
              </div>
            </div>
            <div className="footer-single-menu-wrap">
              <div className="footer-pages-menu-link-wrap">
                <div className="footer-menu-link-wrap">
                  <a href="https://zaisop.webflow.io/product/meat-balls" className="footer-menu-link">Product single</a>
                  <a href="/inner-pages/blog" className="footer-menu-link">Blog</a>
                  <a href="https://zaisop.webflow.io/blogs/butcher-is-a-person-who-specializes-in-cutting-preparing-selling-meats-butchers-are-skilled" className="footer-menu-link">blog single</a>
                  <a href="/inner-pages/team" className="footer-menu-link">team</a>
                  <a href="https://zaisop.webflow.io/teams/kagiso-ramos" className="footer-menu-link">team single</a>
                  <a href="/inner-pages/services" className="footer-menu-link">services</a>
                </div>
                <div className="footer-menu-link-wrap">
                  <a href="https://zaisop.webflow.io/services/veal-entrecote" className="footer-menu-link">service single</a>
                  <a href="/authentication/sign-in" className="footer-menu-link">sign in</a>
                  <a href="/authentication/sign-up" className="footer-menu-link">Sign Up</a>
                  <a href="/authentication/forgot-password" className="footer-menu-link">forgot password</a>
                  <a href="/authentication/reset-password" className="footer-menu-link">reset password</a>
                </div>
              </div>
            </div>
            <div className="footer-single-menu-wrap cta">
              <div className="footer-cta-wrap flex justify-center item-center">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt=""
                    width={150}
                    height={150}
                    sizes="100vw"
                    className="md:w-16"
                    priority
                  />
                </Link>
              </div>
              <div className="footer-divider cta"></div>
              <div className="footer-location-wrap">
                <div className="footer-location-single-wrap">
                  <HeadsetIcon/>
                  <div className="footer-details-text">(042) 471-1534</div>
                </div>
                <div className="footer-location-single-wrap">
                  <DraftsIcon />
                  <div className="footer-details-text">whddlr1@naver.com</div>
                </div>
                <div className="footer-location-single-wrap">
                  <HomeIcon />
                  <div className="footer-details-text">대전 서구 둔산3동 1862번지 1층</div>
                </div>
                <div className="footer-location-single-wrap">
                  <div className="footer-details-text">대표자 | 한승구, 박수현</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-divider"></div>
        </div>
      </div>
    </section>
  )
}

