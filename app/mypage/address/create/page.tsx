import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../../mypage"
import {AddressForm} from "../address"

const Home = async () => {
  const {user} = await loginCheck(false)

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Address / 배송지 관리" subTitle="배송지 등록" />
        <div className="flex">
          <Side></Side>
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              <div className="w-full flex flex-col gap-2 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* TODO: 주소API 적용하기  */}
                <AddressForm user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
