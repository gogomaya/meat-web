import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {usersServices} from "@/services/usersServices"
import {adminCheck} from "@/app/users/login/loginCheck"
import AdminLayout from "@/app/admin-layout"
import AdminUsersList from "./users"

const AdminUsers = async (props: {searchParams: SearchParams}) => {
  const loginChecked = await adminCheck(true)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "user_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as SearchParams
  const response: ResponseApi = await usersServices.usersRead(loginChecked, searchParams)
  return (
    <AdminLayout>
      <div></div>
      <AdminUsersList
        users={response.data.users}
        total_rows={response.data.total_rows}
        searchParams={searchParams}
      />
    </AdminLayout>
  )
}

export default AdminUsers
