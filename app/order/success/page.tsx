import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"

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
const OrderSucces = async (props: {
}) => {
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
          }}>주문 완료</div>
      </div>
    </MainLayout>
  )
}

export default OrderSucces
