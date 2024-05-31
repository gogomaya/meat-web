import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../../mypage"

const Home = async () => {
  const {user} = await loginCheck(false)
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
                  <button
                    className="w-full px-4 py-2 py-1 bg-[#A51C30] border-2 border-solid border-white rounded-lg text-center text-white font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    수정하기
                  </button>
                  <button
                    className="w-full px-4 py-2 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    삭제하기
                  </button>
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
