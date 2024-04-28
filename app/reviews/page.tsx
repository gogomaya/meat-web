import MainLayout from "@/app/main-layout"
import {GeneralPagination, GeneralReview, MonthlyBestReview, PhotoPagination, PhotoReview, ReviewCard} from "./reviews"
import {usersServices} from "@/services/usersServices"

const Products = async () => {
  const user = await usersServices.loginCheck(false)
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
