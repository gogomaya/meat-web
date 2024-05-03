import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {ProductsList, ProductsPagination, ProductsSearch} from "./products"

const Products = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center">상품리스트</h2>
      <ProductsSearch />
      <ProductsList />
      <ProductsPagination />
    </MainLayout>
  )
}

export default Products
