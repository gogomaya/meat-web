import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {CartsDetailContent} from "./Carts"
import {Button} from "@mui/material"

const Cart = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center">장바구니</h2>
      <CartsDetailContent />
      <div className="flex flex-col items-end md:flex-row md:items-center md:justify-end md:space-x-4">
        <Button variant="contained" color="secondary" className="btn">
          바로구매
        </Button>
        <Button variant="contained" color="secondary" className="btn">
          선택상품 결제하기
        </Button>
        <Button variant="contained" color="secondary" className="btn">
          장바구니 비우기
        </Button>
      </div>
      <div className="flex flex-col items-end space-y-4 py-3">
        <Button variant="contained" color="primary">
          네이버페이 결제하기
        </Button>
      </div>
    </MainLayout>
  )
}

export default Cart
