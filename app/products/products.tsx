"use client"
import Image from "next/image"
import Link from "next/link"
import {Box, Button, Divider, FormControl, InputLabel, MenuItem, Pagination, Select, Tab, Tabs, Typography} from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import * as React from "react"
import {useTheme} from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import SwipeableViews from "react-swipeable-views"

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
      </li>
    </ol>
  )
}

export const ProductsDetailContent = () => {
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 상품 이미지 */}
          <div className="flex justify-center items-center">
            <Image
              src="/images/main-best-menu1.jpg"
              alt="Product Image"
              width={400}
              height={400}
              priority
            />
          </div>
          {/* 상품 정보 */}
          <div>
            <Typography variant="h4" gutterBottom>
            한우1++ 모듬구이
            </Typography>
            <Divider className="my-4" sx={{border:"2px solid red", width: "115px"}}/>
            <Typography variant="body1" gutterBottom>
          일본식 커리 소스에 데미그라스 소스가 더해져 깊은 풍미를 가진 하이라이스 위에 부드럽고 바삭한 멘치카츠와 육즙 가득 토네이도 소세지가 구성된 스페셜 하이라이스
            </Typography>
            <Typography variant="h5" gutterBottom>
            가격: 69,000원
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
            <Typography variant="body1" gutterBottom>
              <CheckRoundedIcon />수량
            </Typography>
            <Button variant="contained" color="primary" className="mr-4">
            장바구니
            </Button>
            <Button variant="contained" color="secondary">
            바로구매
            </Button>
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
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({behavior: "smooth"})
    }
  }
  return (
    <nav className={`sticky top-16 w-full bg-white z-10 ${isFixed ? "visible" : "invisible md:visible"} flex-1 flex justify-center items-center nav-detail`} style={{height: "80px", backgroundColor: "rgba(255, 255, 255, 0.88)"}}>
      <ul className="flex gap-3">
        <li onClick={() => scrollToElement("detail")} className="relative overflow-hidden">
          <button>상품상세</button>
          <span className="highlight-underline"></span>
        </li>
        <li onClick={() => scrollToElement("review")} className="hover:underline"><button>리뷰</button></li>
        <li onClick={() => scrollToElement("qna")} className="hover:underline"><button>문의</button></li>
        <li onClick={() => scrollToElement("ship")} className="hover:underline"><button>주문정보</button></li>
      </ul>
    </nav>

  )
}

