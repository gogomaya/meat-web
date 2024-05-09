import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"

const Home = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <h2>검색결과</h2>

      </div>
    </MainLayout>
  )
}

export default Home
