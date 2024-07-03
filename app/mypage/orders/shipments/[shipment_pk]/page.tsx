import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../../../mypage"
import {DeliveryStatusLink, ShipNoCopyButton} from "../shipments"
import {myPageData} from "@/app/mypage/mypageData"
import {addressServices} from "@/services/addressServices"
import {shipmentsServices} from "@/services/shipmentsServices"
import {Shipment} from "@/types/shipmentsTypes"
import {Address} from "@/types/addressTypes"
import ErrorPage from "@/app/error"
import {getShipmentMessage, getShipmentStatusMeaning} from "../../ordersUtils"
import {redirect} from "next/navigation"

/**
 * 마이페이지>주문목록>배송조회
 * ✅ TODO
 * - shipments 데이터 조회
 * - 배송 상태에 따른 안내 메시지 처리
 * @returns
 */
const MyPageShipmentsDetail = async (props: {
  params: {shipment_pk: number},   // 경로 변수
  searchParams: {}              // 쿼리 스트링 파라미터
}) => {
  const {user} = await loginCheck(true)
  const {bookmarkCount,addressCount} = await myPageData(user)
  let shipment : Shipment = {
    status: "pending"
  } as Shipment
  let address : Address = {} as Address
  let address_pk = 0

  const shipment_pk =  props.params.shipment_pk

  // 배송 정보 조회
  try {
    const shipmentResponse = await shipmentsServices.shipmentDetail(shipment_pk)
    if( shipmentResponse.data.status == 200 ) {
      console.log("배송 정보 조회 성공")
      shipment = shipmentResponse.data.shipment
      address_pk = shipment.address_pk
      console.log(`shipment : ${shipment}`)
      console.dir(shipment)
      console.log(`address_pk : ${address_pk}`)

    }
  } catch (error) {
    console.log("배송 정보 조회 실패!")
    console.log(`error : ${error}`)
    // ================= [에러 리다이렉트] =================
    let title = "배송 정보 조회 실패"
    let text = "존재하지 않는 배송 정보입니다."
    let errorCode = "400"
    let redirectUrl = "/mypage/orders"
    title = encodeURIComponent(title)
    text = encodeURIComponent(text)
    let url = `/redirect?errorCode=${errorCode}&redirectUrl=${redirectUrl}&title=${title}&text=${text}&icon=warning`
    redirect(url)
    // ================= [에러 리다이렉트] =================
    return <></>
  }

  // 배송지 정보 조회
  try {
    const addressResponse = await addressServices.addressDetail(address_pk)

    if( addressResponse.data.status == 200 ) {
      console.log("배송지 정보 조회 성공!!")
      address = addressResponse.data.address
      console.log(`address : ${address}`)
      console.dir(address)
    }
  } catch (error) {
    return <></>
  }

  let shipmentStatus = getShipmentStatusMeaning(shipment.status)
  let shipmentStatusMessage = getShipmentMessage(shipment.status)
  console.log(`배송 상태 : ${shipmentStatus}`)



  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="My Page / 주문내역" subTitle="배송조회" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 배송 조회 컨테이너 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                <span className="text-2xl">배송 조회</span>
                {/* 배송 상태 박스 */}
                <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                  <div className="text-center">
                    <p className="text-xl font-bold p-4">{shipmentStatus}</p>
                    <p className="text-lg">고객님이 주문하신 상품이 {shipmentStatusMessage}</p>
                  </div>
                </div>
                {/* 배송 상태 확인 박스 */}
                <div className="box flex flex-col gap-3"
                  style={{
                    opacity: !shipment.tracking_no ? 0.3 : 1
                  }}
                >
                  <DeliveryStatusLink tracking_no={shipment.tracking_no} />
                  <ShipNoCopyButton />
                </div>
                {/* 상세 정보 박스 */}
                <div className="box py-4">
                  <p className="text-xl font-bold py-3">상세 정보</p>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">운송장 번호</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3" id="shipNo">{shipment.tracking_no}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">받는 사람</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{address.recipient}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">전화 번호</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{address.mobile}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">받는 주소</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{address.address}</span>
                        <span className="px-3">{address.address_detail}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">요청 사항</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{address.delivery_request}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">수령 방법</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{address.delivery_method}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default MyPageShipmentsDetail

function isValidInput(pks: any) {
  throw new Error("Function not implemented.")
}

