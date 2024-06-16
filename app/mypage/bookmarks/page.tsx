import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ListEmpty, MyPageBanner, MyPagination, Side} from "../mypage"
import Image from "next/image"
import {BookmarkSearchParams} from "@/types/bookmarksTypes"
import {ResponseApi} from "@/types/commonTypes"
import {bookmarksServices} from "@/services/bookmarksServices"
import ErrorPage from "@/app/error"
import Link from "next/link"
import {BookMarkList} from "./bookmarks"
import {myPageData} from "../mypageData"

const Home = async (props: {
  searchParams: BookmarkSearchParams
}) => {
  const {user} = await loginCheck(false)
  const {bookmarkCount,addressCount} = await myPageData(user)



  const searchParams = {
    user_pk: user.user_pk,
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 5,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "bookmark_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as BookmarkSearchParams
  let bookmarksResponse: ResponseApi = {}
  let bookmarks = []
  let lastPage = 0


  try {
    bookmarksResponse = await bookmarksServices.bookmarksRead(searchParams)
    bookmarks = bookmarksResponse.data.bookmarks
    // lastPage = Math.floor(bookmarksResponse.data.total_rows / searchParams.rowsPerPage)
    // lastPage = Math.ceil(bookmarksResponse.data.total_rows / searchParams.rowsPerPage) - 1
    // console.log("lastPage :" + lastPage)
    // console.log(`찜리스트 없음 : ${bookmarks == null || bookmarks.length == 0}`)
    // console.log(bookmarks)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const page = searchParams.page
  const prev = searchParams.page == 0 ? 0 : searchParams.page-1
  const next = searchParams.page+1
  console.log("prev : " + prev)
  console.log("next : " + next)
  console.log("lastPage : " + lastPage)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Wish List" subTitle="찜 리스트" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            {bookmarks == null || bookmarks.length == 0
              ?
              <>
                <ListEmpty />
                <div className="flex justify-center gap-6 my-6">
                  <Link href={"/products"} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" >
                    <span className="mr-2">쇼핑하러 가기</span>
                  </Link>
                </div>
              </>
              :
              <>
                <BookMarkList bookmarks={bookmarks} />
                <MyPagination domain={"bookmarks"} page={page} prev={prev} next={next} lastPage={lastPage}/>
              </>
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
