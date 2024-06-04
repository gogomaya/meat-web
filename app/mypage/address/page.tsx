import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, MyPagination, Side} from "../mypage"
import Link from "next/link"
import {addressServices} from "@/services/addressService"
import {ResponseApi} from "@/types/commonTypes"
import ErrorPage from "@/app/error"
import {AddressSearchParams} from "@/types/addressTypes"
import {AddressList} from "./address"

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
    addressList = addressResponse.data.addressList
    lastPage = Math.floor(addressResponse.data.total_rows / searchParams.rowsPerPage)
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
            </div>
            <AddressList addressList={addressList} />
            <MyPagination page={page} prev={prev} next={next} lastPage={lastPage}/>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
