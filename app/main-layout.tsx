"use client"
import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {Accordion, AccordionDetails, AccordionSummary, Badge, Box, Divider, Drawer, IconButton, InputBase, Menu, MenuList, Typography} from "@mui/material"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <header id="header" className="fixed top-0 z-10 bg-white w-full max-w-screen-xl flex justify-center items-center px-4"
        style={{backgroundColor: "rgba(255, 255, 255, 0.88)"}}>
        <MainMobileMenu />
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
        <MegaMenu />
        <MainSearch />
        <IconButton className="hidden md:block p-0">
        </IconButton>
        <Link href="/users/login">
          <PersonOutlineIcon className="md:w-8 md:h-8" />
        </Link>
        <Link href="/carts">
          <Badge badgeContent={4} color="primary">
            <WorkOutlineIcon className="md:w-8 md:h-8" />
          </Badge>
        </Link>
      </header>
      <main className="pt-8 md:pt-16">{children}</main>
      <MainBottom />
    </div>
  )
}

export default MainLayout

const MegaMenu = () => {
  const getMenu = () => {
    return {
      todayMenu: false,
      cow: false,
      fork: false,
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

  return (
    <nav id="header" className="invisible md:visible flex-1 flex justify-center items-center">
      <ul className="flex">
        <li id="todayMenu" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">오늘의 메뉴</Link>
          <ol id="submenu"className={`w-20 absolute border border-black ${menu.cow || menu.todayMenu || menu.fork || menu.simple || menu.review || menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">오늘의 특식</Link></li>
            <li><Link href="#">오늘의 샐러드</Link></li>
          </ol>
        </li>
        <li id="cow" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">소고기</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.cow || menu.todayMenu || menu.fork || menu.simple || menu.review || menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">특수모듬</Link></li>
            <li><Link href="#">육회/사시미</Link></li>
          </ol>
        </li>
        <li id="fork" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">돼지고기</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.cow || menu.todayMenu || menu.fork || menu.simple || menu.review || menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">한돈</Link></li>
            <li><Link href="#">생삼겹살</Link></li>
          </ol>
        </li>
        <li id="simple" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">간편식</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.cow || menu.todayMenu || menu.fork || menu.simple || menu.review || menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">곰탕&머릿고리</Link></li>
            <li><Link href="#">수육</Link></li>
          </ol>
        </li>
        <li id="review" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/reviews">리뷰</Link>
          <ol id="submenu" className={`w-20 absolute border border-black ${menu.cow || menu.todayMenu || menu.fork || menu.simple || menu.review || menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">고객 리뷰</Link></li>
            <li><Link href="#">전문가 리뷰</Link></li>
          </ol>
        </li>
        <li id="board" className="relative mx-3" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/boards">고객센터</Link>
          <ol id="submenu" className={`w- absolute border border-black ${menu.cow || menu.todayMenu || menu.fork || menu.simple || menu.review || menu.board ? "block" : "hidden"} bg-white py-2 rounded-lg shadow-md text-sm font-semibold`}>
            <li><Link href="#">공지사항</Link></li>
            <li><Link href="#">자주하는질문</Link></li>
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
  return <>
    <IconButton className="md:hidden" onClick={() => setOpen(true)}>
      <MenuIcon />
    </IconButton>
    <Drawer
      className="w-full"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{sx: {width: "100%"}}}
    >
      <Box className="p-8">
        <nav className="flex items-center">
          <Link href="/users/login">로그인</Link>
          <Link href="/users/sign-up">회원가입</Link>
          <span className="flex-1"></span>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon/>
          </IconButton>
        </nav>
        <SearchBar />
        <nav>
          <ul>
            <li>
              <Accordion>
                <AccordionSummary>
                  <Link href="/products">오늘의 메뉴</Link>
                </AccordionSummary>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Link href="/products">소고기</Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ol>
                    <li><Link href="#">특수모듬</Link></li>
                    <li><Link href="#">육회/사시미</Link></li>
                  </ol>
                </AccordionDetails>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Link href="/products">돼지고기</Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ol>
                    <li><Link href="#">한돈</Link></li>
                  </ol>
                </AccordionDetails>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Link href="/products">간편식</Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ol>
                    <li><Link href="#">곰탕&머릿고리</Link></li>
                    <li><Link href="#">수육</Link></li>
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
                    <li><Link href="#">자주하는질문</Link></li>
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
    <section className="flex">
      <InputBase
        className="flex-1"
        placeholder="검색어를 입력해주세요."
      />
      <IconButton type="button">
        <SearchIcon />
      </IconButton>
    </section>
  )
}

const MainBottom = () => (
  <footer className="mt-4">
    <section className="px-1 py-2">
      <div className="flex mt-4 flex-col md:flex-row gap-5">
        <div className="w-full md:w-[50%] bg-gray-200 rounded-lg p-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div>
              <h3 className="text-center">한솔축산<br></br>서비스 안내</h3>
              <a href="tel:1588-8888" className="text-center block">1588-8888</a>
            </div>
            <HelpOutlineIcon className="w-12 h-12"/>
          </div>
          <p className="text-center">운영시간</p>
          <p className="text-center">(점심시간 12:00 ~ 13:00)</p>
          <div className="flex justify-center item-center gap-2 mt-2">
            <button className="w-full lg:w-[20.3%] bg-white rounded-lg text-center">1:1문의</button>
            <button className="w-full lg:w-[20.3%] bg-white rounded-lg text-center">자주하는 질문</button>
          </div>
        </div>
        <div className="w-full md:w-[50%] bg-gray-300 rounded-lg p-4 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div>
              <h3 className="text-center">고객센터</h3>
              <a href="tel:1588-8888" className="text-center block">1588-8888</a>
            </div>
            <SupportAgentIcon className="w-12 h-12" />
          </div>
          <p className="text-center">운영시간</p>
          <p className="text-center">(점심시간 12:00 ~ 13:00)</p>
          <div className="flex justify-center item-center gap-2 mt-2">
            <button className="w-full lg:w-[20.3%] bg-white rounded-lg text-center">1:1문의</button>
            <button className="w-full lg:w-[20.3%] bg-white rounded-lg text-center">자주하는 질문</button>
          </div>
        </div>
      </div>
    </section>
    <Divider className="mt-4" sx={{border:"1px solid secondary"}}/>
    <section className="mt-8 p-5 bg-gray-200 text-sm flex flex-col-reverse md:flex-row items-start justify-between">
      <div className="mb-4 md:mb-0">
        <ul className="flex flex-col md:flex-row gap-3">
          <li>회사소개</li>
          <li>이용안내</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
        </ul>
        <h1 className="mt-4 mb-4"><strong>(주)한솔축산</strong></h1>
        <ul className="flex flex-col md:flex-row gap-3">
          <li>서울특별시 강남구 도곡동 115-15</li>
          <li>대표이사 | 김김김</li>
          <li>사업자등록번호 | 123123-123123123</li>
          <li>통신판매업신고번호 | 1231231-123123</li>
        </ul>
        <ul className="flex flex-col md:flex-row gap-3">
          <li>이메일 naver@naver.com</li>
          <li>전화번호 02-020-02020</li>
        </ul>
        <p className="mb-3">© 2024 한솔. All right reserved.</p>
      </div>
      <div>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={90}
            sizes="100vw"
          />
        </Link>
      </div>
    </section>
  </footer>
)
