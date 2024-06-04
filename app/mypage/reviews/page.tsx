import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ResponseApi} from "@/types/commonTypes"
import {ReviewsSearchParams} from "@/types/reviewsTypes"
import {reviewsServices} from "@/services/reviewsServices"
import {MyPageBanner, Side} from "../mypage"
import {GeneralReviews} from "@/app/reviews/general-reviews"
import {myPageData} from "../mypageData"

const Home = async (props: {
  params: {product_pk: number},
  searchParams: ReviewsSearchParams
}) => {
  const {user} = await loginCheck(true)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)
  const reviewsSearchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    user_pk: user.user_pk
  } as ReviewsSearchParams
  const reviewsResponse: ResponseApi = await reviewsServices.reviewsRead(reviewsSearchParams)
  const {reviews, total_rows} = reviewsResponse.data
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Review" subTitle="리뷰 관리" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          {total_rows === 0 ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <span>리뷰 내역이 없습니다.</span>
            </div>
          ) : (
            <div className="w-full mx-16 mb-8 px-2">
              <GeneralReviews
                user={user}
                reviews={reviews}
                total_rows={total_rows}
                reviewsSearchParams={reviewsSearchParams}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
