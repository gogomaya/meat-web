import MainLayout from "@/app/main-layout"
import {GeneralPagination, GeneralReview, MonthlyBestReview, PhotoPagination, PhotoReview, ReviewCard} from "./reviews"

const Products = () => {
  return (
    <MainLayout>
      <h1 className="flex justify-center">고객 후기</h1>
      <h2 className="flex justify-center"><strong>이달의 베스트 리뷰</strong></h2>
      <MonthlyBestReview />
      <h2 className="flex justify-left"><strong>포토리뷰</strong></h2>
      <PhotoReview />
      <PhotoPagination />
      <h2 className="flex justify-left"><strong>리뷰</strong></h2>
      <GeneralReview />
      <GeneralPagination />
    </MainLayout>
  )
}

export default Products
