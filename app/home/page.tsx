import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"
import {HomeDunDunRice, HomeBestMenu, HomeBestReview, HomeBrandStory, HomeKeyPoint, HomeYoutube, HomeIntro} from "./home"
import {usersServices} from "@/services/usersServices"

const Home = async () => {
  const user = await usersServices.loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <HomeSwiper />
        <HomeKeyPoint />
        <HomeDunDunRice />
        <HomeIntro />
        <HomeBestMenu />
        <HomeBestReview />
        <HomeBrandStory />
        <HomeYoutube/>
      </div>
    </MainLayout>
  )
}

export default Home
