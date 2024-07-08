import {loginCheck} from "@/app/users/login/loginCheck"
import Image from "next/image"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {OrderSearchParams, Order} from "@/types/ordersTypes"
import ErrorPage from "@/app/error"
import moment from "moment"
import {getFormattedDate, getOrderStatusMeaning, getShipmentStatusMeaning} from "@/app/mypage/orders/ordersUtils"
import {usersServices} from "@/services/usersServices"
import {orderItemsService} from "@/services/orderItemsServices"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {myPageData} from "@/app/mypage/mypageData"
import AdminLayout from "@/app/admin-layout"
import {shipmentsServices} from "@/services/shipmentsServices"
import UpdateTrackingNo from "../../../../shipment"

const OrderDetail = async (props: {
  params: { order_pk: number, user_pk: number, address_pk: number, shipment_pk: number }
  searchParams: OrderSearchParams
}) => {
  const {user} = await loginCheck(false)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)

  let ordersResponse: ResponseApi = {}
  let userInfoResponse: ResponseApi = {}
  let shipmentResponse: ResponseApi = {}
  let orderItemsResponse: ResponseApi = {}

  let order_pk = props.params.order_pk
  let user_pk = props.params.user_pk
  let address_pk = props.params.address_pk
  let shipment_pk = props.params.shipment_pk

  let userInfo: any
  let shipmentInfo: any
  let orderItems = []
  let order : Order = {
    order_pk: 0,
    user_pk: 0,
    address_pk: 0,
    shipment_pk: 0,
    title: "",
    total_count: 0,
    status: "pending",
    created_at: "",
    file_name: undefined,
    order_id: "",
    shipfee: 0,
    discount: 0,
    total_discount_price: 0
  }

  const searchParams = {
    order_pk : order_pk,
    rowsPerPage: null,
    page: null,
    orderColumn: "order_pk",
    orderDirection: "desc",
    query: ""
  } as OrderItemSearchParams

  try {
    ordersResponse = await ordersServices.ordersDetail(order_pk)
    order = ordersResponse.data.order
    orderItemsResponse = await orderItemsService.orderItemsRead(searchParams)
    orderItems = orderItemsResponse.data.orderItems
    userInfoResponse = await usersServices.usersDetail(user_pk)
    userInfo = userInfoResponse.data
    // 서버 런타임 오류나는 지점 => TODO 에러처리
    shipmentResponse = await shipmentsServices.shipmentDetail(shipment_pk)
    shipmentInfo = shipmentResponse.data.shipment
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }

  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString()
    return formattedNumber
  }

  return (
    <AdminLayout>
      <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
        <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
          <span className="text-2xl">주문 상세</span>
          <div className="box py-4">
            <p className="text-xl font-bold py-3">주문 정보</p>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">주문 번호</span>
                </div>
              </div>
              <div className="item flex-[3]">
                <div className="inner p-1">
                  <span className="px-3" id="orderPk">
                    {order.order_pk}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">주문 일자</span>
                </div>
              </div>
              <div className="item flex-[3]">
                <div className="inner p-1">
                  <span className="px-3">{moment(order.created_at).format("YYYY/MM/DD")}</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">총 금액</span>
                </div>
              </div>
              <div className="item flex-[3]">
                <div className="inner p-1">
                  <span className="px-3">₩ {formatNumber(order.total_discount_price || 0)} 원</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">주문 상태</span>
                </div>
              </div>
              <div className="item flex-[3]">
                {order.status && (
                  <div className="inner p-1">
                    <span className="px-3">{getOrderStatusMeaning(order.status)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="box">
            <p className="text-xl font-bold py-3">구매자 정보</p>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">성명 또는 닉네임</span>
                </div>
              </div>
              {userInfo?.user?.name || userInfo?.user?.nickname ? (
                <div className="item flex-[3]">
                  <div className="inner p-1">
                    <span className="px-3" id="orderPk">
                      {userInfo.user.name || userInfo.user.nickname}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="item flex-[3] bg-gray-100 text-center">
                  <div className="inner p-1">
                    <span className="px-3 text-gray-400">정보 없음</span>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">전화번호</span>
                </div>
              </div>
              {userInfo?.user?.mobile ? (
                <div className="item flex-[3]">
                  <div className="inner p-1">
                    <span className="px-3">{userInfo.user.mobile}</span>
                  </div>
                </div>
              ) : (
                <div className="item flex-[3] bg-gray-100 text-center">
                  <div className="inner p-1">
                    <span className="px-3 text-gray-400">정보 없음</span>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">가입경로</span>
                </div>
              </div>
              {userInfo?.user?.third_party ? (
                <div className="item flex-[3]">
                  <div className="inner p-1">
                    <span className="px-3">{userInfo.user.third_party}</span>
                  </div>
                </div>
              ) : (
                <div className="item flex-[3] bg-gray-100 text-center">
                  <div className="inner p-1">
                    <span className="px-3 text-gray-400">정보 없음</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="box py-4">
            <p className="text-xl font-bold py-3">배송 정보</p>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center flex items-center justify-center">
                <div className="inner p-1">
                  <span className="font-bold">송장번호</span>
                </div>
              </div>
              <div className="item flex-[3] flex items-center">
                <div className="inner p-1 w-full">
                  {shipmentInfo?.tracking_no ? (
                    <UpdateTrackingNo
                      address_pk={order.address_pk}
                      shipment_pk={order.shipment_pk}
                      initialTrackingNo={shipmentInfo.tracking_no}
                    />
                  ) : order?.status === "pending" ? (
                    <div>결제 대기 상품입니다. 송장번호를 입력할 수 없습니다.</div>
                  ) : (
                    <UpdateTrackingNo
                      address_pk={order.address_pk}
                      shipment_pk={order.shipment_pk}
                      initialTrackingNo={""}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">배송업체</span>
                </div>
              </div>
              <div className="item flex-[3]">
                <div className="inner p-1">
                  <div className="item flex-[3]">
                    <div className="inner p-1">
                      <span className="px-3 text-black">로젠택배</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">배송상태</span>
                </div>
              </div>
              <div className="item flex-[3]">
                <div className="inner p-1">
                  {shipmentInfo?.status? (
                    <span className="px-3" id="orderPk">{getShipmentStatusMeaning( shipmentInfo.status )}</span>
                  ) : (
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3 text-gray-400">정보 없음</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
              <div className="item flex-1 bg-gray-200 text-center">
                <div className="inner p-1">
                  <span className="font-bold">배송등록일자</span>
                </div>
              </div>
              <div className="item flex-[3]">
                <div className="inner p-1">
                  {shipmentInfo?.created_at? (
                    <span className="px-3" id="orderPk">{getFormattedDate(shipmentInfo.created_at)}</span>
                  ) : (
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3 text-gray-400">정보 없음</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl font-bold py-3">구매 목록 상세 정보</p>
          {orderItems.map((item: OrderItem) => (
            <>
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white">
                  <div className="item flex-[2]">
                    <div className="w-full flex justify-between items-center">
                      <div className="item"><span className="text-[#A51C30] font-bold">{item.name}</span></div>
                    </div>
                    <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                      <div className="item flex-1">
                        <Image
                          src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(item.image_file_name))}`}
                          alt=""
                          width={32}
                          height={32}
                          sizes="100vw"
                          className="md:w-16"
                          style={{height: "128px", objectFit: "contain"}}
                          priority />
                      </div>
                      <div className="item flex-[3]">
                        <div className="flex flex-col items-between">
                          <div className="item"><span>{Number(item.discounted_price).toLocaleString()}</span>원</div>
                          <div className="item"><span>{item.quantity}</span>개</div>
                        </div>
                      </div>
                      <div className="item flex-[2]">
                        <div className="flex flex-col items-between gap-3">
                          <div className="item text-center">
                            <p className="font-bold">
                              <span>{(Number(item.discounted_price) * item.quantity).toLocaleString()}</span>원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default OrderDetail