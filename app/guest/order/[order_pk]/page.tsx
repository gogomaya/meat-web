import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"

import {Order} from "@/types/ordersTypes"
import {ResponseApi} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {orderItemsService} from "@/services/orderItemsServices"
import {OrderItemSearchParams} from "@/types/orderItemsTypes"
import ErrorPage from "@/app/error"
import {redirect} from "next/navigation"
import {OrderDetailContent, Post} from "../GuestOrder"

/**
 * 주문서 작성
 * - /order/{order_pk}
 *  - order_pk 로 주문 정보 조회 후 출력
 * - 이 화면에 오기전 에 이미 주문은 등록된다.
 * - [주문하기] 버튼 클릭하는 화면들에서는
 *    API 로 주문 등록 요청 후, orderId 를 응답받고
 *    여기로 (/order/{order_pk}) 로 리다이렉트
 * - [결제하기]
 *  - 결제 성공 ➡ /order/success
 *  - 결제 실패 ➡ /order/fail
 * @param props
 * @returns
 */
const OrderPay = async (props: {
  params: {order_pk: number},   // 경로 변수
  searchParams: {guest: number}              // 쿼리 스트링 파라미터
}) => {
  const {user} = await loginCheck(false)
  const order_pk = props.params.order_pk
  const guest = props.searchParams.guest || 0
  // console.log("주문 등록 완료 후")
  // console.log(":::::::::::::::::: [주문서 작성]:::::::::::::::::: ")
  // console.log ("/ordre/{order_pk}")
  // console.log(`order_pk : ${order_pk}`)

  let title = "주문서 조회 실패"
  let text = "잘못된 주문 번호입니다."
  let redirectUrl = "/"
  // ✅ 한글을 url 에 담을 때 인코딩 필수
  title = encodeURIComponent(title)
  text = encodeURIComponent(text)

  if( !order_pk || isNaN(order_pk) ) {
    let url = `/redirect?redirectUrl=${redirectUrl}&title=${title}&text=${text}&icon=warning`
    redirect(url)
  }

  let ordersResponse: ResponseApi = {}
  let orderItemsResponse: ResponseApi = {}
  let orderItems = []
  // 주문 정보 조회
  // 주문 항목 리스트 조회
  let order : Order = {
    order_pk: order_pk || 0,
    order_id: "",
    address_pk: 0,
    user_pk: user.user_pk || 0,
    shipment_pk: 0,
    title: "",
    total_count: 0,
    status: "pending",
    created_at: "",
    shipfee: 0,
    discount: 0,
    file_name: "",
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
    // console.log(":::::::::: ordersResponse ::::::::::")
    // console.log(ordersResponse)
    order = ordersResponse.data.order     // ⭐주문 정보
    orderItemsResponse = await orderItemsService.orderItemsRead(searchParams)
    // console.log(":::::::::: orderItemsResponse ::::::::::")
    // console.log(orderItemsResponse)
    orderItems = orderItemsResponse.data.orderItems // ⭐주문 항목 정보
    // console.log(orderItems)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }


  if( guest && guest == 1 ) {
    console.log("::::::::::::::::: 비회원 주문 ::::::::::::::")
  }

  return (
    <MainLayout user={user}>
      <div>
        <div className="flex justify-center text-red-700 text-4xl"
          style={{
            backgroundImage: "url('/images/Bg_3.png')",
            backgroundPosition: "center calc(10% - 620px)",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            textAlign: "center",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>주문서</div>
      </div>
      <OrderDetailContent order={order} orderItems={orderItems} guest={guest}  />
    </MainLayout>
  )
}

export default OrderPay


