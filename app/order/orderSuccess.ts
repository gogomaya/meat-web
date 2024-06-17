import {addressServices} from "@/services/addressServices"
import {ordersServices} from "@/services/ordersServices"
import {paymentsServices} from "@/services/paymentsServices"
import {shipmentsServices} from "@/services/shipmentsServices"
import {Address} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {Order, OrderParams} from "@/types/ordersTypes"
import {Payment} from "@/types/paymentsTypes"
import {Shipment} from "@/types/shipmentsTypes"
import {LocalLaundryService} from "@mui/icons-material"


/**
 * - 배송 등록하고 shipment_pk 돌려주고
 */
interface PaySuccessResult {
  result: false
  shipmentResult: false
  orderResult: false
  paymentResult: false
  order_pk: 0
  shipment_pk: 0
  address_pk: 0
  payment_pk: 0
}

export const orderSuccess = async (searchParams: OrderParams): Promise<PaySuccessResult> => {
  let {
    order_pk, order_id, amount, address_pk, payment_key, guest_name, guest_mobile,
    recipient, recipient_mobile, address, address_detail
  } = searchParams
  let result = false
  let shipmentResult = false
  let orderResult = false
  let paymentResult = false
  let shipment_pk = 0
  let payment_pk = 0

  // 비회원 배송지 등록
  const newAddress: Omit<Address, "address_pk" | "created_at"> = {
    user_pk: 0,
    recipient: recipient,
    address: address,
    address_detail: address_detail,
    mobile: recipient_mobile,
    is_primary: 1,
    delivery_request: "",
    delivery_method: ""
  }

  if( recipient && recipient_mobile && address ) {
    try {
      const addressCreateResult: ResponseApi = await addressServices.addressCreate(newAddress)
      console.dir(addressCreateResult)
      if( addressCreateResult.data.status == 200 ) {
        console.log("비회원 새 배송지 등록 성공")
        address_pk = addressCreateResult.data.address_pk
        console.log(`등록된 배송지 번호 : ${addressCreateResult.data.address_pk}`)

      }
    } catch (error) {
      console.error("[결제완료] 비회원 새 배송지 등록 중 오류 발생:", error)
    }


  }

  // 배송 등록
  try {
    const shipment = {
      address_pk: address_pk,
      status: "pending"
    } as Shipment
    const shipmentCreateResult: ResponseApi = await shipmentsServices.shipmentCreate(shipment)
    const responseStatus = shipmentCreateResult.data.status
    if( responseStatus == 200 ) {
      console.log("배송 등록 성공!!")
      shipmentResult = true
      shipment_pk = shipmentCreateResult.data.shipment_pk
    }
  } catch (error) {
    console.error("[결제완료] 배송 등록 중 오류 발생:", error)
  }


  // 주문 업데이트
  console.log("::::::::::::::: 주문 업데이트 ::::::::::::::")
  console.log(`order_pk : ${order_pk}`)
  console.log(`address_pk : ${address_pk}`)
  console.log(`guest_name : ${guest_name}`)
  console.log(`guest_mobile : ${guest_mobile}`)


  try {
    const order = {
      order_pk: order_pk,
      address_pk: address_pk,
      guest_name: guest_name,
      guest_mobile: guest_mobile,
      status: "paid"
    } as Order
    const orderUpdateResult: ResponseApi = await ordersServices.ordersUpdate(order)
    console.log("❤❤❤❤❤❤❤❤❤❤❤❤")
    console.log(orderUpdateResult)
    const responseStatus = orderUpdateResult.data.status
    if (responseStatus === 200) {
      console.log("주문 수정 성공!!")
      orderResult = true
    }
  } catch (error) {
    console.error("[결제완료] 주문 업데이트 중 오류 발생:", error)
  }


  // 결제 등록
  try {
    const payment = {
      order_pk : order_pk,
      status : "completed",
      payment_key : payment_key
    } as Payment
    const paymentCreateResult: ResponseApi = await paymentsServices.paymentCreate(payment)
    const responseStatus = paymentCreateResult.data.status
    if( responseStatus == 200 ) {
      console.log("결제 등록 성공!!")
      paymentResult = true
      payment_pk = paymentCreateResult.data.payment_pk
    }
  } catch (error) {
    console.error("[결제완료] 결제 등록 중 오류 발생:", error)
  }

  // ⚡ 토스 결제 승인 API 호출
  // payment_key
  // order_id
  // amount
  console.log("⚡ 토스 결제 승인 요청")
  console.log(`payment_key  : ${payment_key}`)
  console.log(`order_id  : ${order_id}`)
  console.log(`amount  : ${amount}`)

  fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: "Basic dGVzdF9nc2tfZG9jc19PYVB6OEw1S2RtUVhrelJ6M3k0N0JNdzY6",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      orderId: order_id,
      amount: amount,
      paymentKey: payment_key
    })
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          // TODO: 결제 실패 비즈니스 로직을 구현하세요.
          console.log(":::::::::::: ⚡ 결제 승인 실패 ::::::::::::")
          console.log(error)
        })
      }
      return response.json()
    })
    .then((data) => {
      // TODO: 결제 성공 비즈니스 로직을 구현하세요.
      console.log(":::::::::::: ⚡ 결제 승인 성공 ::::::::::::")
      console.log(data)
    })
    .catch((error) => {
      console.error("Fetch error:", error)
    })



  result = shipmentResult && orderResult && paymentResult
  // 결과
  const paySuccessResult = {
    result : result || false,
    shipmentResult : shipmentResult || false,
    orderResult : orderResult || false,
    paymentResult : paymentResult || false,
    order_pk : order_pk || 0,
    payment_pk : payment_pk || 0
  } as PaySuccessResult
  return paySuccessResult
}
