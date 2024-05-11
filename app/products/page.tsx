import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {ProductsList, ProductsPagination, ProductsSearch} from "./products"
import {productsServices} from "@/services/productsServices"
import {ResponseApi} from "@/types/commonTypes"
import ErrorPage from "@/app/error"
import {ProductCategory, ProductsSearchParams} from "@/types/productsTypes"

const Products = async (props: {
  searchParams: ProductsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 16,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "product_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || "",
    category: props.searchParams.category || "",
    category_menu: props.searchParams.category_menu || "",
    is_today: String(props.searchParams.is_today) === "true"
  } as ProductsSearchParams
  let productsResponse: ResponseApi = {}
  try {
    productsResponse = await productsServices.productsList(searchParams)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const {products, total_rows} = productsResponse.data
  const titleName = () => {
    const categoryName = {
      cow: "소고기",
      pork: "돼지고기",
      simple: "간편식"
    }
    if (searchParams.is_today) {
      return "오늘의 메뉴"
    } else if (searchParams.category_menu) {
      return searchParams.category_menu
    } else if (searchParams.category) {
      return categoryName[searchParams.category as ProductCategory]
    }
    return "상품 리스트"
  }
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center">{titleName()}</h2>
      <ProductsSearch products={products} searchParams={searchParams} />
      <ProductsList products={products} />
      {total_rows ? (
        <ProductsPagination searchParams={searchParams} total_rows={total_rows} />
      ) : null}
    </MainLayout>
  )
}

export default Products
