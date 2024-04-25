import MainLayout from "@/app/main-layout"
import {GeneralPagination} from "../reviews/reviews"
import {usersServices} from "@/services/usersServices"

const Boards = async () => {
  const user = await usersServices.loginCheck(false)
  return (
    <MainLayout user={user}>
      <h2 className="flex justify-center"><strong>게시판</strong></h2>
      <GeneralPagination />
    </MainLayout>
  )
}

export default Boards
