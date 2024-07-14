import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {adminCheck} from "@/app/users/login/loginCheck"
import AdminLayout from "@/app/admin-layout"
import ErrorPage from "@/app/error"
import AdminCancelList from "./Cancel"
import {cancellationsServices} from "@/services/cancellationsServices"
import {Cancellation} from "@/types/cancellationsTypes"

const AdminCancel = async (props: {searchParams: SearchParams}) => {
  const loginChecked = await adminCheck(true)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "order_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as SearchParams
  let ordersResponse: ResponseApi = {}
  let cancelResponse: ResponseApi = {}
  let orders = []
  let cancellations = []
  let lastPage = 0
  try {
    ordersResponse = await ordersServices.ordersRead(searchParams)
    orders = ordersResponse.data.orders
    cancelResponse = await cancellationsServices.cancellationRead(searchParams)
    // cancels = cancelResponse.data.cancels
    lastPage = Math.ceil(ordersResponse.data.total_rows / searchParams.rowsPerPage) - 1
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }  return (
    <AdminLayout>
      <AdminCancelList
        orders={ordersResponse.data.orders}
        total_rows={ordersResponse.data.total_rows}
        searchParams={searchParams}
      />
    </AdminLayout>
  )
}

export default AdminCancel
