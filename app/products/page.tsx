import MainLayout from "@/app/main-layout"
import {ProductsList, ProductsPagination, ProductsSearch} from "./products"
import {usersServices} from "@/services/usersServices"

const Products = async () => {
  const user = await usersServices.loginCheck(false)
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
