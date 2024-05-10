import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {GeneralPagination,  GeneralReviews, MonthlyBestReview, PhotoReview} from "./reviews"

const Products = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      {/* 이달의 베스트 리뷰 */}
      <MonthlyBestReview />
      <h2 className="my-8 mt-4 block"><strong>PHOTO REVIEW | 포토리뷰</strong></h2>
      <PhotoReview />
      <GeneralPagination />
      <h2 className="flex justify-left mt-8"><strong>일반 리뷰</strong></h2>
      <GeneralReviews />
      <GeneralPagination />
    </MainLayout>
  )
}

export default Products
