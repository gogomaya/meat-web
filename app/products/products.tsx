"use client"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import * as React from "react"
import ProductSwiper from "./[product_pk]/swiper"
import {CartProduct, Product} from "@/types/productsTypes"
import {SearchParams} from "@/types/commonTypes"
import _ from "lodash"

export const ProductsSearch = ({products, searchParams}: {products: Product[], searchParams: SearchParams}) => {
  const router = useRouter()
  return (
    <section className="flex justify-between items-center">
      <span>상품이 모두<strong>{products.length}</strong>개 있습니다.</span>
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

export const ProductsList = ({products}: { products: Product[] }) => {
  const enlargeImage = (event: React.MouseEvent<HTMLLIElement>) => {
    const img = event.currentTarget.querySelector("img") as HTMLElement
    if (img) {
      img.style.transform = "scale(1.01)"
    }
  }

  const shrinkImage = (event: React.MouseEvent<HTMLLIElement>) => {
    const img = event.currentTarget.querySelector("img") as HTMLElement
    if (img) {
      img.style.transform = "scale(1)"
    }
  }

  React.useEffect(() => {
    const items = document.querySelectorAll(".product-item") as NodeListOf<HTMLElement>
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 100)
    })
  }, [])

  return (
    <ol style={{display: "flex", flexWrap: "wrap", gap: "20px", padding: "10px"}}>
      {products.length > 0 ? (
        products.map((product) => (
          <li
            key={product.product_pk}
            className="product-item"
            style={{
              padding: "15px",
              width: "calc(33.333% - 20px)",
              borderRadius: "15px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, opacity 0.3s",
              opacity: 0,
              transform: "translateY(20px)"
            }}
            onMouseEnter={enlargeImage}
            onMouseLeave={shrinkImage}
          >
            <Link
              href={`/products/${product.product_pk}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
            >
              <Image
                src={`/upload-images/products/${product.image_file_name}`}
                alt={product.name}
                width={0}
                height={0}
                priority
                sizes="100vw"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "10px",
                  transform: "scale(1)",
                  transition: "transform 0.3s",
                  opacity: product.is_sold_out ? 0.3 : 1
                }}
              />
              {product.is_sold_out && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#ff0000"
                  }}
                >
                Sold out
                </span>
              )}
            </Link>
            <p style={{textAlign: "left", margin: "10px 0", fontSize: "1rem"}}>
              <Link href={`/products/${product.product_pk}`} style={{color: "#333", textDecoration: "none"}}>
                {product.name}
              </Link>
              <br />
              <strong style={{color: "#000", fontSize: "1.1rem"}}>{product.price.toLocaleString()}원</strong>
            </p>
            <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
              <button
                className="product-button"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
              당일배송
              </button>
              <button
                className="product-button"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
              택배배송
              </button>
              <button
                className="product-button"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#ffeb3b",
                  color: "#000",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
              카드결제
              </button>
            </div>
          </li>
        ))
      ) : (
        <div style={{width: "100%", textAlign: "center", padding: "20px"}}>
        No products available.
        </div>
      )}
    </ol>
  )
}

export const ProductsDetailContent = ({product}: {product: Product}) => {
  const [quantity, setQuantity] = React.useState(1)

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
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
            <table>
              <tbody>
                <tr>
                  <td>{product.origin && <><CheckRoundedIcon /> 원산지:</>}</td>
                  <td className="flex justify-end">{product.origin}</td>
                </tr>
                <tr>
                  <td>{product.weight && <><CheckRoundedIcon /> 제품중량:</>}</td>
                  <td className="flex justify-end">{product.weight}</td>
                </tr>
                <tr>
                  <td>{product.type && <><CheckRoundedIcon /> 제품유형:</>}</td>
                  <td className="flex justify-end">{product.type}</td>
                </tr>
                <tr>
                  <td>{product.part && <><CheckRoundedIcon /> 부위:</>}</td>
                  <td className="flex justify-end">{product.part}</td>
                </tr>
                <tr>
                  <td>{product.per100g && <><CheckRoundedIcon /> 100g당:</>}</td>
                  <td className="flex justify-end">{product.per100g}</td>
                </tr>
                <tr>
                  <td>{product.grade && <><CheckRoundedIcon /> 등급:</>}</td>
                  <td className="flex justify-center">{product.grade}</td>
                </tr>
                <tr>
                  <td>{product.package && <><CheckRoundedIcon /> 포장방법:</>}</td>
                  <td className="flex justify-end">{product.grade}</td>
                </tr>
              </tbody>
            </table>

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
              <CartOrderButton
                product={product}
                quantity={quantity}
                type="CART"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className="btn"
                >
                  장바구니
                </Button>
              </CartOrderButton>
              <CartOrderButton
                product={product}
                quantity={quantity}
                type="ORDER"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className="btn"
                >
                  구매하기
                </Button>
              </CartOrderButton>
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

let cartProducts: CartProduct[] = []
const CartOrderButton = ({
  children,
  product,
  quantity,
  type
}: {
  children: React.ReactElement<{onClick: Function}>
  product: Product
  quantity: number
  type: "CART" | "ORDER"
}) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const addCartOrderList = async (product: Product, quantity: number) => {
    try {
      cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")
      const cartProduct = _.find(cartProducts, (cartProduct) => {
        return cartProduct.product.product_pk === product.product_pk
      })
      if (cartProduct) {
        cartProduct.product = product
        cartProduct.quantity = quantity
      } else {
        cartProducts.push({
          product,
          quantity,
          checked: true
        })
      }
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
      window.postMessage({cartProductsLength: cartProducts.length}, "*")
      setOpen(true)
    } catch (error) {
      alert("알 수 없는 오류가 발생하였습니다. 다시 시도 해주세요.")
      localStorage.setItem("cartProducts", "")
    }
  }
  return (
    <div>
      {React.cloneElement(children, {
        onClick: () => {
          children.props.onClick?.()
          addCartOrderList(product, quantity)
        }
      })}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === "CART" ?
              "장바구니에 추가하였습니다. 장바구니로 이동하시겠습니까?" :
              "장바구니에 있는 상품과 함께 주문하시겠습니까? 취소를 클릭하시면 선택하신 상품만 주문됩니다."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false)
            if (type === "ORDER") {
              router.push(`/order?orderProducts=${encodeURIComponent(JSON.stringify(
                cartProducts.filter((cartProduct) => {
                  return cartProduct.product.product_pk === product.product_pk
                })
              ))}`)
            }
          }} color="primary">
            아니오
          </Button>
          <Button onClick={() => {
            setOpen(false)
            if (type === "CART") {
              router.push("/carts")
            } else {
              router.push(`/order?orderProducts=${encodeURIComponent(JSON.stringify(cartProducts))}`)
            }
          }} color="primary" autoFocus>
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
  }


  return (
    <nav className={`sticky top-16 w-full z-10 ${isFixed ? "visible" : "invisible md:visible"} flex-1 flex justify-center items-center nav-detail`} style={{height: "80px"}}>
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
