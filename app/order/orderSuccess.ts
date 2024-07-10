import {addressServices} from "@/services/addressServices"
import {orderItemsService} from "@/services/orderItemsServices"
import {ordersServices} from "@/services/ordersServices"
import {paymentsServices} from "@/services/paymentsServices"
import {productsServices} from "@/services/productsServices"
import {shipmentsServices} from "@/services/shipmentsServices"
import {Address} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {OrderItemSearchParams} from "@/types/orderItemsTypes"
import {Order, OrderParams} from "@/types/ordersTypes"
import {Payment} from "@/types/paymentsTypes"
import {Product} from "@/types/productsTypes"
import {Shipment} from "@/types/shipmentsTypes"
import {LocalLaundryService} from "@mui/icons-material"
import {v4 as uuidv4} from "uuid"
import {ChannelIOComponent} from "../channelIo"

declare global {
  interface Window {
    ChannelIO?: {
      (...args: any[]): void;
      q?: any[];
      c?: (args: IArguments) => void;
    };
    ChannelIOInitialized?: boolean;
  }
}
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
  console.log(`shipment_pk : ${shipment_pk}`)
  console.log(`guest_name : ${guest_name}`)
  console.log(`guest_mobile : ${guest_mobile}`)

  // 주문 내용 수정
  try {
    const order = {
      order_pk: order_pk,
      address_pk: address_pk,
      shipment_pk: shipment_pk,
      guest_name: guest_name,
      guest_mobile: guest_mobile,
      status: "paid"
    } as Order
    const orderUpdateResult: ResponseApi = await ordersServices.ordersUpdate(order)
    // console.log("❤❤❤❤❤❤❤❤❤❤❤❤")
    // console.log(orderUpdateResult)
    const responseStatus = orderUpdateResult.data.status
    if (responseStatus === 200) {
      console.log("주문 수정 성공!!")
      orderResult = true
    }
  } catch (error) {
    console.error("[결제완료] 주문 업데이트 중 오류 발생:", error)
  }

  // TODO: 재고 업데이트 (결제) - 여기 결제 성공됐을 때 맞음?
  // order_pk 로 order_items 리스트 조회
  // ➡ 반복 (order_item - product_pk, quantity)
  // ➡ 상품 재고 (quantity)만큼 감소
  try {
    const searchParams = {
      order_pk : order_pk,
      rowsPerPage: null,
      page: null,
      orderColumn: "order_pk",
      orderDirection: "desc",
      query: ""
    } as OrderItemSearchParams
    // order_pk로 order_items 리스트 조회
    const orderItemsResult: ResponseApi = await orderItemsService.orderItemsRead(searchParams)
    const orderItems = orderItemsResult.data.orderItems

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new Error("주어진 order_pk로 orderItem을 조회할 수 없습니다")
    }

    // 각 order_item에 대해 재고 업데이트
    for (const orderItem of orderItems) {
      const {product_pk, quantity} = orderItem
      const productResult = await productsServices.productsDetail(product_pk)
      const product = productResult.data.product
      if (!product) {
        throw new Error(`상품을 조회할 수 없습니다: ${product_pk}`)
      }
      // 재고 수량이 주문량보다 많을 시 주문성공 한번 더 막기
      if (product.stock < quantity) {
        throw new Error(`해당 수량만큼 재고가 없습니다. 상품 수량을 다시 확인해주세요. ${product_pk}.`)
      }
      const updatedProduct = {
        ...product,
        stock: product.stock - quantity
      }
      // 재고 업데이트 API 호출
      const uuid = uuidv4()
      const productsUpdateResult = await productsServices.productStockUpdate(updatedProduct)

      const responseStatus = productsUpdateResult.data.status
      if (responseStatus === 200) {
        console.log("재고 업데이트 성공!!")
        if(product.stock === 0) {
          product.is_sold_out = true
        }
      } else {
        throw new Error(`해당 상품 재고를 업데이트 할 수 없습니다 : ${product_pk}.`)
      }
    }
  } catch (error) {
    console.log("[결제완료] 재고 업데이트 중 오류 발생:", error)
  }

  // 채널톡 이용해 카카오톡으로 주문완료 알림 전달
  // ChannelIO('track', 'OrderRequest');

  // TODO: 장바구니 비우기 (결제 완료)
  // order_pk로 order_items 리스트 조회
  // -> 반복 (order_item - product_pk, quantity)
  // -> 장바구니 비우기


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

  // const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";   // 👩‍💻 개발
  const widgetSecretKey = "live_gsk_4yKeq5bgrpWK5Y4ga16LVGX0lzW6"      // 💻 운영
  const encryptedSecretKey =
    "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64")

  fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      // Authorization: "Basic dGVzdF9nc2tfZG9jc19PYVB6OEw1S2RtUVhrelJ6M3k0N0JNdzY6", // 👩‍💻 개발 (테스트)
      Authorization: encryptedSecretKey,                                              // 💻 운영
      // Authorization: "Basic bGl2ZV9nc2tfNHlLZXE1YmdycFdLNVk0Z2ExNkxWR1gwbHpXNjo=",
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


  // ⚡ 토스 결제 상태 확인 요청
  // const paymentKey = payment_key
  // fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Basic dGVzdF9nc2tfZG9jc19PYVB6OEw1S2RtUVhrelJ6M3k0N0JNdzY6",
  //     "Content-Type": "application/json"
  //   }
  // })
  // .then((response) => {
  //   if (!response.ok) {
  //     return response.json().then((error) => {
  //       // TODO: 결제 조회 실패 비즈니스 로직을 구현하세요.
  //       console.log(":::::::::::: ⚡ 결제 조회 실패 ::::::::::::")
  //       console.log(error)
  //     });
  //   }
  //   return response.json();
  // })
  // .then((data) => {
  //   // TODO: 결제 조회 성공 비즈니스 로직을 구현하세요.
  //   console.log(":::::::::::: ⚡ 결제 조회 성공 ::::::::::::")
  //   console.log(data);
  // })
  // .catch((error) => {
  //   console.error("Fetch error:", error);
  // });



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
