import {loginCheck} from "@/app/users/login/loginCheck"
import ErrorPage from "@/app/error"
import MainLayout from "@/app/main-layout"
import {productsServices} from "@/services/productsServices"
import {ResponseApi} from "@/types/commonTypes"
import {MyPageBanner, Side, SideButton} from "../../mypage"
import Image from "next/image"

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
        <MyPageBanner title="Address / 배송지 관리" subTitle="배송지 등록" />
        <SideButton />
        <div className="flex">
          <Side></Side>
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              <div className="w-full flex flex-col gap-2 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* TODO: 주소API 적용하기  */}
                <form className="ml-auo space-y-4">
                  <input type="text" placeholder="받는 사람" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
                  <input type="text" placeholder="주소" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
                  <input type="text" placeholder="상세 주소" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
                  <input type="text" placeholder="전화번호 (010-0000-0000)" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
                  <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-full">등록하기</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
