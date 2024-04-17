import MainLayout from "@/app/main-layout"
import {ProductsList, ProductsPagination, ProductsSearch} from "./products"

const Products = () => {
  return (
    <MainLayout>
      <h2 className="flex justify-center">상품리스트</h2>
      <ProductsSearch />
      <ProductsList />
      <ProductsPagination />
    </MainLayout>
  )
}

export default Products
