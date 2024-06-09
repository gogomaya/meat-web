import {RemoveOrderItem} from "@/app/carts/Carts"
import ErrorPage from "@/app/error"
import MainLayout from "@/app/main-layout"
import {OrderSuccessContent} from "@/app/order/Order"
import {loginCheck} from "@/app/users/login/loginCheck"
import {addressServices} from "@/services/addressService"
import {orderItemsService} from "@/services/orderItemsServices"
import {ordersServices} from "@/services/ordersServices"
import {paymentsServices} from "@/services/paymentsServices"
import {usersServices} from "@/services/usersServices"
import {Address, AddressSearchParams} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {Order, OrderParams} from "@/types/ordersTypes"
import {Payment} from "@/types/paymentsTypes"
import {User} from "@/types/usersTypes"
import {redirect} from "next/navigation"

/**
 * 결제 성공
 * TODO:
 * - 토스에 결제 승인 요청
 * - 주문 테이블에 상태 PAID
 * - 결제 테이블 등록(INSERT)
 * - 결제 성공 UI ✅
 * - 배송 테이블 등록 ✅
 * @param props
 * @returns
 */
const PaymentSuccess = async (props: {
  params: {payment_pk : number,},  // 경로 변수
  searchParams: {}                // 쿼리 스트링 파라미터
}) => {
  const {user} = await loginCheck(false)
  let order_pk = 0
  let address_pk = 0
  let payment : Payment = {} as Payment
  let order : Order = {} as Order
  let orderItems : OrderItem[] = {} as OrderItem[]
  let address : Address = {} as Address
  let userInfo : User = {} as User
  let orderItemSearchParams : OrderItemSearchParams = {rowsPerPage: 1000, page: 0} as OrderItemSearchParams


  // 결제 정보 조회
  const payment_pk = props.params.payment_pk
  console.log(`payment_pk : ${payment_pk}`)

  if( !payment_pk || isNaN(payment_pk) ) {
    console.log(`payment_pk : ${payment_pk}`)
    console.log("잘못된 접급입니다.")
    return <ErrorPage/>
  }

  try {
    const paymentResponse = await paymentsServices.paymentDetail(payment_pk)
    console.log(paymentResponse.data)
    if( paymentResponse.data.status == 200 ) {
      console.log("[결제 완료] - 결제 정보 조회 성공!")
      payment = paymentResponse.data.payment
      console.log(":::::::::::::::: payment ::::::::::::::::")
      console.log(payment)
    }
  } catch (error) {
    return <ErrorPage/>
  }

  // 주문 정보/주문 항목리스트 조회
  try {
    order_pk = payment.order_pk
    const orderResponse = await ordersServices.ordersDetail(order_pk)
    if( orderResponse.data.status == 200 ) {
      console.log("[결제 완료] - 주문 정보 조회 성공!")
      order = orderResponse.data.order
      console.dir(order)
    }
    orderItemSearchParams.order_pk = order_pk
    console.log(`orderItemSearchParams :  ${orderItemSearchParams}`)

    const orderItemsResponse = await orderItemsService.orderItemsRead(orderItemSearchParams)
    if( orderItemsResponse.data.status == 200 ) {
      console.log("[결제 완료] - 주문 항목 리스트 조회 성공!")
      orderItems = orderItemsResponse.data.orderItems
      console.dir(orderItems)
    }
  } catch (error) {
    return <ErrorPage />
  }

  // 배송지 정보 조회
  try {
    address_pk = order.address_pk
    const addressResponse = await addressServices.addressDetail(address_pk)
    if( addressResponse.data.status == 200 ) {
      console.log("배송지 조회 성공!")
      address = addressResponse.data.address
      console.dir(address)
    }
  } catch (error) {
    return <ErrorPage />
  }

  // 주문자 정보 조회
  try {
    const user_pk = order.user_pk || 0
    let userResponse = await usersServices.usersDetail(user_pk)
    if( userResponse.data.status == 200 ) {
      console.log("주문자 정보 조회 성공!")
      userInfo = userResponse.data.user
      console.dir(userInfo)
    }
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }


  return (
    <MainLayout user={user}>
      <div>
        <div className="flex justify-center text-red-100 text-4xl"
          style={{
            backgroundImage: "url('/images/Bg.png')",
            backgroundPosition: "center calc(10% - 620px)",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            textAlign: "center",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>주문 완료</div>
      </div>
      <OrderSuccessContent order={order} orderItems={orderItems} userInfo={userInfo} address={address} />
      {/* 주문한 장바구니 삭제 */}
      <RemoveOrderItem items={orderItems} />
    </MainLayout>
  )
}

export default PaymentSuccess
