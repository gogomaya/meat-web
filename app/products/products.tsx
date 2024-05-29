"use client"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import * as React from "react"
import ProductSwiper from "./[product_pk]/swiper"
import {CartProduct, Product} from "@/types/productsTypes"
import {SearchParams} from "@/types/commonTypes"
import _ from "lodash"

export const ProductsSearch = ({products, searchParams}: {products: Product[], searchParams: SearchParams}) => {
  const router = useRouter()
  return (
    <section className="flex justify-between items-center mx-8 p-2 rounded-lg">
      <span className="text-lg font-semibold">
        상품이 모두 <strong>{products.length}</strong>개 있습니다.
      </span>
      <div className="flex-1 ml-8 p-2">
        <FormControl className="w-48">
          <InputLabel>상품정렬</InputLabel>
          <Select
            label="상품정렬"
            className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
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
      </div>
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

export const ProductSubtitle = () => {
  return (
    <div>
      <h2 className="flex justify-center text-red-100"
        style={{
          backgroundImage: "url('/images/Bg.png')",
          backgroundPosition: "center calc(10% - 620px)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          textAlign: "center",
          minHeight: "200px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>상품상세</h2>
    </div>
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
    <ol className="m-8 p-2" style={{display: "flex", flexWrap: "wrap", gap: "30px", padding: "10px"}}>
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
              {product.is_sold_out ? (
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
              ) : null}
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
          준비된 상품이 없습니다.
        </div>
      )}
    </ol>
  )
}

export const ProductsDetailContent = ({product}: { product: Product }) => {
  const [quantity, setQuantity] = React.useState(1)

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:p-8">
        <div className="relative">
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
              border: "3px solid #4A4A4A",
              borderRadius: "10px"
            }} />
        </div>
        <div>
          <Typography variant="h4" gutterBottom style={{fontWeight: "bold", fontSize: "2.6rem"}}>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph style={{marginBottom: "1rem"}}>
            {product.description}
          </Typography>
          <div style={{marginBottom: "1rem"}}>
            <span style={{marginRight: "10px", color: "#A51C30", fontWeight: "bold", fontSize: "2.6rem"}}>{product.price.toLocaleString()}원</span>
            <div className="py-3" style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
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
            <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
            {product.origin && (
              <>
                <div className="flex items-center" style={{marginBottom: "0.5rem"}}>
                  <div style={{marginRight: "20px", flex: "0 0 100px"}}>원산지</div>
                  <div style={{flexGrow: 1}}>{product.origin}</div>
                </div>
                <div className="flex items-center" style={{marginBottom: "0.5rem"}}>
                  <div style={{marginRight: "20px", flex: "0 0 100px"}}>제품중량</div>
                  <div style={{flexGrow: 1}}>{product.weight}</div>
                </div>
                <div className="flex items-center" style={{marginBottom: "0.5rem"}}>
                  <div style={{marginRight: "20px", flex: "0 0 100px"}}>제품유형</div>
                  <div style={{flexGrow: 1}}>{product.type}</div>
                </div>
                <div className="flex items-center" style={{marginBottom: "0.5rem"}}>
                  <div style={{marginRight: "20px", flex: "0 0 100px"}}>부위</div>
                  <div style={{flexGrow: 1}}>{product.part}</div>
                </div>
                <div className="flex items-center" style={{marginBottom: "0.5rem"}}>
                  <div style={{marginRight: "20px", flex: "0 0 100px"}}>등급</div>
                  <div style={{flexGrow: 1}}>{product.grade}</div>
                </div>
                <div className="flex items-center" style={{marginBottom: "0.5rem"}}>
                  <div style={{marginRight: "20px", flex: "0 0 100px"}}>포장방법</div>
                  <div style={{flexGrow: 1}}>{product.etc}</div>
                </div>
              </>
            )}
          </div>
          <div style={{marginBottom: "1rem"}} className="flex items-center gap-4 pb-5">
            <div style={{flex: "0 0 100px"}}>수량</div>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              style={{width: "5rem", height: "2rem", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "5px"}}
              min="1" />
          </div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div>
            <Typography variant="h5" gutterBottom className="flex flex-col items-end" style={{marginBottom: "1rem"}}>
                총금액: {(Number(product.price) * quantity).toLocaleString()}원
            </Typography>
            <div className="w-full p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex w-full lg:w-1/2 gap-2">
                  <CartOrderButton type="CART" product={product} quantity={quantity}>
                    <Button style={{backgroundColor: "#A51C30", width: "290px", height: "50px", color: "white", fontSize: "1.2rem"}} className="btn">
                      장바구니
                    </Button>
                  </CartOrderButton>
                  <CartOrderButton type="ORDER" product={product} quantity={quantity}>
                    <Button style={{backgroundColor: "#271A11", width: "290px", height: "50px", color: "white", fontSize: "1.2rem"}} className="btn">
                      구매하기
                    </Button>
                  </CartOrderButton>
                </div>
              </div>
              <div className="flex justify-end">
                <CartOrderButton type="ORDER" product={product} quantity={quantity}>
                  <div className="w-40 h-45">
                    <Image
                      src="/images/naver-pay-btn.png"
                      alt=""
                      width={150}
                      height={150}
                      layout="responsive"
                      className="object-contain"
                      style={{
                        cursor: "pointer"
                      }}
                      priority
                    />
                  </div>
                </CartOrderButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <>
      <div className="p-8">
        <strong>교환 및 환불 안내</strong>
        <div>
          <div>
            <span style={{fontWeight: "bold", textDecoration: "underline"}}>1. 상품에 문제가 있는 경우</span><br />
            받으신 상품이 표시/광고 내용 또는 계약 내용과 다른 경우에는 상품을 받은 날부터 3개월 이내,
            <br />그 사실을 알게 된 날부터 30일 이내에 교환 및 환불을 요청하실 수 있습니다.
            <br />상품의 정확한 상태를 확인할 수 있도록 사진을 함께 보내주시면 더 빠른 상담이 가능합니다.
            <br /><span>⚠ 배송 상품에 문제가 있는 것으로 확인되면 배송비는 판매자가 부담합니다.</span>
          </div>
          <div>
            <span style={{fontWeight: "bold", textDecoration: "underline"}}>2. 단순 변심, 주문착오의 경우</span><br />
            받으신 상품이 표시/광고 내용 또는 계약 내용과 다른 경우에는 상품을 받은 날부터 3개월 이내,
            <br />그 사실을 알게 된 날부터 30일 이내에 교환 및 환불을 요청하실 수 있습니다.
            <br />상품의 정확한 상태를 확인할 수 있도록 사진을 함께 보내주시면 더 빠른 상담이 가능합니다.
            <br /><span>⚠ 배송 상품에 문제가 있는 것으로 확인되면 배송비는 판매자가 부담합니다.</span>
          </div>
        </div>
      </div>
      <div className="p-8">
        <strong>주문취소 안내</strong>
        <div>
          <div>
            <span style={{fontWeight: "bold", textDecoration: "underline"}}>1. 주문 취소 관련</span><br />
            [배송준비중] 부터는 취소가 불가하니, 반품으로 진행해주세요. (상품에 따라 반품이 불가할 수 있습니다.)
            <br />주문마감 시간에 임박할수록 취소 기능 시간이 짧아질 수 있습니다.
            <br />비회원은 App 또는 모바일 웹사이트에서 [비회원 주문조회 페이지] 에서 취소가 가능합니다.
            <br />일부 예약상품은 배송 3~4일 전에만 취소 가능합니다.
            <br />주문상품의 부분취소는 불가능합니다. 전체 주문 취소 후 다시 구매 해주세요.
            <br />미성년자 결제 시 법정대리인이 그 거래를 취소할 수 있습니다.
          </div>
        </div>
      </div>
      <div className="p-8 mb-4">
        <strong>배송관련 안내</strong>
        <div>
          <div>
            배송 과정 중 기상 악화 및 도로교통 상황에 따라 부득이 지연배송이 발생될 수 있습니다.
          </div>
        </div>
      </div>
    </>
  )
}

export const NavDetail = () => {
  // 스크롤 시 fixed되게
  const [isFixed, setIsFixed] = React.useState(false)
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY - 240
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
      const offset = 240
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
    <nav className={`sticky top-16 items-center w-full p-16 z-10 ${isFixed ? "visible" : "invisible md:visible"} flex-1 flex justify-center items-center nav-detail`} style={{height: "100px"}}>
      <ul className="flex w-full h-20 items-center p-10">
        <li
          onClick={() => {
            scrollToElement("detail")
            handleMouseHover()
            handleMouseClick("detail")
          }}
          className={`p-2 flex-1 text-center ${isHovered ? "highlight-underline" : ""} ${isClicked === "detail" ? "text-red-500" : ""}`}
          style={{
            border: "3px solid #271A11",
            marginLeft: "8px"
          }}
        >
          <button style={{fontSize: "1.55rem"}}>상품상세</button>
        </li>
        <li
          onClick={() => {
            scrollToElement("review2")
            handleMouseHover()
            handleMouseClick("review2")
          }}
          className={`p-2 flex-1 text-center ${isHovered ? "highlight-underline" : ""} ${isClicked === "review2" ? "text-red-500" : ""}`}
          style={{
            borderTop: "3px solid #271A11",
            borderBottom: "3px solid #271A11"
          }}
        >
          <button style={{fontSize: "1.55rem"}}>리뷰</button>
        </li>
        <li
          onClick={() => {
            scrollToElement("qna")
            handleMouseHover()
            handleMouseClick("qna")
          }}
          className={`p-2 flex-1 text-center ${isHovered ? "highlight-underline" : ""} ${isClicked === "qna" ? "text-red-500" : ""}`}
          style={{
            border: "3px solid #271A11"
          }}
        >
          <button style={{fontSize: "1.55rem"}}>문의</button>
        </li>
        <li
          onClick={() => {
            scrollToElement("ship")
            handleMouseHover()
            handleMouseClick("ship")
          }}
          className={`p-2 flex-1 text-center ${isHovered ? "highlight-underline" : ""} ${isClicked === "ship" ? "text-red-500" : ""}`}
          style={{
            borderTop: "3px solid #271A11",
            borderBottom: "3px solid #271A11",
            borderRight: "3px solid #271A11",
            marginRight: "8px"
          }}
        >
          <button style={{fontSize: "1.55rem"}}>주문정보</button>
        </li>
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
