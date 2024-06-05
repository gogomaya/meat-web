import ErrorPage from "@/app/error"
import MainLayout from "@/app/main-layout"
import {loginCheck} from "@/app/users/login/loginCheck"
import {addressServices} from "@/services/addressService"
import {orderItemsService} from "@/services/orderItemsServices"
import {ordersServices} from "@/services/ordersServices"
import {usersServices} from "@/services/usersServices"
import {AddressSearchParams} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {OrderItemSearchParams} from "@/types/orderItemsTypes"
import {Order} from "@/types/ordersTypes"
import {User} from "@/types/usersTypes"
import {redirect} from "next/navigation"
import {OrderDetailContent, OrderSuccessContent} from "../order"

/**
 * 결제 성공
 * TODO:
 * - 결제 성공 UI
 * - 토스에 결제 승인 요청
 * - 주문 테이블에 상태 PAID
 * - 결제 테이블 등록(INSERT)
 * @param props
 * @returns
 */
const OrderSuccess = async (props: {
  params: {},   // 경로 변수
  searchParams: {
    orderPk : number,
    orderId : string,
    addressPk : number,
    paymentType : string,
    paymentKey : string,
    amount : number
  }              // 쿼리 스트링 파라미터
}) => {
  const {user} = await loginCheck(false)

  const order_pk = props.searchParams.orderPk
  const order_id = props.searchParams.orderId
  const address_pk = props.searchParams.addressPk
  const paymentType = props.searchParams.paymentType
  const paymentKey = props.searchParams.paymentKey
  const amount = props.searchParams.amount

  console.log(":::::::::: 결제 완료 데이터 ::::::::::")
  console.log(`orderPk : ${order_pk}`)
  console.log(`orderId : ${order_id}`)
  console.log(`addressPk : ${address_pk}`)
  console.log(`paymentType : ${paymentType}`)
  console.log(`paymentKey : ${paymentKey}`)
  console.log(`amount : ${amount}`)
  console.log("::::::::::::::::::::::::::::::::::::")


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
      {/* <OrderSuccessContent order={order} orderItems={orderItems} userInfo={userInfo} addressList={addressList} /> */}
    </MainLayout>
  )
}

export default OrderSuccess
