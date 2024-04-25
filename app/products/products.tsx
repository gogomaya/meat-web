"use client"
import Image from "next/image"
import Link from "next/link"
import {Box, Button, Divider, FormControl, InputLabel, MenuItem, Pagination, Select, Tab, Tabs, Typography} from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import * as React from "react"
import {useTheme} from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import SwipeableViews from "react-swipeable-views"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

export const ProductsSearch = () => {
  return (
    <section className="flex justify-between items-center">
      <span>상품이 모두 <strong>4</strong>개 있습니다.</span>
      <FormControl>
        <InputLabel>상품정렬</InputLabel>
        <Select
          label="상품정렬"
          className="w-32"
        >
          <MenuItem value="신상품">신상품</MenuItem>
          <MenuItem value="추천순">추천순</MenuItem>
          <MenuItem value="판매량순">판매량순</MenuItem>
        </Select>
      </FormControl>
    </section>
  )
}

export const ProductsPagination = () => {
  return (
    <Pagination
      variant="outlined"
      color="primary"
      count={5}
      page={1}
      className="flex justify-center"
    />
  )
}

export const ProductsList = () => {
  return (
    <ol>
      <li className="p-1 inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Link href="/products/1">
          <Image
            src="/images/main-best-menu1.jpg"
            alt="best-menu1"
            width={0}
            height={0}
            priority
            sizes="100vw"
            className="w-full aspect-square object-cover rounded-lg"
          />
        </Link>
        <p>
          <Link href="/products/1">한우암소 육회&사시미 400g</Link><br />
          <strong>26,000원</strong>
        </p>
      </li>
      <li className="p-1 inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Image
          src="/images/main-best-menu2.jpg"
          alt="best-menu2"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full aspect-square object-cover rounded-lg"
        />
        <p>
          <Link href="/products/1">한우암소 육회&사시미 400g</Link><br />
          <strong>26,000원</strong>
        </p>
      </li>
      <li className="p-1 inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Image
          src="/images/main-swiper2.jpg"
          alt="best-menu3"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full aspect-square object-cover rounded-lg"
        />
        <p>
          <Link href="/products/1">한우암소 육회&사시미 400g</Link><br />
          <strong>26,000원</strong>
        </p>
      </li>
      <li className="p-1 inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Image
          src="/images/main-swiper3.jpg"
          alt="best-menu4"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full aspect-square object-cover rounded-lg"
        />
        <p>
          <Link href="/products/1">한우암소 육회&사시미 400g</Link><br />
          <strong>26,000원</strong>
        </p>
      </li>
    </ol>
  )
}

export const ProductsDetailContent = () => {
  const [quantity, setQuantity] = React.useState(1)
  const pricePerUnit = 69000 // 1개당 가격

  // 수량 변경 핸들러
  const handleQuantityChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity)
    }
  }

  const imageRef = React.useRef<HTMLDivElement | null>(null)

  const ex_mouse_enter = (e: MouseEvent) => {
    const self = imageRef.current

    if (!self) return

    var zoom = 2 // 확대 배율

    const mglass = document.createElement("div")
    mglass.className = "magnifying-glass"

    const mimg = self.querySelector(".img-main")

    // if (checkedDevice() !== "pc") {
    //   addClass(self, "scrollbar")
    //   addClass(mglass, "fill")

    //   const _img = new Image()
    //   _img.onload = function () {
    //     if (!self) return
    //     this.width *= zoom
    //     this.height *= zoom
    //     self.appendChild(mglass)
    //   }
    //   _img.src = mimg?.src || ""
    //   mglass.appendChild(_img)
    // } else {
    //   mglass.style.backgroundImage = `URL('${mimg?.src}')`
    //   mglass.style.backgroundSize = `${mimg?.clientWidth * parseInt(zoom)}px auto`
    //   self.appendChild(mglass)
    // }

    e.stopPropagation()
  }


  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex justify-center items-center ref={imageRef} onMouseEnter={ex_mouse_enter}">
            <Image
              src="/images/main-best-menu1.jpg"
              alt="Product Image"
              width={400}
              height={400}
              priority
              className="figure.ct-img"
            />
          </div>
          <div>
            <Typography variant="h4" gutterBottom>
              한우1++ 모듬구이
            </Typography>
            <Divider className="my-4" sx={{border:"2px solid red", width: "115px"}}/>
            <Typography variant="body1" gutterBottom>
              일본식 커리 소스에 데미그라스 소스가 더해져 깊은 풍미를 가진 하이라이스 위에 부드럽고 바삭한 멘치카츠와 육즙 가득 토네이도 소세지가 구성된 스페셜 하이라이스
            </Typography>
            <Typography variant="h5" gutterBottom>
              가격: {pricePerUnit * quantity}원
            </Typography>
            <Divider className="my-4" />
            <Typography variant="body1" gutterBottom>
              <CheckRoundedIcon />원산지
            </Typography>
            <Typography variant="body1" gutterBottom>
              <CheckRoundedIcon /> 제품중량
            </Typography>
            <Typography variant="body1" gutterBottom>
              <CheckRoundedIcon />100g당
            </Typography>
            <Typography variant="body1" gutterBottom>
              <CheckRoundedIcon />등급
            </Typography>
            <Typography variant="body1" gutterBottom>
              <CheckRoundedIcon />포장방법
            </Typography>
            <div className="flex gap-5 pb-5">
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />수량
              </Typography>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 p-1 border border-gray-300 rounded-md"
                min="1"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="contained" color="primary" className="mr-4">
                장바구니
              </Button>
              <Button variant="contained" color="secondary">
                바로구매
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const ProductDetail = () => {
  return (
    <>
      <Image
        src="/images/products-detail.jpg"
        alt="products-detail"
        width={0}
        height={0}
        priority
        sizes="100vw"
        className="w-full object-cover mt-4"
      />
    </>
  )
}

export const ShipDetail = () => {
  return (
    <div className="py-2 px-4 mt-4">
      <strong>배송/주문/환불 정보</strong>
      <div><Typography>CJ 대한통운으로 배송됩니다</Typography>
        <div>- 배송지역은 제주도 지역을 포함한 도서 산간 지역의 경우 계절에 따라 발송 가능여부가 달라지기 때문에 상세 페이지 참고 부탁드립니다</div>
        <div>- 배송비는 총 결제 금액 50,000원 미만일 경우 3,000원이 추가됩니다</div>
        <div>- 배송일정은 각 상품별로 상이합니다</div>
        <div>- 입금자명이나 입금액이 다를 경우, 고객센터로 연락주시기 바랍니다.</div>
        <div>- 신선제품 특성상 단순 변심에 의한 교환 및 환불은 불가합니다.</div>
        <div>(네이버 페이로 교환/반품을 접수하시더라도 자동 수거가 어렵습니다)</div>
        <div>- 주소와 번호 오류, 부재중으로 인한 미수령 시 교환 반품 불가합니다</div>
        <div>- 상품에 이상이 있을 시 사진이나 영상 보내주시면 빠른 처리 도와드리겠습니다</div>
        <div>- 사용된 쿠폰은 반품, 교환, 환불 등 어떠한 사유에도 재발행이 불가합니다</div>
        <div> 불편한 사항은 언제든지 고객센터로 연락주시면 성심성의껏 답변드리겠습니다.</div>
      </div>
    </div>
  )
}

export const NavDetail = () => {
  // 스크롤 시 fixed되게
  const [isFixed, setIsFixed] = React.useState(false)
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const navElement = document.querySelector(".nav-detail") as HTMLElement

      if (scrollY > navElement.offsetTop) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  // scroll to move id 구현
  // const scrollToElement = (id: string) => {
  //   const element = document.getElementById(id)
  //   if (element) {
  //     element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  //   }
  // }
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 140
      const elementTop = element.getBoundingClientRect().top
      const bodyRect = document.body.getBoundingClientRect().top
      const scrollTo = elementTop - bodyRect - offset
      window.scrollTo({
        top: scrollTo,
        behavior: "smooth"
      })
    }
  }
  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)


  const handleMouseHover = () => {
    setIsHovered(true)
  }

  const handleMouseClick = (menu: string | boolean | ((prevState: boolean) => boolean)) => {
    // setIsClicked(menu)
  }


  return (
    <nav className={`sticky top-16 w-full bg-white z-10 ${isFixed ? "visible" : "invisible md:visible"} flex-1 flex justify-center items-center nav-detail`} style={{height: "80px", backgroundColor: "rgba(255, 255, 255, 0.88)"}}>
      <ul className="flex gap-3">
        {/* <li onClick={() => { scrollToElement("detail"); handleMouseHover(); handleMouseClick("detail") }} className={[isHovered ? "highlight-underline" : "", isClicked === "detail"  ? "text-red-500" : ""].join(" ")}><button>상품상세</button></li>
        <li onClick={() => { scrollToElement("review2"); handleMouseHover(); handleMouseClick("review2") }} className={[isHovered ? "highlight-underline" : "", isClicked === "review2"  ? "text-red-500" : ""].join(" ")}><button>리뷰</button></li>
        <li onClick={() => { scrollToElement("qna"); handleMouseHover(); handleMouseClick("qna") }} className={[isHovered ? "highlight-underline" : "", isClicked === "qna"  ? "text-red-500" : ""].join(" ")}><button>문의</button></li>
        <li onClick={() => { scrollToElement("ship"); handleMouseHover(); handleMouseClick("ship") }} className={[isHovered ? "highlight-underline" : "", isClicked === "ship"  ? "text-red-500" : ""].join(" ")}><button>주문정보 </button></li> */}
      </ul>
    </nav>

  )
}

function checkedDevice() {
  throw new Error("Function not implemented.")
}

function addClass(self: HTMLDivElement, arg1: string) {
  throw new Error("Function not implemented.")
}

