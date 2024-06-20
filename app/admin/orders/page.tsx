import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {usersServices} from "@/services/usersServices"
import {ordersServices} from "@/services/ordersServices"
import {adminCheck} from "@/app/users/login/loginCheck"
import AdminLayout from "@/app/admin-layout"
import AdminOrdersList from "./orders"
import ErrorPage from "@/app/error"

const AdminOrders = async (props: {searchParams: SearchParams}) => {
  const loginChecked = await adminCheck(true)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "order_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as SearchParams
  let ordersResponse: ResponseApi = {}
  let orders = []
  let lastPage = 0
  try {
    ordersResponse = await ordersServices.ordersRead(searchParams)
    orders = ordersResponse.data.orders
    lastPage = Math.ceil(ordersResponse.data.total_rows / searchParams.rowsPerPage) - 1
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }  return (
    <AdminLayout>
      <div></div>
      <AdminOrdersList
        orders={ordersResponse.data.orders}
        total_rows={ordersResponse.data.total_rows}
        searchParams={searchParams}
      />
    </AdminLayout>
  )
}

export default AdminOrders
