import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"
import {HomeBestMenu, HomeYoutube} from "./home"

const Home = () => {
  return (
    <MainLayout>
      <div className="mt-4">
        <HomeSwiper />
        <HomeBestMenu />
        <HomeYoutube />
      </div>
    </MainLayout>
  )
}

export default Home
