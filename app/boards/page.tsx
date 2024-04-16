import MainLayout from "@/app/main-layout"
import {GeneralPagination} from "../reviews/reviews"

const Boards = () => {
  return (
    <MainLayout>
      <h2 className="flex justify-center"><strong>게시판</strong></h2>
      <GeneralPagination />
    </MainLayout>
  )
}

export default Boards
