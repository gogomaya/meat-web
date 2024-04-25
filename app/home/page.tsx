import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"
import {HomeDunDunRice, HomeBestMenu, HomeBestReview, HomeBrandStory, HomePledge, HomeYoutube} from "./home"
import {usersServices} from "@/services/usersServices"

const Home = async () => {
  const user = await usersServices.loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <HomeSwiper />
        <HomePledge />
        <HomeDunDunRice />
        <HomeBestMenu />
        <HomeBestReview />
        <HomeBrandStory />
        <HomeYoutube/>
      </div>
    </MainLayout>
  )
}

export default Home
