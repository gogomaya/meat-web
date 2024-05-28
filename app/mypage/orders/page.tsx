import {loginCheck} from "@/app/users/login/loginCheck"
import ErrorPage from "@/app/error"
import MainLayout from "@/app/main-layout"
import {productsServices} from "@/services/productsServices"
import {ResponseApi} from "@/types/commonTypes"
import {MyPageBanner, Side, SideButton} from "../mypage"
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
        <MyPageBanner title="Orders" titleKor="주문내역" />
        <SideButton />
        <div className="flex">
          <Side />
          <div className="container py-16">
            {/* 주문목록 */}
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 주문 카드 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* 주문일자, 상세보기 */}
                <div className="flex justify-between">
                  <div className="item">
                    <span>2025.01.01</span> 주문
                  </div>
                  <div className="item">
                    <a href="#" className="flex justify-between items-center">
                      <span>상세보기</span>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
                  {/* 주문정보 */}
                  <div className="item flex-[2]">
                    {/* 타이틀 */}
                    <div className="w-full flex justify-between items-center px-4 py-2">
                      <div className="item"><span className="text-[#A51C30] font-bold">결제완료</span></div>
                      <div className="item">
                        <button>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* 내용 */}
                    <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                      <div className="item flex-1">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={32}
                          height={32}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                      </div>
                      <div className="item flex-[3]">
                        <div className="flex flex-col items-between">
                          <div className="item"><span>한우 특수부위모둠</span></div>
                          <div className="item"><span>219,000</span>원</div>
                          <div className="item"><span>3</span>개</div>
                        </div>
                      </div>
                      <div className="item flex-[2]">
                        <div className="flex flex-col items-between gap-3">
                          <div className="item">
                            <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full">장바구니</button>
                          </div>
                          {/* 총 가격 */}
                          <div className="item text-center">
                            <p className="font-bold">
                              <span>657,000</span>원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* 버튼 */}
                  <div className="item flex-1">
                    <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        배송조회
                      </button>
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문/배송 취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 주문 카드 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* 주문일자, 상세보기 */}
                <div className="flex justify-between">
                  <div className="item">
                    <span>2025.01.01</span> 주문
                  </div>
                  <div className="item">
                    <a href="#" className="flex justify-between items-center">
                      <span>상세보기</span>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
                  {/* 주문정보 */}
                  <div className="item flex-[2]">
                    {/* 타이틀 */}
                    <div className="w-full flex justify-between items-center px-4 py-2">
                      <div className="item"><span className="text-[#A51C30] font-bold">결제완료</span></div>
                      <div className="item">
                        <button>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* 내용 */}
                    <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                      <div className="item flex-1">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={32}
                          height={32}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                      </div>
                      <div className="item flex-[3]">
                        <div className="flex flex-col items-between">
                          <div className="item"><span>한우 특수부위모둠</span></div>
                          <div className="item"><span>219,000</span>원</div>
                          <div className="item"><span>3</span>개</div>
                        </div>
                      </div>
                      <div className="item flex-[2]">
                        <div className="flex flex-col items-between gap-3">
                          <div className="item">
                            <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full">장바구니</button>
                          </div>
                          {/* 총 가격 */}
                          <div className="item text-center">
                            <p className="font-bold">
                              <span>657,000</span>원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* 버튼 */}
                  <div className="item flex-1">
                    <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        배송조회
                      </button>
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문/배송 취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 주문 카드 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* 주문일자, 상세보기 */}
                <div className="flex justify-between">
                  <div className="item">
                    <span>2025.01.01</span> 주문
                  </div>
                  <div className="item">
                    <a href="#" className="flex justify-between items-center">
                      <span>상세보기</span>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
                  {/* 주문정보 */}
                  <div className="item flex-[2]">
                    {/* 타이틀 */}
                    <div className="w-full flex justify-between items-center px-4 py-2">
                      <div className="item"><span className="text-[#A51C30] font-bold">결제완료</span></div>
                      <div className="item">
                        <button>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* 내용 */}
                    <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                      <div className="item flex-1">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={32}
                          height={32}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                      </div>
                      <div className="item flex-[3]">
                        <div className="flex flex-col items-between">
                          <div className="item"><span>한우 특수부위모둠</span></div>
                          <div className="item"><span>219,000</span>원</div>
                          <div className="item"><span>3</span>개</div>
                        </div>
                      </div>
                      <div className="item flex-[2]">
                        <div className="flex flex-col items-between gap-3">
                          <div className="item">
                            <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full">장바구니</button>
                          </div>
                          {/* 총 가격 */}
                          <div className="item text-center">
                            <p className="font-bold">
                              <span>657,000</span>원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* 버튼 */}
                  <div className="item flex-1">
                    <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        배송조회
                      </button>
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문/배송 취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 주문 카드 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* 주문일자, 상세보기 */}
                <div className="flex justify-between">
                  <div className="item">
                    <span>2025.01.01</span> 주문
                  </div>
                  <div className="item">
                    <a href="#" className="flex justify-between items-center">
                      <span>상세보기</span>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
                  {/* 주문정보 */}
                  <div className="item flex-[2]">
                    {/* 타이틀 */}
                    <div className="w-full flex justify-between items-center px-4 py-2">
                      <div className="item"><span className="text-[#A51C30] font-bold">결제완료</span></div>
                      <div className="item">
                        <button>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* 내용 */}
                    <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                      <div className="item flex-1">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={32}
                          height={32}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                      </div>
                      <div className="item flex-[3]">
                        <div className="flex flex-col items-between">
                          <div className="item"><span>한우 특수부위모둠</span></div>
                          <div className="item"><span>219,000</span>원</div>
                          <div className="item"><span>3</span>개</div>
                        </div>
                      </div>
                      <div className="item flex-[2]">
                        <div className="flex flex-col items-between gap-3">
                          <div className="item">
                            <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full">장바구니</button>
                          </div>
                          {/* 총 가격 */}
                          <div className="item text-center">
                            <p className="font-bold">
                              <span>657,000</span>원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* 버튼 */}
                  <div className="item flex-1">
                    <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        배송조회
                      </button>
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문/배송 취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 주문 카드 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* 주문일자, 상세보기 */}
                <div className="flex justify-between">
                  <div className="item">
                    <span>2025.01.01</span> 주문
                  </div>
                  <div className="item">
                    <a href="#" className="flex justify-between items-center">
                      <span>상세보기</span>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
                  {/* 주문정보 */}
                  <div className="item flex-[2]">
                    {/* 타이틀 */}
                    <div className="w-full flex justify-between items-center px-4 py-2">
                      <div className="item"><span className="text-[#A51C30] font-bold">결제완료</span></div>
                      <div className="item">
                        <button>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* 내용 */}
                    <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                      <div className="item flex-1">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={32}
                          height={32}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                      </div>
                      <div className="item flex-[3]">
                        <div className="flex flex-col items-between">
                          <div className="item"><span>한우 특수부위모둠</span></div>
                          <div className="item"><span>219,000</span>원</div>
                          <div className="item"><span>3</span>개</div>
                        </div>
                      </div>
                      <div className="item flex-[2]">
                        <div className="flex flex-col items-between gap-3">
                          <div className="item">
                            <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full">장바구니</button>
                          </div>
                          {/* 총 가격 */}
                          <div className="item text-center">
                            <p className="font-bold">
                              <span>657,000</span>원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* 버튼 */}
                  <div className="item flex-1">
                    <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        배송조회
                      </button>
                      <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        주문/배송 취소
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
            {/* 주문목록 끝 */}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
