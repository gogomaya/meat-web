// paymentPage.tsx

import {useEffect} from "react"

const PaymentPage = () => {
  useEffect(() => {
    const coupon = document.getElementById("coupon-box") as HTMLInputElement
    const button = document.getElementById("payment-button") as HTMLButtonElement
    const amount = 50000

    const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
    const customerKey = "D3IE__NQNGOTJ_xg4pC9g"
    const paymentWidget = PaymentWidget(widgetClientKey, customerKey)

    const paymentMethodWidget = paymentWidget.renderPaymentMethods(
      "#payment-method",
      {value: amount},
      {variantKey: "DEFAULT"}
    )

    paymentWidget.renderAgreement(
      "#agreement",
      {variantKey: "AGREEMENT"}
    )

    coupon.addEventListener("change", function () {
      if (coupon.checked) {
        paymentMethodWidget.updateAmount(amount - 5000)
      } else {
        paymentMethodWidget.updateAmount(amount)
      }
    })

    button.addEventListener("click", function () {
      paymentWidget.requestPayment({
        orderId: "1W_pCfO4rzG9szJEcThKe",
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234"
      })
    })
  }, [])

  return (
    <div></div>
    // <html lang="ko">
    //   <head>
    //     <meta charSet="utf-8" />
    //     <script src="https://js.tosspayments.com/v1/payment-widget"></script>
    //   </head>
    //   <body>
    //     <div>
    //       <input type="checkbox" id="coupon-box" />
    //       <label htmlFor="coupon-box">5,000원 쿠폰 적용</label>
    //     </div>
    //     <div id="payment-method"></div>
    //     <div id="agreement"></div>
    //     <button id="payment-button">결제하기</button>
    //   </body>
    // </html>
  )
}

export default PaymentPage
