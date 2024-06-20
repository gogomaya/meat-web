import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"

/**
 * 결제 실패
 * TODO:
 * - 결제 실패 UI
 * - 결제 실패 사유 메시지
 * @param props
 * @returns
 */
const OrderFail = async (props: {
}) => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div>
        <div className="flex justify-center text-red-100 text-4xl"
          style={{
            backgroundImage: "url('/images/Bg_3.png')",
            backgroundPosition: "center calc(10% - 620px)",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            textAlign: "center",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>주문 실패</div>
      </div>
    </MainLayout>
  )
}

export default OrderFail
