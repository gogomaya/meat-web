import {adminCheck} from "@/app/users/login/loginCheck"
import {ResponseApi} from "@/types/commonTypes"
import {boardsServices} from "@/services/boardsServices"
import AdminLayout from "@/app/admin-layout"
import AdminBoardsForm from "@/app/admin/boards/[category]/boards-form"
import {categoriesServices} from "@/services/categoriesServices"

const AdminBoardsDetail = async (props: {
  params: {board_pk: number}
}) => {
  await adminCheck(true)
  const response: ResponseApi = await boardsServices.boardsDetail(props.params.board_pk)
  const categoriesResponse: ResponseApi = await categoriesServices.categoriesList()

  return (
    <AdminLayout categories={categoriesResponse.data.categories}>
      <AdminBoardsForm board={response.data.board} />
    </AdminLayout>
  )
}

export default AdminBoardsDetail
