import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {adminCheck} from "@/app/users/login/loginCheck"
import AdminLayout from "@/app/admin-layout"
import ErrorPage from "@/app/error"
import AdminCancelList from "./Cancel"
import {cancellationsServices} from "@/services/cancellationsServices"
import {Cancellation} from "@/types/cancellationsTypes"
import {categoriesServices} from "@/services/categoriesServices"

const AdminCancel = async (props: {searchParams: SearchParams}) => {
  const loginChecked = await adminCheck(true)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "order_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as SearchParams
  let cancelResponse: ResponseApi = {}
  let cancels: Cancellation[] = []
  let lastPage = 0
  try {
    cancelResponse = await cancellationsServices.cancellationAll(searchParams)
    lastPage = Math.ceil(cancelResponse.data.total_rows / searchParams.rowsPerPage) - 1
    console.log(`cancelResponse.data : ${cancelResponse.data}`)
    console.log(`cancellations : ${cancelResponse.data.cancellations}`)

    if( cancelResponse.data &&  cancelResponse.data.cancellations ) {
      cancels = cancelResponse.data.cancellations
      console.dir(cancelResponse.data.cancellations)
    }
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const categoriesResponse: ResponseApi = await categoriesServices.categoriesList()

  return (
    <AdminLayout categories={categoriesResponse.data.categories}>
      <AdminCancelList
        cancels={cancels}
        total_rows={cancelResponse.data.total_rows}
        searchParams={searchParams}
      />
    </AdminLayout>
  )
}

export default AdminCancel
