import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {OrderDetailContent} from "./Order"

/**
 * 주문서 작성
 * - /order?orderId={orderId}
 *  - orderId 로 주문 정보 조회 후 출력
 * - 이 화면에 오기전 에 이미 주문은 등록된다.
 * - [주문하기] 버튼 클릭하는 화면들에서는
 *    API 로 주문 등록 요청 후, orderId 를 응답받고
 *    여기로 (/order?orderId={orderId}) 로 리다이렉트
 * - [결제하기]
 *  - 결제 성공 ➡ /order/success
 *  - 결제 실패 ➡ /order/fail
 * @param props
 * @returns
 */
const Order = async (props: {
  searchParams: {orderProducts: string}
}) => {
  const orderProducts = JSON.parse(props.searchParams.orderProducts || "[]")
  const {user} = await loginCheck(false)
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
          }}>주문서</div>
      </div>
      <OrderDetailContent orderProducts={orderProducts} />
    </MainLayout>
  )
}

export default Order
