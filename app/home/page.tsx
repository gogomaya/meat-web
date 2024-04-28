import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"
import {HomeDunDunRice, HomeBestMenu, HomeBestReview, HomeBrandStory, HomePledge, HomeYoutube} from "./home"

const Home = async () => {
  const {user} = await loginCheck(false)
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
