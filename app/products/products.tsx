"use client"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import * as React from "react"
import ProductSwiper from "./[product_pk]/swiper"
import {Product} from "@/types/productsTypes"
import {SearchParams} from "@/types/commonTypes"

export const ProductsSearch = ({products, searchParams}: {products: Product[], searchParams: SearchParams}) => {
  const router = useRouter()
  return (
    <section className="flex justify-between items-center">
      <span>상품이 모두 <strong>{products.length}</strong>개 있습니다.</span>
      <FormControl>
        <InputLabel>상품정렬</InputLabel>
        <Select
          label="상품정렬"
          className="w-32"
          value={searchParams.orderColumn}
          onChange={(event) => {
            router.push("?" + new URLSearchParams({
              ...searchParams,
              page: "0",
              orderColumn: String(event.target.value)
            }))
          }}
        >
          <MenuItem value="product_pk">신상품</MenuItem>
          <MenuItem value="추천순">추천순</MenuItem>
          <MenuItem value="판매량순">판매량순</MenuItem>
        </Select>
      </FormControl>
    </section>
  )
}

export const ProductsPagination = ({searchParams, total_rows}: {searchParams: SearchParams, total_rows: number}) => {
  const router = useRouter()
  return (
    <Pagination
      variant="outlined"
      color="primary"
      count={Math.ceil(total_rows / searchParams.rowsPerPage)}
      page={searchParams.page + 1}
      className="flex justify-center"
      onChange={(_, value) => {
        router.push("?" + new URLSearchParams({
          ...searchParams,
          page: String(value - 1)
        }))
      }}
    />
  )
}

export const ProductsList = ({products}: {products: Product[]}) => {
  const enlargeImage = (event: { currentTarget: { querySelector: (arg0: string) => { (): any; new(): any; style: { (): any; new(): any; transform: string } } } }) => {
    event.currentTarget.querySelector("img").style.transform = "scale(1.01)"
  }
  const shrinkImage = (event: { currentTarget: { querySelector: (arg0: string) => { (): any; new(): any; style: { (): any; new(): any; transform: string } } } }) => {
    event.currentTarget.querySelector("img").style.transform = "scale(1)"
  }

  return (
    <ol>
      {products.map((product) => (
        <li
          key={product.product_pk}
          className="p-1 inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]"
          onMouseEnter={enlargeImage}
          onMouseLeave={shrinkImage}
        >
          <Link
            href={`/products/${product.product_pk}`}
            className="relative flex items-center justify-center"
          >
            <Image
              src={`/upload-images/products/${product.image_file_name}`}
              alt={product.name}
              width={0}
              height={0}
              priority
              sizes="100vw"
              className={`w-full aspect-square object-cover rounded-lg ${product.is_sold_out ? "opacity-30" : ""}`}
            />
            {product.is_sold_out ? (
              <span className="absolute font-bold">Sold out</span>
            ) : null}
          </Link>
          <p>
            <Link href={`/products/${product.product_pk}`}>{product.name}</Link><br />
            <strong>{product.price.toLocaleString()}원</strong>
          </p>
        </li>
      ))}
    </ol>
  )
}

export const ProductsDetailContent = ({product}: {product: Product}) => {
  const [quantity, setQuantity] = React.useState(1)
  const pricePerUnit = 69000

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

    e.stopPropagation()
  }


  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-">
          <div>
            <ProductSwiper product={product} />
          </div>
          <div>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Divider className="my-4" sx={{border:"2px solid red", width: "115px"}}/>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h5" gutterBottom>
              가격: {product.price.toLocaleString()}원
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.etc}
            </Typography>
            <Divider className="my-4" />
            {product.origin && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />원산지 : {product.origin}
              </Typography>
            )}
            {product.weight && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />제품중량: {product.weight}
              </Typography>
            )}
            {product.type && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />제품유형: {product.type}
              </Typography>
            )}
            {product.part && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />부위: {product.part}
              </Typography>
            )}
            {product.per100g && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />100g당 : {product.per100g}
              </Typography>
            )}
            {product.grade && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />등급 : {product.grade}
              </Typography>
            )}
            {product.package && (
              <Typography variant="body1" gutterBottom>
                <CheckRoundedIcon />포장방법: {product.package}
              </Typography>
            )}
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
            <Divider className="my-4" />
            <Typography variant="h5" gutterBottom className="flex flex-col items-end">
              총금액: {(Number(product.price) * quantity).toLocaleString()}원
            </Typography>
            <Divider className="my-4" />
            <div className="flex flex-col items-end md:flex-row md:items-center md:justify-end md:space-x-4">
              <CartButton />
              <Link href="/order">
                <Button variant="contained" color="secondary" className="btn">
                  구매하기
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-end space-y-4 py-3">
              <Link href="/order">
                <Button>
                  <Image
                    src="/images/naver-pay-btn.png"
                    alt="naver-login-btn"
                    width={180}
                    height={100}
                    sizes="100vw"
                    priority
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const CartButton = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    setOpen(false)
    window.location.href = "/carts"
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className="btn"
        onClick={handleOpen}
      >
        장바구니
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>
            장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            아니오
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export const ProductDetail = ({product}: {product: Product}) => {
  return (
    <div
      className="leading-7 ck-content [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
      dangerouslySetInnerHTML={{__html: product.contents}}
    />
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
  const [isClicked, setIsClicked] = React.useState<boolean | string>(false)



  const handleMouseHover = () => {
    setIsHovered(true)
  }

  const handleMouseClick = (menu: string | boolean | ((prevState: boolean) => boolean)) => {
    // setIsClicked(menu)
  }


  return (
    <nav className={`sticky top-16 w-full bg-white z-10 ${isFixed ? "visible" : "invisible md:visible"} flex-1 flex justify-center items-center nav-detail`} style={{height: "80px", backgroundColor: "rgba(255, 255, 255, 0.88)"}}>
      <ul className="flex gap-3">
        <li onClick={() => { scrollToElement("detail"); handleMouseHover(); handleMouseClick("detail") }} className={[isHovered ? "highlight-underline" : "", isClicked === "detail"  ? "text-red-500" : ""].join(" ")}><button>상품상세</button></li>
        <li onClick={() => { scrollToElement("review2"); handleMouseHover(); handleMouseClick("review2") }} className={[isHovered ? "highlight-underline" : "", isClicked === "review2"  ? "text-red-500" : ""].join(" ")}><button>리뷰</button></li>
        <li onClick={() => { scrollToElement("qna"); handleMouseHover(); handleMouseClick("qna") }} className={[isHovered ? "highlight-underline" : "", isClicked === "qna"  ? "text-red-500" : ""].join(" ")}><button>문의</button></li>
        <li onClick={() => { scrollToElement("ship"); handleMouseHover(); handleMouseClick("ship") }} className={[isHovered ? "highlight-underline" : "", isClicked === "ship"  ? "text-red-500" : ""].join(" ")}><button>주문정보 </button></li>
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

