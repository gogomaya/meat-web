import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../mypage"
import Link from "next/link"
import {AddressSearchParams} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {addressServices} from "@/services/addressService"
import ErrorPage from "@/app/error"

const Home = async (props: {
  searchParams: AddressSearchParams
}) => {
  const {user} = await loginCheck(false)
  const searchParams = {
    user_pk: user.user_pk,
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 5,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "address_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as AddressSearchParams
  let addressResponse: ResponseApi = {}
  let addressList = []
  let lastPage = 0
  try {
    addressResponse = await addressServices.addressRead(searchParams)
    addressList = addressResponse.data.bookmarks
    lastPage = Math.floor(addressResponse.data.total_rows / searchParams.rowsPerPage)
    console.log("lastPage :" + lastPage)
    console.log(`찜리스트 없음 : ${addressList == null || addressList.length == 0}`)
    console.log(addressList)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const page = searchParams.page
  const prev = searchParams.page == 0 ? 0 : searchParams.page-1
  const next = searchParams.page+1
  console.log("prev : " + prev)
  console.log("next : " + next)
  console.log("lastPage : " + lastPage)

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Address" subTitle="배송지 관리" />
        <div className="flex">
          <Side></Side>
          <div className="container py-16">
            {/* 목록 */}
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 버튼 */}
              <div className="w-full flex gap-6 max-w-4xl">
                <Link
                  href={"/mypage/address/create"}
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span>배송지 추가</span>
                </Link>
              </div>

              {/* 카드 */}
              <div className="w-full flex flex-col gap-2 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="item">
                  <div className="flex justify-between items-center">
                    <div className="item">
                      <span className="text-2xl font-bold">김한솔</span>
                    </div>
                    <div className="item">
                      <div className="flex gap-2 items-center px-10 py-1 rounded-lg text-white font-medium bg-[#A51C30]">
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="">기본 배송지</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex flex-col gap-1">
                    <p>대전광역시 서구 둔산3동 1862번지</p>
                    <p>103동 1801호</p>
                    <p>010-0000-0000</p>
                  </div>
                </div>
                <div className="item">
                  <div className="flex justify-end items-center">
                    <Link
                      href={"/mypage/address/update"}
                      className="px-16 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                    >
                    수정하기
                    </Link>
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
