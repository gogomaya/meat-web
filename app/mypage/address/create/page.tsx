import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../../mypage"
import {AddressForm} from "../address"
import {myPageData} from "../../mypageData"
import {Address} from "@/types/addressTypes"



const Home = async (props: {
  searchParams: {firstAddress : boolean}              // 쿼리 스트링 파라미터
}) => {
  const {user} = await loginCheck(false)
  const {bookmarkCount,addressCount} = await myPageData(user)
  const address :Address = {
    address_pk: 0,
    mobile: "",
    recipient: "",
    address: "",
    address_detail: "",
    created_at: ""
  }
  const firstAddress = props.searchParams.firstAddress
  console.log(`firstAddress : ${firstAddress}`)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Address / 배송지 관리" subTitle="배송지 등록" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              <div className="w-full flex flex-col gap-2 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* TODO: 주소API 적용하기  */}
                <AddressForm user={user} addressInfo={address} firstAddress={firstAddress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
