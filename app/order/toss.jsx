"use client"
import React, {useEffect, useRef, useState} from "react"
import {loadPaymentWidget, ANONYMOUS} from "@tosspayments/payment-widget-sdk"
import {nanoid} from "nanoid"

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
const customerKey = "N2ZORlnbt0pQTNygmDgHw"
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

export function CheckoutPage({pay}) {
  const [paymentWidget, setPaymentWidget] = useState(null)
  const paymentMethodsWidgetRef = useRef(null)
  const [price, setPrice] = useState(pay.finalPrice)

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey)
        setPaymentWidget(loadedWidget)
      } catch (error) {
        console.error("Error fetching payment widget:", error)
      }
    }

    fetchPaymentWidget()
  }, [])

  useEffect(() => {
    if (paymentWidget == null) {
      return
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      {value: price},
      {variantKey: "DEFAULT"}
    )

    paymentWidget.renderAgreement(
      "#agreement",
      {variantKey: "AGREEMENT"}
    )

    paymentMethodsWidgetRef.current = paymentMethodsWidget
  }, [paymentWidget, price])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current

    if (paymentMethodsWidget == null) {
      return
    }

    paymentMethodsWidget.updateAmount(price)
  }, [price])

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: pay.orderName,
        customerName: pay.customerName,
        customerEmail: pay.customerEmail,
        customerMobilePhone: pay.customerMobilePhone,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`
      })
    } catch (error) {
      console.error("Error requesting payment:", error)
    }
  }

  return (
    <div>
      {/* 할인 쿠폰 */}
      {/* <label htmlFor="coupon-box">
        <input
          id="coupon-box"
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000)
          }}
        />
        <span>5,000원 쿠폰 적용</span>
      </label> */}
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/* 결제하기 버튼 */}
      <div className="w-full flex justify-center items-center">
        <button
          className="text-white p-3 rounded-lg shadow-lg bg-[#271A11]"
          onClick={handlePaymentRequest}
        ><span>{pay.finalPrice.toLocaleString()}원 </span>결제하기</button>
      </div>
      {/* <button onClick={handlePaymentRequest}>결제하기</button> */}
    </div>
  )
}