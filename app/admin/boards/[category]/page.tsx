import {adminCheck} from "@/app/users/login/loginCheck"
import {ResponseApi} from "@/types/commonTypes"
import {BoardsSearchParams} from "@/types/boardsTypes"
import {boardsServices} from "@/services/boardsServices"
import AdminLayout from "@/app/admin-layout"
import AdminBoardsList from "./boards-list"
import {categoriesServices} from "@/services/categoriesServices"

const AdminBoards = async (props: {
  params: {category: string}, searchParams: BoardsSearchParams
}) => {
  await adminCheck(true)
  const categoriesResponse: ResponseApi = await categoriesServices.categoriesList()
  alert(categoriesResponse.data)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "board_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || "",
    category: props.params.category || ""
  } as BoardsSearchParams
  const response: ResponseApi = await boardsServices.boardsRead(searchParams)
  return (
    <AdminLayout categories={categoriesResponse.data.categories}>
      <AdminBoardsList
        boards={response.data.boards}
        total_rows={response.data.total_rows}
        searchParams={searchParams}
      />
    </AdminLayout>
  )
}

export default AdminBoards
