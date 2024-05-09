import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {GeneralPagination, GeneralReview, MonthlyBestReview, PhotoPagination, PhotoReview} from "./reviews"

const Products = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <MonthlyBestReview />
      <PhotoReview />
      <PhotoPagination />
      <h2 className="flex justify-left mt-8"><strong>리뷰</strong></h2>
      <GeneralReview />
      <GeneralReview />
      <GeneralReview />
      <GeneralPagination />
    </MainLayout>
  )
}

export default Products
