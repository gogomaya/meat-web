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
      <OrderDetailContent orderProducts={orderProducts} />
    </MainLayout>
  )
}

export default Order
