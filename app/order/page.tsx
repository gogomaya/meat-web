import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {OrderDetailContent} from "./Order"


const Order = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center"><strong>주문/결제</strong></h2>
      <OrderDetailContent />
    </MainLayout>
  )
}

export default Order
