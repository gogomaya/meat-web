import {ResponseApi} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {productsServices} from "@/services/productsServices"
import ErrorPage from "@/app/error"
import {MyPageBanner, OrderList, Side, SideButton} from "./mypage"

const Home = async () => {
  const {user} = await loginCheck(false)
  let productsHomeResponse: ResponseApi = {}
  try {
    productsHomeResponse = await productsServices.productsHome()
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Orders" titleKor="주문내역" />
        <SideButton />
        <div className="flex">
          <Side></Side>
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
