import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"
import {HomeBestMenu, HomeBestReview, HomeBrandStory, HomePledge, HomeYoutube} from "./home"

const Home = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <HomeSwiper />
        <HomePledge />
        <HomeBestMenu />
        <HomeBestReview />
        <HomeBrandStory />
        <HomeYoutube/>
      </div>
    </MainLayout>
  )
}

export default Home
