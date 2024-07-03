import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ListEmpty, MyPageBanner, MyPagination, Side, SideButton} from "../mypage"
import Link from "next/link"
import {myPageData} from "../mypageData"
import {CancellationSearchParams} from "@/types/cancellationsTypes"
import {cancellationsServices} from "@/services/cancellationsServices"
import ErrorPage from "@/app/error"
import {ResponseApi} from "@/types/commonTypes"
import {log} from "console"
import {CancellationList} from "./cancellations"

const MyPageCancellations = async (props: {
  searchParams: CancellationSearchParams
}) => {
  const {user} = await loginCheck(true)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)

  const searchParams = {
    user_pk: user.user_pk,
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 5,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "cancellation_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as unknown as CancellationSearchParams
  let cancellationResponse: ResponseApi = {}
  let cancellationList = []
  let lastPage = 0

  try {
    cancellationResponse = await cancellationsServices.cancellationRead(searchParams)
    cancellationList = cancellationResponse.data.cancellations
    lastPage = Math.floor(cancellationResponse.data.total_rows / searchParams.rowsPerPage)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  console.log(`cancellationList : ${cancellationList}`)
  console.dir(cancellationList)

  const page = searchParams.page
  const prev = searchParams.page == 0 ? 0 : searchParams.page-1
  const next = searchParams.page+1

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Withdraw Order" subTitle="취소/반품/환불" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            {/* 취소 안내 */}
            <div className="flex justify-center gap-6 my-6">
              <div className="w-full flex gap-6 max-w-4xl">
                <ul>
                  <li>
                    - 취소/반품/환불 신청한 내역을 확인할 수 있습니다.
                  </li>
                  <li>
                    - 하단 상품목록에 없는 상품은 고객센터로 문의주세요.
                  </li>
                </ul>
              </div>
            </div>
            {cancellationList == null || cancellationList.length == 0
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
                <CancellationList cancellationList={cancellationList} />
                <MyPagination domain={"cancellations"} page={page} prev={prev} next={next} lastPage={lastPage}/>
              </>
            }


          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default MyPageCancellations
