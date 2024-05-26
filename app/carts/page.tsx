import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {CartsDetailContent} from "./Carts"

const Cart = async () => {
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
          }}>장바구니</h2>
      </div>
      <CartsDetailContent />
    </MainLayout>
  )
}

export default Cart
