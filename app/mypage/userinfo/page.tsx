import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../mypage"
import {UserInfoForm} from "./userinfo"

const Home = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="User Information" subTitle="회원정보 수정" />
        <div className="flex">
          <Side />
          <UserInfoForm/>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
