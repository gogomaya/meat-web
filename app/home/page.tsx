import {ResponseApi} from "@/types/commonTypes"
import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"
import {HomeDunDunRice, HomeBestMenu, HomeBestReview, HomeBrandStory, HomeKeyPoint, HomeYoutube, HomeIntro} from "./home"
import {productsServices} from "@/services/productsServices"
import ErrorPage from "@/app/error"
import {preLoader} from "./home"

const Home = async () => {
  const {user} = await loginCheck(false)
  let productsHomeResponse: ResponseApi = {}
  try {
    productsHomeResponse = await productsServices.productsHomeLists()
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const {products_best} = productsHomeResponse.data

  return (
    <MainLayout user={user}>
      <div className="w-full">
        <HomeSwiper />
        <HomeKeyPoint />
        <HomeDunDunRice />
        <HomeIntro />
        {products_best.length ? (
          <HomeBestMenu products={products_best} />
        ) : null}
        <HomeBestReview />
        <HomeBrandStory />
        <HomeYoutube />
        <preLoader />
      </div>
    </MainLayout>
  )
}

export default Home
