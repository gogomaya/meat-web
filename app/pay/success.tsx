// paymentSuccess.tsx

import {useEffect} from "react"

const PaymentSuccess = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentKey = urlParams.get("paymentKey")
    const orderId = urlParams.get("orderId")
    const amount = urlParams.get("amount")

    async function confirmPayment() {
      const requestData = {
        paymentKey: paymentKey,
        orderId: orderId,
        amount: amount
      }

      try {
        const response = await fetch("/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        })

        const json = await response.json()

        if (!response.ok) {
          // 결제 실패 비즈니스 로직을 구현하세요.
          console.log(json)
          window.location.href = `/fail?message=${json.message}&code=${json.code}`
        }

        // 결제 성공 비즈니스 로직을 구현하세요.
        console.log(json)
      } catch (error) {
        console.error("Error confirming payment:", error)
      }
    }

    confirmPayment()

    const paymentKeyElement = document.getElementById("paymentKey")
    const orderIdElement = document.getElementById("orderId")
    const amountElement = document.getElementById("amount")

    if (paymentKeyElement && orderIdElement && amountElement) {
      orderIdElement.textContent = "주문번호: " + orderId
      amountElement.textContent = "결제 금액: " + amount
      paymentKeyElement.textContent = "paymentKey: " + paymentKey
    }
  }, [])

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <h2>결제 성공</h2>
        <p id="paymentKey"></p>
        <p id="orderId"></p>
        <p id="amount"></p>
      </body>
    </html>
  )
}

export default PaymentSuccess
