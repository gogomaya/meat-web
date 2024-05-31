import {loginCheck} from "@/app/users/login/loginCheck"
import ErrorPage from "@/app/error"
import MainLayout from "@/app/main-layout"
import {productsServices} from "@/services/productsServices"
import {ResponseApi} from "@/types/commonTypes"
import {MyPageBanner, Side, SideButton} from "../mypage"
import {UserInfoForm} from "./userinfo"

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
        <MyPageBanner title="User Information" subTitle="회원정보 수정" />
        <SideButton/>
        <div className="flex">
          <Side />
          <UserInfoForm/>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
