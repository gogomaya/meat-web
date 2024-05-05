import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {CartsDetailContent} from "./Carts"
import {Button} from "@mui/material"
import Link from "next/link"

const Cart = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center">장바구니</h2>
      <CartsDetailContent />
      <div className="flex flex-col items-end md:flex-row md:items-center md:justify-end md:space-x-4">
        <Button variant="contained" color="secondary" className="btn">
          선택상품만 결제하기
        </Button>
        <Button variant="contained" color="secondary" className="btn">
          장바구니 비우기
        </Button>
      </div>
      <div className="flex flex-col items-end space-y-4 py-3">
        <Link href="/order">
          <Button variant="contained" color="primary" className="btn">
            바로구매
          </Button>
        </Link>
      </div>
    </MainLayout>
  )
}

export default Cart
