// paymentFailure.tsx

import {useEffect} from "react"

const PaymentFailure = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const codeElement = document.getElementById("code")
    const messageElement = document.getElementById("message")

    if (codeElement && messageElement) {
      codeElement.textContent = "에러코드: " + urlParams.get("code")
      messageElement.textContent = "실패 사유: " + urlParams.get("message")
    }
  }, [])

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <h2>결제 실패</h2>
        <p id="code"></p>
        <p id="message"></p>
      </body>
    </html>
  )
}

export default PaymentFailure
