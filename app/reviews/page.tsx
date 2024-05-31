import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {GeneralPagination,  GeneralReviews, MonthlyBestReview, PhotoReview, ProductDetailReview} from "./reviews"

const Products = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="container">
        <MonthlyBestReview />
        <div className="m-8 p-2 block "><strong>PHOTO REVIEW | 포토리뷰</strong></div>
        <PhotoReview />
        <GeneralPagination />
        <div className="flex justify-left m-8"><strong>일반 리뷰</strong></div>
        <GeneralReviews />
        <GeneralPagination />
      </div>
    </MainLayout>
  )
}

export default Products
