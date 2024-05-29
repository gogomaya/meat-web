import {loginCheck} from "@/app/users/login/loginCheck"
import Divider from "@mui/material/Divider"
import {ProductDetail, ProductsDetailContent, ShipDetail, NavDetail, ProductSubtitle} from "../products"
import {productsServices} from "@/services/productsServices"
import {reviewsServices} from "@/services/reviewsServices"
import MainLayout from "@/app/main-layout"
import {GeneralReviews} from "@/app/reviews/general-reviews"
import {GeneralReview, PhotoReview, ProductDetailReview} from "@/app/reviews/reviews"
import {ResponseApi} from "@/types/commonTypes"
import {ProductsSearchParams} from "@/types/productsTypes"
import {ReviewsSearchParams} from "@/types/reviewsTypes"
import {BoardsList} from "@/app/boards/boards"
import {QnaBoard} from "@/app/qna/qna"
// import Boards from "@/app/boards/page"

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
  const productResponse: ResponseApi = await productsServices.productsDetail(props.params.product_pk)
  const reviewsResponse: ResponseApi = await reviewsServices.reviewsRead(reviewsSearchParams)
  const {product} = productResponse.data
  const {reviews, total_rows} = reviewsResponse.data
  return (
    <MainLayout user={user}>
      <div>
        <ProductSubtitle />
        <ProductsDetailContent product={product} />
        <NavDetail />
        {/* 상품 상세 정보 */}
        <div id="detail" className="mx-16 px-2"><ProductDetail product={product} /></div>
        {/* 리뷰 */}
        <div id="review2" className="mx-16 px-2">
          <GeneralReviews
            user={user}
            product={product}
            reviews={reviews}
            total_rows={total_rows}
            reviewsSearchParams={reviewsSearchParams}
          />
          <ProductDetailReview />
        </div>
        <Divider className="container mt-8 mx-16 px-2" style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
        {/* 문의 */}
        <div id="qna" className="mx-16 px-2">
          <QnaBoard />
        </div>
        {/* 주문정보 */}
        <div id="ship" className="mx-16 p-2"><ShipDetail /></div>
      </div>
    </MainLayout>
  )
}

export default Products
