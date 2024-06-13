import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../../../mypage"
import Image from "next/image"
import Link from "next/link"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {OrderSearchParams, Order} from "@/types/ordersTypes"
import ErrorPage from "@/app/error"
import moment from "moment"
import {getOrderStatusMeaning} from "../../ordersUtils"
import {orderItemsService} from "@/services/orderItemsServices"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {myPageData} from "@/app/mypage/mypageData"

const OrderDetail = async (props: {
  params: { order_pk: number }
  searchParams: OrderSearchParams
}) => {
  const {user} = await loginCheck(false)

  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)

  let ordersResponse: ResponseApi = {}
  let orderItemsResponse: ResponseApi = {}
  let order_pk = props.params.order_pk
  let orderItems = []
  let order : Order = {
    order_pk: 0,
    user_pk: null,
    shipment_pk: 0,
    title: "",
    total_count: 0,
    status: "pending",
    created_at: "",
    file_name: undefined,
    order_id: "",
    address_pk: 0,
    shipfee: 0,
    discount: 0
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
    console.log(":::::::::: orderItemsResponse ::::::::::")
    console.log(orderItemsResponse)
    orderItems = orderItemsResponse.data.orderItems
    console.log(orderItems)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  console.log(ordersResponse)
  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString()
    return formattedNumber
  }
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Orders / 주문내역" subTitle="주문상세" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 컨테이너 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                <span className="text-2xl">주문 상세</span>
                {/* 상세 정보 박스 */}
                <div className="box py-4">
                  <p className="text-xl font-bold py-3">주문 정보</p>
                  {/* 상세 정보 라인 */}
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
                  {/* 상세 정보 라인 */}
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
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">총 금액</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">₩ {formatNumber(order.total_price || 0)} 원</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">주문 상태</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{getOrderStatusMeaning( order.status )}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TODO: order_items 목록 조회부터~ */}
                <p className="text-xl font-bold py-3">상세 정보</p>
                {orderItems.map((item: OrderItem) => (
                  <>
                    <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                      <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white">
                        {/* 주문정보 */}
                        <div className="item flex-[2]">
                          {/* 타이틀 */}
                          <div className="w-full flex justify-between items-center">
                            <div className="item"><span className="text-[#A51C30] font-bold">{item.name}</span></div>
                          </div>
                          {/* 내용 */}
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
                                <div className="item"><span>{Number(item.price).toLocaleString()}</span>원</div>
                                <div className="item"><span>{item.quantity}</span>개</div>
                              </div>
                            </div>
                            <div className="item flex-[2]">
                              <div className="flex flex-col items-between gap-3">
                                {/* 총 가격 */}
                                <div className="item text-center">
                                  <p className="font-bold">
                                    <span>{(Number(item.price) * item.quantity).toLocaleString()}</span>원
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 버튼 */}
                        <div className="item flex-1">
                          <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                            <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                              장바구니 담기
                            </Link>
                            <Link href={`/order?productPks=${item.product_pk}&quantityList=1`} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                              주문하기
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default OrderDetail