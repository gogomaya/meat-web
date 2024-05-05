import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {OrderDetailContent} from "./Order"


const Order = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <OrderDetailContent />
    </MainLayout>
  )
}

export default Order
