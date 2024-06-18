import {loginCheck} from "@/app/users/login/loginCheck"
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
    productsResponse = await productsServices.productsRead(searchParams)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const {products, total_rows} = productsResponse.data
  const titleName = () => {
    const categoryName = {
      cow: "소고기",
      pork: "돼지고기",
      imported: "수입육",
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
      <div className="pb-16">
        <div className="flex justify-center text-white py-8"
          style={{
            backgroundImage: "url('/images/Bg_3.png')",
            backgroundPosition: "center calc(10% - 620px)",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            textAlign: "center",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px"
          }}>{titleName()}</div>
        <div className="container">
          <ProductsList products={products} />
          {total_rows ? (
            <ProductsPagination searchParams={searchParams} total_rows={total_rows} />
          ) : null}
        </div>
      </div>
    </MainLayout>
  )
}

export default Products
