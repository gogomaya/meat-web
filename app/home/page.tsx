import MainLayout from "@/app/main-layout"
import HomeSwiper from "./swiper"

const Home = () => {
  return (
    <MainLayout>
      <div className="mt-4">
        <HomeSwiper />
      </div>
    </MainLayout>
  )
}

export default Home
