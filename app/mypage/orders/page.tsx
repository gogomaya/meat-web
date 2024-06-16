import MainLayout from "@/app/main-layout"
import {ListEmpty, MyPageBanner, MyPagination, Side} from "../mypage"
import {OrderList} from "./orders"
import {OrderSearchParams} from "@/types/ordersTypes"
import {ResponseApi} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import ErrorPage from "@/app/error"
import Link from "next/link"
import {loginCheck} from "@/app/users/login/loginCheck"
import {myPageData} from "../mypageData"

/**
 * 마이페이지>주문목록
 * @param props
 * @returns
 */
const Home = async (props: {
  searchParams: OrderSearchParams
}) => {
  const {user} = await loginCheck(false)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)
  const searchParams = {
    user_pk: user.user_pk,
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 5,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "order_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as OrderSearchParams
  let ordersResponse: ResponseApi = {}
  let orders = []
  let lastPage = 0
  try {
    ordersResponse = await ordersServices.ordersRead(searchParams)
    orders = ordersResponse.data.orders
    lastPage = Math.ceil(ordersResponse.data.total_rows / searchParams.rowsPerPage) - 1
    // console.log("lastPage :" + lastPage)
    // console.log(`주문목록 없음 : ${orders == null || orders.length == 0}`)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  // console.log(ordersResponse)
  const page = searchParams.page
  const prev = searchParams.page == 0 ? 0 : searchParams.page-1
  const next = searchParams.page+1
  console.log("prev : " + prev)
  console.log("next : " + next)
  console.log("lastPage : " + lastPage)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Orders" subTitle="주문내역" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            {orders == null || orders.length == 0
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
                {/* 주문 목록 */}
                <OrderList orders={orders} />
                {/* 페이지네이션 */}
                <MyPagination domain={"orders"} page={page} prev={prev} next={next} lastPage={lastPage}/>
                {/* <div className="flex justify-center gap-6 my-4">
                  {lastPage == 0
                    ?
                    <Link href={"/products"} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" >
                      <span className="mr-2">쇼핑하러 가기</span>
                    </Link>
                    : <></>
                  }
                  {prev == lastPage ? <></> : (
                    <Link href={`/mypage/orders?page=${prev}`} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" >
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                      </svg>
                      <span className="mr-2">이전</span>
                    </Link>
                  )}
                  {page+1 == lastPage ? <></> : (
                    <Link href={`/mypage/orders?page=${next}`} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                      <span className="ml-2">다음</span>
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div> */}
              </>
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
