import {ResponseApi} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
// import HomeSwiper from "./swiper"
import {HomeBanner, HomeBestMenu, HomeCateMenu, HomeWhyUs} from "./home"
import {productsServices} from "@/services/productsServices"
import ErrorPage from "@/app/error"
import {FaqSection} from "../faq/faq"
import {GeneralPagination} from "../reviews/reviews"
import {ProductsPagination} from "../products/products"
import {ProductsSearchParams} from "@/types/productsTypes"


const Home = async (props: {
  searchParams: ProductsSearchParams
}) => {
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

  const {user} = await loginCheck(false)
  let productsHomeResponse: ResponseApi = {}
  try {
    productsHomeResponse = await productsServices.productsHome()
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const {products_best, total_rows} = productsHomeResponse.data

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <HomeBanner />
        <HomeCateMenu />
        {/* <HomeSwiper /> */}
        <HomeWhyUs />
        {/* <ProductList /> */}
        <div>
          {products_best.length ? (
            <HomeBestMenu products={products_best} />
          ) : null}
          {total_rows ? (
            <ProductsPagination searchParams={searchParams} total_rows={total_rows} />
          ) : null}
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
