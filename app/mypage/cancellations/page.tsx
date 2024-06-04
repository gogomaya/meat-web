import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../mypage"
import Link from "next/link"
import {myPageData} from "../mypageData"

const Home = async () => {
  const {user} = await loginCheck(false)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Withdraw Order" subTitle="취소/반품/환불" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            {/* 목록 */}
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 취소 안내 */}
              <div className="w-full flex gap-6 max-w-4xl">
                <ul>
                  <li>
                    - 취소/반품/환불 신청한 내역을 확인할 수 있습니다.
                  </li>
                  <li>
                    - 하단 상품목록에 없는 상품은 고객센터로 문의주세요.
                  </li>
                  <li>
                    - 계좌환불의 경우 회원정보 수정에서 계좌정보를 등록해주세요.
                  </li>
                </ul>
              </div>
              {/* 카드 */}
              <div className="w-full flex flex-col max-w-4xl bg-white border-2 border-solid border-gray-500 shadow-md">
                <div className="item">
                  <div className="flex justify-start bg-gray-100 border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="font-bold">
                        주문번호 : <span className="">12098390128</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex justify-between border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="text-sm">
                        취소 접수일 : <span className="">2024/05/26</span>
                      </p>
                    </div>
                    <div className="item p-2">
                      <p className="text-sm">
                        주문일 : <span className="">2024/05/19</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item p-2">
                  <div className="flex justify-between items-center">
                    <div className="item flex-[2]">
                      <p className="font-bold text-xl">한우 특수부위모둠</p>
                    </div>
                    <div className="item flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <p className="">
                          <span>1</span>개
                        </p>
                        <p className="font-bold">
                          <span>219,000</span>원
                        </p>
                      </div>
                    </div>
                    <div className="item flex-1">
                      <div className="inner">
                        <Link
                          href={"/mypage/cancellations/detail"}
                          className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          취소 상세
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex flex-col max-w-4xl bg-white border-2 border-solid border-gray-500 shadow-md">
                <div className="item">
                  <div className="flex justify-start bg-gray-100 border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="font-bold">
                        주문번호 : <span className="">12098390128</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex justify-between border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="text-sm">
                        취소 접수일 : <span className="">2024/05/26</span>
                      </p>
                    </div>
                    <div className="item p-2">
                      <p className="text-sm">
                        주문일 : <span className="">2024/05/19</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item p-2">
                  <div className="flex justify-between items-center">
                    <div className="item flex-[2]">
                      <p className="font-bold text-xl">한우 특수부위모둠</p>
                    </div>
                    <div className="item flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <p className="">
                          <span>1</span>개
                        </p>
                        <p className="font-bold">
                          <span>219,000</span>원
                        </p>
                      </div>
                    </div>
                    <div className="item flex-1">
                      <div className="inner">
                        <Link
                          href={"/mypage/cancellations/detail"}
                          className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          취소 상세
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex flex-col max-w-4xl bg-white border-2 border-solid border-gray-500 shadow-md">
                <div className="item">
                  <div className="flex justify-start bg-gray-100 border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="font-bold">
                        주문번호 : <span className="">12098390128</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex justify-between border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="text-sm">
                        취소 접수일 : <span className="">2024/05/26</span>
                      </p>
                    </div>
                    <div className="item p-2">
                      <p className="text-sm">
                        주문일 : <span className="">2024/05/19</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item p-2">
                  <div className="flex justify-between items-center">
                    <div className="item flex-[2]">
                      <p className="font-bold text-xl">한우 특수부위모둠</p>
                    </div>
                    <div className="item flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <p className="">
                          <span>1</span>개
                        </p>
                        <p className="font-bold">
                          <span>219,000</span>원
                        </p>
                      </div>
                    </div>
                    <div className="item flex-1">
                      <div className="inner">
                        <Link
                          href={"/mypage/cancellations/detail"}
                          className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          취소 상세
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex flex-col max-w-4xl bg-white border-2 border-solid border-gray-500 shadow-md">
                <div className="item">
                  <div className="flex justify-start bg-gray-100 border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="font-bold">
                        주문번호 : <span className="">12098390128</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex justify-between border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="text-sm">
                        취소 접수일 : <span className="">2024/05/26</span>
                      </p>
                    </div>
                    <div className="item p-2">
                      <p className="text-sm">
                        주문일 : <span className="">2024/05/19</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item p-2">
                  <div className="flex justify-between items-center">
                    <div className="item flex-[2]">
                      <p className="font-bold text-xl">한우 특수부위모둠</p>
                    </div>
                    <div className="item flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <p className="">
                          <span>1</span>개
                        </p>
                        <p className="font-bold">
                          <span>219,000</span>원
                        </p>
                      </div>
                    </div>
                    <div className="item flex-1">
                      <div className="inner">
                        <Link
                          href={"/mypage/cancellations/detail"}
                          className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          취소 상세
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 카드 */}
              <div className="w-full flex flex-col max-w-4xl bg-white border-2 border-solid border-gray-500 shadow-md">
                <div className="item">
                  <div className="flex justify-start bg-gray-100 border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="font-bold">
                        주문번호 : <span className="">12098390128</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex justify-between border-b-2 border-solid border-gray-500 items-center">
                    <div className="item p-2">
                      <p className="text-sm">
                        취소 접수일 : <span className="">2024/05/26</span>
                      </p>
                    </div>
                    <div className="item p-2">
                      <p className="text-sm">
                        주문일 : <span className="">2024/05/19</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item p-2">
                  <div className="flex justify-between items-center">
                    <div className="item flex-[2]">
                      <p className="font-bold text-xl">한우 특수부위모둠</p>
                    </div>
                    <div className="item flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <p className="">
                          <span>1</span>개
                        </p>
                        <p className="font-bold">
                          <span>219,000</span>원
                        </p>
                      </div>
                    </div>
                    <div className="item flex-1">
                      <div className="inner">
                        <Link
                          href={"/mypage/cancellations/detail"}
                          className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          취소 상세
                        </Link>
                      </div>
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
