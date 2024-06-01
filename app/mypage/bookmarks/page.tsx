import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../mypage"
import Image from "next/image"

const Home = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Wish List" subTitle="찜 리스트" />
        <div className="flex">
          <Side></Side>
          <div className="container py-16">
            {/* 목록 */}
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 카드 */}
              <div className="w-full flex gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="item flex-1">
                  <div className="inner">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width={128}
                      height={128}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
                <div className="item flex-[3]">
                  <div className="h-full flex flex-col flex-wrap gap-6 p-1">
                    {/* 상품 간단 설명 */}
                    <div className="item">
                      <span className="text-sm text-gray-500">한우1++</span>
                    </div>
                    {/* 상품명 */}
                    <div className="item">
                      <span className="font-bold">한우 특수부위모둠</span>
                    </div>
                    <div className="item">
                      <p className="font-bold text-[#A51C30]">
                        <span>219,000</span>원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문하기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        장바구니 담기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="item flex-1">
                  <div className="inner">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width={128}
                      height={128}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
                <div className="item flex-[3]">
                  <div className="h-full flex flex-col flex-wrap gap-6 p-1">
                    {/* 상품 간단 설명 */}
                    <div className="item">
                      <span className="text-sm text-gray-500">한우1++</span>
                    </div>
                    {/* 상품명 */}
                    <div className="item">
                      <span className="font-bold">한우 특수부위모둠</span>
                    </div>
                    <div className="item">
                      <p className="font-bold text-[#A51C30]">
                        <span>219,000</span>원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문하기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        장바구니 담기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="item flex-1">
                  <div className="inner">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width={128}
                      height={128}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
                <div className="item flex-[3]">
                  <div className="h-full flex flex-col flex-wrap gap-6 p-1">
                    {/* 상품 간단 설명 */}
                    <div className="item">
                      <span className="text-sm text-gray-500">한우1++</span>
                    </div>
                    {/* 상품명 */}
                    <div className="item">
                      <span className="font-bold">한우 특수부위모둠</span>
                    </div>
                    <div className="item">
                      <p className="font-bold text-[#A51C30]">
                        <span>219,000</span>원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문하기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        장바구니 담기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="item flex-1">
                  <div className="inner">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width={128}
                      height={128}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
                <div className="item flex-[3]">
                  <div className="h-full flex flex-col flex-wrap gap-6 p-1">
                    {/* 상품 간단 설명 */}
                    <div className="item">
                      <span className="text-sm text-gray-500">한우1++</span>
                    </div>
                    {/* 상품명 */}
                    <div className="item">
                      <span className="font-bold">한우 특수부위모둠</span>
                    </div>
                    <div className="item">
                      <p className="font-bold text-[#A51C30]">
                        <span>219,000</span>원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문하기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        장바구니 담기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="item flex-1">
                  <div className="inner">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width={128}
                      height={128}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
                <div className="item flex-[3]">
                  <div className="h-full flex flex-col flex-wrap gap-6 p-1">
                    {/* 상품 간단 설명 */}
                    <div className="item">
                      <span className="text-sm text-gray-500">한우1++</span>
                    </div>
                    {/* 상품명 */}
                    <div className="item">
                      <span className="font-bold">한우 특수부위모둠</span>
                    </div>
                    <div className="item">
                      <p className="font-bold text-[#A51C30]">
                        <span>219,000</span>원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문하기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        장바구니 담기
                      </button>
                    </div>
                    <div className="item">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 페이지네이션 */}
              <div className="flex justify-center gap-6 my-4">
                <button className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
                  </svg>
                  <span className="mr-2">이전</span>
                </button>
                <button className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  <span className="ml-2">다음</span>
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
