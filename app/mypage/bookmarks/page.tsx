import {loginCheck} from "@/app/admin/page"
import ErrorPage from "@/app/error"
import MainLayout from "@/app/main-layout"
import {productsServices} from "@/services/productsServices"
import {ResponseApi} from "@/types/commonTypes"
import {MyPageBanner, Side, SideButton} from "../mypage"

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
        <MyPageBanner title="Wish List" titleKor="찜 리스트" />
        <SideButton />
        <div className="flex">
          <Side></Side>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
