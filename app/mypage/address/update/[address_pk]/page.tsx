import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../../../mypage"
import {Address,AddressSearchParams} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {addressServices} from "@/services/addressService"
import ErrorPage from "@/app/error"
import {AddressUpdateForm} from "../../address"
import {myPageData} from "@/app/mypage/mypageData"

const Home = async (props: {
  params: { address_pk: number }
  searchParams: AddressSearchParams
}) => {
  const {user} = await loginCheck(false)
  const {bookmarkCount,addressCount} = await myPageData(user)

  console.log(props.params.address_pk)
  const address_pk = props.params.address_pk
  let addressResponse: ResponseApi = {}
  let address : Address = {
    address_pk: 0,
    mobile: "",
    recipient: "",
    address: "",
    address_detail: "",
    created_at: "",
    delivery_request: "",
    delivery_method: ""
  }
  try {
    addressResponse = await addressServices.addressDetail(address_pk)
    address = addressResponse.data.address
    console.log(":::::::::: 배송지 수정 ::::::::::")
    console.log(address)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Address / 배송지 관리" subTitle="배송지 수정" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              <div className="w-full flex flex-col gap-2 max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* TODO: 주소API 적용하기  */}
                <AddressUpdateForm user={user} addressInfo={address} firstAddress={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
