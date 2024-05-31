import {ResponseApi} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
// import HomeSwiper from "./swiper"
import {HomeBanner, HomeBestMenu, HomeCateMenu, HomeWhyUs} from "./home"
import {productsServices} from "@/services/productsServices"
import ErrorPage from "@/app/error"
import {FaqSection} from "../faq/faq"
import {GeneralPagination} from "../reviews/reviews"

const Home = async () => {
  const {user} = await loginCheck(false)
  let productsHomeResponse: ResponseApi = {}
  try {
    productsHomeResponse = await productsServices.productsHome()
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const {products_best} = productsHomeResponse.data

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <HomeBanner />
        <HomeCateMenu />
        {/* <HomeSwiper /> */}
        <HomeWhyUs />
        {/* <ProductList /> */}
        {products_best.length ? (
          <HomeBestMenu products={products_best} />
        ) : null}
        {/* <FaqSection /> */}
        <GeneralPagination />
      </div>
    </MainLayout>
  )
}

export default Home
