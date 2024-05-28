import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {OrderDetailContent} from "./Order"

const Order = async (props: {
  searchParams: {orderProducts: string}
}) => {
  const orderProducts = JSON.parse(props.searchParams.orderProducts || "[]")
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div>
        <h2 className="flex justify-center text-red-100"
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
          }}>주문서</h2>
      </div>
      <OrderDetailContent orderProducts={orderProducts} />
    </MainLayout>
  )
}

export default Order
