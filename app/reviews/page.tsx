import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {GeneralPagination,  GeneralReviews, MonthlyBestReview, PhotoReview} from "./reviews"

const Products = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      {/* 이달의 베스트 리뷰 */}
      <MonthlyBestReview />
      <div className="m-8 p-2 block "><strong>PHOTO REVIEW | 포토리뷰</strong></div>
      <PhotoReview />
      <GeneralPagination />
      <div className="flex justify-left mt-8"><strong>일반 리뷰</strong></div>
      <GeneralReviews />
      <GeneralPagination />
    </MainLayout>
  )
}

export default Products
