import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../mypage"
import {OrderList} from "./orders"
import {OrderSearchParams} from "@/types/ordersTypes"
import {ResponseApi} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import ErrorPage from "@/app/error"
import Link from "next/link"

const Home = async (props: {
  searchParams: OrderSearchParams
}) => {
  const {user} = await loginCheck(false)
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
    lastPage = Math.floor(ordersResponse.data.total_rows / searchParams.rowsPerPage)
    console.log("lastPage :" + lastPage)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  // console.log(ordersResponse)
  const prev = searchParams.page == 0 ? 0 : searchParams.page-1
  const next = searchParams.page+1
  console.log("next : " + next)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Orders" subTitle="주문내역" />
        <div className="flex">
          <Side />
          <div className="container py-16">
            {/* 주문목록 */}
            <OrderList orders={orders} />
            {/* 주문목록 끝 */}
            {/* 페이지네이션 */}
            <div className="flex justify-center gap-6 my-4">
              <Link href={`/mypage/orders?page=${prev}`} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" >
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                </svg>
                <span className="mr-2">이전</span>
              </Link>
              {next > lastPage ? <></> : (
                <Link href={`/mypage/orders?page=${next}`} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  <span className="ml-2">다음</span>
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
