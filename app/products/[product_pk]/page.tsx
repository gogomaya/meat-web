import {loginCheck} from "@/app/users/login/loginCheck"
import Divider from "@mui/material/Divider"
import {ProductDetail, ProductsDetailContent, ShipDetail, NavDetail, ProductSubtitle} from "../products"
import {productsServices} from "@/services/productsServices"
import {reviewsServices} from "@/services/reviewsServices"
import {boardsServices} from "@/services/boardsServices"
import MainLayout from "@/app/main-layout"
import {GeneralReviews} from "@/app/reviews/general-reviews"
import {GeneralReview, PhotoReview, ProductDetailReview} from "@/app/reviews/reviews"
import {ResponseApi} from "@/types/commonTypes"
import {ProductsSearchParams} from "@/types/productsTypes"
import {ReviewsSearchParams} from "@/types/reviewsTypes"
import {BoardsSearchParams} from "@/types/boardsTypes"
import {BoardsList} from "@/app/boards/boards"

const Products = async (props: {
  params: {product_pk: number},
  searchParams: ProductsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const reviewsSearchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    product_pk: props.params.product_pk
  } as ReviewsSearchParams
  const boardsSearchParams = {
    rowsPerPage: 5,
    page: 0,
    category: "qna",
    product_pk: props.params.product_pk
  } as BoardsSearchParams
  const productResponse: ResponseApi = await productsServices.productsDetail(props.params.product_pk)
  const reviewsResponse: ResponseApi = await reviewsServices.reviewsRead(reviewsSearchParams)
  const boardsResponse: ResponseApi = await boardsServices.boardsRead(boardsSearchParams)
  const {product} = productResponse.data
  const {reviews, total_rows: reviews_total_rows} = reviewsResponse.data
  const {boards, total_rows: boards_total_rows} = boardsResponse.data
  return (
    <MainLayout user={user}>
      <div>
        <ProductSubtitle />
        <ProductsDetailContent product={product} user={user} />
        <NavDetail />
        {/* 상품 상세 정보 */}
        <div id="detail" className="container" style={{padding:"2rem"}}><ProductDetail product={product} /></div>
        {/* 리뷰 */}
        <div id="review2" className="container">
          <GeneralReviews
            user={user}
            product={product}
            reviews={reviews}
            total_rows={reviews_total_rows}
            reviewsSearchParams={reviewsSearchParams}
          />
          {/* <ProductDetailReview /> */}
        </div>
        {/* <Divider className="container mt-8" style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} /> */}
        {/* 문의 */}
        <div id="qna" className="px-2">
          <BoardsList
            user={user}
            boards={boards}
            total_rows={boards_total_rows}
            boardsSearchParams={boardsSearchParams}
            boardsMessage={{
              title: "문의하기",
              category: "qna",
              buttonCreateTitle: "문의하기",
              buttonUpdateTitle: "문의수정"
            }}
          />
        </div>
        {/* 주문정보 */}
        <div id="ship" className="p-2"><ShipDetail /></div>
      </div>
    </MainLayout>
  )
}

export default Products
