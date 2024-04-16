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
import {Accordion, AccordionDetails, AccordionSummary, Badge, Box, Drawer, IconButton, InputBase, Menu, MenuList} from "@mui/material"

const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <header className="fixed top-0 z-10 bg-white w-full max-w-screen-xl flex justify-center items-center">
        <MainMobileMenu />
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="md:w-16"
            priority
          />
        </Link>
        <MainMenu />
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

const MainMenu = () => {
  const getMenu = () => {
    return {
      cow: false,
      fork: false,
      simple: false,
      board: false
    }
  }
  const [menu, setMenu] = useState(getMenu())
  const overMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    setMenu({...getMenu(), [event.currentTarget.id]: true})
  }
  const outMenu = () => {
    setMenu(getMenu())
  }
  return (
    <nav className="invisible md:visible flex-1 flex justify-center items-center">
      <ul className="flex">
        <li>
          <Link href="/products">오늘의 메뉴</Link>
        </li>
        <li id="cow" className="relative" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">소고기</Link>
          <ol className={`w-32 absolute border border-black ${menu.cow ? "" : "hidden"}`}>
            <li><Link href="/products">특수모듬</Link></li>
            <li><Link href="#">육회/사시미</Link></li>
          </ol>
        </li>
        <li id="fork" className="relative" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">돼지고기</Link>
          <ol className={`w-32 absolute border border-black ${menu.fork ? "" : "hidden"}`}>
            <li><Link href="#">한돈</Link></li>
          </ol>
        </li>
        <li id="simple" className="relative" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/products">간편식</Link>
          <ol className={`w-32 absolute border border-black ${menu.simple ? "" : "hidden"}`}>
            <li><Link href="#">곰탕&머릿고리</Link></li>
            <li><Link href="#">수육</Link></li>
          </ol>
        </li>
        <li>
          <Link href="/reviews">리뷰</Link>
        </li>
        <li id="board" className="relative" onMouseOver={overMenu} onMouseOut={outMenu}>
          <Link href="/boards">고객센터</Link>
          <ol className={`w-32 absolute border border-black ${menu.board ? "" : "hidden"}`}>
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
  <footer>
    <section>
      <ul>
        <li className="inline-block w-full text-center lg:w-[25%]">CALL CENTER</li>
        <li className="inline-block w-full text-center lg:w-[25%]">PARTNERSHIP</li>
        <li className="inline-block w-full text-center lg:w-[25%]">RETURNS & EXCHANGES</li>
        <li className="inline-block w-full text-center lg:w-[25%]">SNS</li>
      </ul>
    </section>
    <section>
      <ul className="flex justify-center items-center">
        <li>회사소개</li>
        <li>이용안내</li>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
      </ul>
      <p className="text-center">상호 주식회사 한솔</p>
    </section>
  </footer>
)
