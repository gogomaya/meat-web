import {ResponseApi} from "@/types/commonTypes"
import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {productsServices} from "@/services/productsServices"
import ErrorPage from "@/app/error"
import {MyPageBanner, OrderList, Side} from "./mypage"

const Home = async () => {
  const {user} = await loginCheck(false)
  let productsHomeResponse: ResponseApi = {}
  try {
    productsHomeResponse = await productsServices.productsHomeLists()
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner></MyPageBanner>
        <div className="fixed top-50 right-0">
          <button data-drawer-target="mypage-sidebar" data-drawer-toggle="mypage-sidebar" aria-controls="mypage-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
        </div>
        <div className="flex">
          <Side></Side>
          <div className="py-16">
          </div>
        </div>
        {/* 주문목록 */}
        {/* <OrderList /> */}
        {/* 취소/반품/환불 내역 */}
        {/* 영수증 조회/출력 */}
      </div>
    </MainLayout>
  )
}

export default Home
