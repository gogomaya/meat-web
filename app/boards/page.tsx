import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {GeneralPagination} from "../reviews/reviews"
import {BoardsList} from "./boards"

const Boards = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center text-red-100 py-8"
        style={{
          backgroundImage: "url('/images/Bg.png')",
          backgroundPosition: "center calc(10% - 220px)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          textAlign: "center",
          minHeight: "200px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>게시판</h2>
      <BoardsList />
      <GeneralPagination />
    </MainLayout>
  )
}

export default Boards
