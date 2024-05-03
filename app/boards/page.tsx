import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {GeneralPagination} from "../reviews/reviews"
import {BoardsList} from "./boards"

const Boards = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center"><strong>게시판</strong></h2>
      <BoardsList />
      <GeneralPagination />
    </MainLayout>
  )
}

export default Boards
