"use client"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, Typography} from "@mui/material"
import * as React from "react"
import ProductSwiper from "./[product_pk]/swiper"
import {CartProduct, Product} from "@/types/productsTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import _ from "lodash"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import {User} from "@/types/usersTypes"
import {bookmarksServices} from "@/services/bookmarksServices"
import {BookmarkSearchParams} from "@/types/bookmarksTypes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const ProductsSearch = ({products, searchParams}: {products: Product[], searchParams: SearchParams}) => {
  const router = useRouter()
  return (
    <section className="flex justify-between items-center py-4 rounded-lg">
      <span className="container text-lg font-semibold">
        상품이 모두 <strong>{products.length}</strong>개 있습니다.
      </span>
      <div className="container flex justify-end p-2">
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
            <MenuItem value="가격순">가격순</MenuItem>
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
      showFirstButton
      showLastButton
      shape="rounded"
      count={Math.ceil(total_rows / searchParams.rowsPerPage)}
      page={searchParams.page + 1}
      className="flex justify-center"
      onChange={(_, value) => {
        router.push("?" + new URLSearchParams({
          ...searchParams,
          page: String(value - 1)
        }))
      }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black"
              }
            }
          }}
        />
      )}
    />
  )
}

export const ProductSubtitle = () => {
  return (
    <div>
      <div className="flex justify-center text-white text-4xl"
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
        }}>상품상세</div>
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
    <><section className="flex justify-between items-center py-4 rounded-lg">
      {/* <span className="container text-lg font-semibold">
        상품이 모두 <strong>{products.length}</strong>개 있습니다.
      </span>
      <div className="container flex justify-end p-2">
        <FormControl className="w-48">
          <InputLabel>상품정렬</InputLabel>
          <Select
            label="상품정렬"
            className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            // value={searchParams.orderColumn}
            // onChange={(event) => {
            //   router.push("?" + new URLSearchParams({
            //     ...searchParams,
            //     page: "0",
            //     orderColumn: String(event.target.value)
            //   }))
            // } }
          >
            <MenuItem value="product_pk">신상품</MenuItem>
            <MenuItem value="가격순">가격순</MenuItem>
          </Select>
        </FormControl>
      </div> */}
    </section>
    <div className="container">
      <ol className="product-list-mobile" style={{display: "flex", flexWrap: "wrap", gap: "30px", padding: "10px"}}>
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product.product_pk}
              className="product-item"
              style={{
                padding: "15px",
                width: "calc(33.333% - 20px)",
                borderRadius: "5px",
                border: "2px solid #271A11",
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
                  }} />
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
              <p className="py-4" style={{textAlign: "left", margin: "10px 0", fontSize: "1rem"}}>
                <Link href={`/products/${product.product_pk}`} style={{color: "#333", textDecoration: "none"}}>
                  {product.name}
                </Link>
                <br />
                <strong style={{color: "#000", fontSize: "1.1rem"}}>{product.discounted_price.toLocaleString()}원</strong>
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
                  {product.etc}
                </button>
                <button
                  className="product-button"
                  style={{
                    padding: "5px 8px",
                    backgroundColor: "#FACC15",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "0.8rem"
                  }}
                >
                  택배배송
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
    </div></>
  )
}

export const ProductsDetailContent = ({product, user}: { product: Product, user: User }) => {
  console.log(":::::::::: ProductsDetailContent Component ::::::::::")
  console.log(":::::::::: product ::::::::::")
  console.log(product)
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

  const searchParams = {
    user_pk: user.user_pk,
    product_pk: product.product_pk
  } as BookmarkSearchParams

  const [isFavorited, setIsFavorited] = React.useState(false)
  const bookmark = bookmarksServices.bookmarksDetail(searchParams)

  bookmark.then((result) => {
    if( !result.data.bookmark ) {
      setIsFavorited(false)
    }
    else {
      setIsFavorited(true)
    }
  })


  const handleFavoriteClick = async () => {
    if (!user.id) {
      Swal.fire({
        title: "로그인이 필요한 서비스입니다.",
        text: "회원가입 또는 로그인을 하시겠습니까?",
        // icon: "warning",
        imageUrl: `${process.env.NEXT_PUBLIC_URL}/images/logo.png`,
        imageWidth: 100,
        showCancelButton: true,
        confirmButtonColor: "#271A11",
        cancelButtonColor: "#d33",
        confirmButtonText: "로그인하러 가기",
        cancelButtonText: "취소"
      }).then((result) => {
        if (result.isConfirmed) {
          const btnUser = document.getElementById("btn-user")
          btnUser?.click()
        }
      })
      return
    }

    console.log(`user_pk : ${user.user_pk}`)
    console.log(`product_pk : ${product.product_pk}`)
    const user_pk = user.user_pk
    const product_pk = product.product_pk
    try {
      const response: ResponseApi = await bookmarksServices.bookmarksCreate(user_pk, product_pk)
      console.log("message : " + response.data.message)
      const title = response.data.message == "insert" ? "<p>찜 리스트 추가</p>" : "<p>찜 리스트 제거</p>"
      const text = response.data.message == "insert" ? "해당 상품을 찜 리스트에 추가하였습니다." : "해당 상품을 찜 리스트에서 제거하였습니다."
      const image = response.data.message == "insert" ? "heart.gif" : "heart2.gif"
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: title,
        text: text,
        imageUrl: `${process.env.NEXT_PUBLIC_URL}/images/${image}`,
        imageWidth: 200,
        // imageHeight: 200,
        imageAlt: "하트",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      })
    } catch (error) {
      console.log(error)
    }

    setIsFavorited(!isFavorited)
  }
  const [selectedOption, setSelectedOption] = React.useState("")

  const handleOptionChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
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
              borderRadius: "10px",
              opacity: product.is_sold_out ? 0.3 : 1
            }} />
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
        </div>
        <div>
          <div className="py-2 font-bold text-4xl">{product.name}</div>
          <div className="py-4">{product.description}</div>
          <div className="mb-2">
            <div className="py-2">
              <div className="flex gap-3 align-items">
                <div className="text-xl text-red-600">{(((Number(product.price) - Number(product.discounted_price)) / Number(product.price)) * 100).toFixed(0)}%</div>
                <div className="text-xl" style={{textDecoration: "line-through"}}>{(Number(product.price)).toLocaleString()}원</div>
              </div>
              <strong className="text-3xl text-red-700">{(Number(product.discounted_price)).toLocaleString()}원</strong>
              <div>100g당 {product.per100g}</div>
            </div>
            <div><p>배송사: 로젠택배</p></div>
            {/* <strong className="text-4xl text-red-700">{(Number(product.discounted_price) * quantity).toLocaleString()}원</strong> */}
            <div className="py-3 flex flex-wrap gap-2">
              <button
                className="product-button"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#271A11",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
                {product.etc}
              </button>
              <button
                className="product-button"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#FACC15",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
                택배배송
              </button>
            </div>
            <Divider className="bg-gray-800 h-0.5 mb-4" />
            {product.origin && (
              <>
                <div className="flex items-center mb-2">
                  <div className="w-24 mr-5">원산지</div>
                  <div className="flex-grow">{product.origin}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-24 mr-5">제품중량</div>
                  <div className="flex-grow">{product.weight}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-24 mr-5">제품유형</div>
                  <div className="flex-grow">{product.type}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-24 mr-5">부위</div>
                  <div className="flex-grow">{product.part}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-24 mr-5">등급</div>
                  <div className="flex-grow">{product.grade}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-24 mr-5">포장방법</div>
                  <div className="flex-grow">{product.etc}</div>
                </div>
              </>
            )}
          </div>
          <div>
            {/* category가 pork일 때만 드롭다운을 렌더링 */}
            {product.category === "pork" && (
              <div className="mb-4 flex items-center gap-4">
                <div className="w-24">종류</div>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="w-32 h-10 p-1 border border-gray-300 rounded"
                  required
                >
                  <option value="수육">수육</option>
                  <option value="찌개">찌개</option>
                  <option value="구이">구이</option>
                </select>
              </div>
            )}
          </div>
          <div className="mb-4 flex items-center gap-4">
            <div className="w-24">수량</div>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 h-8 p-2 border border-gray-300 rounded"
              min="1"
            />
            <div>
              <style>
                {`
                  @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                  .blink {
                    animation: blink 1.5s infinite;
                  }
                `}
              </style>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: "8px",
                  width: "100%",
                  maxWidth: "50%"
                }}
              >
                <strong
                  className="blink"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#ff69b4",
                    backgroundColor: "#fff0f6",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    border: "2px dashed #ff69b4",
                    whiteSpace: "nowrap"
                  }}
                >
                  150,000원 이상 구매 시 무료배송
                </strong>
              </div>
            </div>
          </div>
          <Divider className="bg-gray-800 h-0.5 mb-4" />
          <div>
            <div className="flex flex-col items-end mb-4 lg:w-1/2 ml-auto py-2 gap-1">
              <div className="flex items-center gap-4">
                <div className="text-red-600 text-2xl">결제 예상금액</div>
                <strong className="text-3xl text-red-700">{(Number(product.discounted_price) * quantity).toLocaleString()}원</strong>
              </div>
            </div>
            <div className="flex justify-start items-center mb-4 py-4">
              <div className="product-detail-button flex w-full gap-2 items-center">
                {/* 찜 (하트) */}
                <div
                  onClick={handleFavoriteClick}
                  className="flex items-center justify-center w-12 h-12 p-4 border bg-gray-800 cursor-pointer transition-colors duration-300"
                >
                  {isFavorited ? (
                    <FavoriteIcon style={{color: "red", fontSize: "24px"}} />
                  ) : (
                    <FavoriteBorderIcon style={{color: "white", fontSize: "24px"}} />
                  )}
                </div>
                <CartOrderButton type="CART" product={product} quantity={quantity} user={user}>
                  <Button
                    style={{
                      backgroundColor: "#A51C30",
                      width: "100%",
                      height: "50px",
                      color: "white",
                      fontSize: "1.2rem",
                      opacity: product.is_sold_out ? 0.3 : 1
                    }}
                    className="btn"
                    disabled={product.is_sold_out}
                  >
                    장바구니
                  </Button>
                </CartOrderButton>
                <CartOrderButton type="ORDER" product={product} quantity={quantity} user={user}>
                  <Button
                    style={{
                      backgroundColor: "#271A11",
                      width: "100%",
                      height: "50px",
                      color: "white",
                      fontSize: "1.2rem",
                      opacity: product.is_sold_out ? 0.3 : 1
                    }}
                    className="btn"
                    disabled={product.is_sold_out}
                  >
                    구매하기
                  </Button>
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
  user,
  type
}: {
  children: React.ReactElement<{onClick: Function}>
  product: Product
  quantity: number
  user: User
  type: "CART" | "ORDER"
}) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  // 🛒 장바구니 추가
  const addCartOrderList = async (product: Product, quantity: number) => {
    try {
      // 로컬 스토리지에서 장바구니 데이터를 가져오기
      let cartProducts: CartProduct[] = JSON.parse(localStorage.getItem("cartProducts") || "[]")

      // 장바구니에서 동일한 product_pk가 있는지 찾기
      const cartProduct = _.find(cartProducts, (cartProduct: CartProduct) => {
        return cartProduct.product.product_pk === product.product_pk
      })

      if (cartProduct) {
        // 동일한 product_pk가 있으면 수량을 1 증가시키기
        cartProduct.quantity += 1
      } else {
        // 동일한 product_pk가 없으면 새로운 상품 추가
        cartProducts.push({
          product,
          quantity,
          checked: true
        })
      }

      // 로컬 스토리지에 장바구니 데이터 저장
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

      // 장바구니 항목 수 업데이트
      window.postMessage({cartProductsLength: cartProducts.length}, "*")
    } catch (error) {
      // 오류 발생 시 경고 메시지 표시 및 로컬 스토리지 초기화
      alert("알 수 없는 오류가 발생하였습니다. 다시 시도 해주세요.")
      localStorage.setItem("cartProducts", "")
    }
  }

  // 한 상품 주문
  const orderOne = async (product_pk:number, quantity:number) => {
    console.log(`product_pk : ${product_pk}`)
    console.log(`quantity : ${quantity}`)

    // 회원
    if( user.user_pk ) {
      // alert("회원")
      router.push(`/order?productPks=${product.product_pk}&quantityList=${quantity}`)
    }
    // 비회원
    else {
      // alert("비회원")
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: "비회원 주문",
        text: "전화번호를 입력해주세요. (- 기호없이 : 01012341234 )",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "구매하기",
        cancelButtonText: "취소",
        showLoaderOnConfirm: true,
        preConfirm: async (mobile) => {
          try {
            // TODO: 전화번호 검증 로직 필요
            return {mobile: mobile}
          } catch (error) {
            //
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          // 비회원 주문
          router.push(`/guest/order?mobile=${result.value.mobile}&productPks=${product.product_pk}&quantityList=${quantity}`)
        }
      })

    }


  }


  // 장바구니 포함 주문
  const orderWithCart = async () => {
    // 구매하기 -> 알림 -> 예 -> 장바구니까지 주문
    // 로컬 스토리지에서 cartProducts 가져오기
    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")

    // 빈 배열인지 확인
    if (storedCartProducts.length === 0) {
      alert("장바구니가 비어 있습니다.")
      return
    }
    // product_pk와 quantity 추출 및 문자열 병합
    const productPks = storedCartProducts.map((cartProduct : CartProduct ) => cartProduct.product.product_pk).join(",")
    const quantityList = storedCartProducts.map((cartProduct: CartProduct ) => cartProduct.quantity).join(",")
    console.log(`productPks : ${productPks}`)
    console.log(`quantityList : ${quantityList}`)
    console.log(`/order?productPks=${productPks}&quantityList=${quantityList}`)

    router.push(`/order?productPks=${productPks}&quantityList=${quantityList}`)
  }
  return (
    <div>
      {React.cloneElement(children, {
        onClick: () => {
          children.props.onClick?.()
          setOpen(true)
        }
      })}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === "CART" ?
              "장바구니에 추가하였습니다. 장바구니로 이동하시겠습니까?" :
              "장바구니에 있는 상품과 함께 주문하시겠습니까? 아니오를 클릭하시면 선택하신 상품만 주문됩니다."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* [아니오] */}
          <Button onClick={() => {
            setOpen(false)
            if( type === "CART" ) {
              addCartOrderList(product, quantity)
            }
            if (type === "ORDER") {
              // 구매하기 -> 알림 -> 아니오 -> 한상품만
              orderOne(product.product_pk, quantity)
              // router.push(`/order?productPks=${product.product_pk}&quantityList=${quantity}`)
            }
          }} color="primary">
            아니오
          </Button>
          {/* [예] */}
          <Button onClick={() => {
            setOpen(false)
            if (type === "CART") {
              addCartOrderList(product, quantity)
              // 장바구니로 이동
              router.push("/carts")
            }
            // 구매하기 -> 알림 -> 예 -> 장바구니 포함 주문
            if( type === "ORDER") {
              addCartOrderList(product, quantity)
              orderWithCart()
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
      <div className="container">
        <div>
          <strong>교환 및 환불 안내</strong>
          <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-12 py-4">
          <strong>배송관련 안내</strong>
          <div>
            <div>
            배송 과정 중 기상 악화 및 도로교통 상황에 따라 부득이 지연배송이 발생될 수 있습니다.
            </div>
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
    <nav className={`container sticky top-16 items-center w-full z-10 ${isFixed ? "visible" : "invisible md:visible"} flex-1 flex justify-center items-center nav-detail`} style={{height: "100px"}}>
      <ul className="flex w-full h-20 items-center">
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
