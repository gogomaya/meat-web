import {adminCheck} from "@/app/admin/page"
import {ResponseApi} from "@/types/commonTypes"
import {boardsServices} from "@/services/boardsServices"
import AdminLayout from "@/app/admin-layout"
import AdminBoardsForm from "@/app/admin/boards/[category]/boards-form"

const AdminBoardsDetail = async (props: {
  params: {board_pk: number}
}) => {
  await adminCheck(true)
  const response: ResponseApi = await boardsServices.boardsDetail(props.params.board_pk)
  return (
    <AdminLayout>
      <AdminBoardsForm board={response.data.board} />
    </AdminLayout>
  )
}

export default AdminBoardsDetail
