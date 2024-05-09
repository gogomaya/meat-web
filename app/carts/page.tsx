import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {CartsDetailContent} from "./Carts"

const Cart = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center">장바구니</h2>
      <CartsDetailContent />
    </MainLayout>
  )
}

export default Cart
