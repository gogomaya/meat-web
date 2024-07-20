import {adminCheck} from "@/app/users/login/loginCheck"
import {ResponseApi} from "@/types/commonTypes"
import {ProductCategory, ProductsSearchParams} from "@/types/productsTypes"
import {productsServices} from "@/services/productsServices"
import AdminLayout from "@/app/admin-layout"
import AdminProductsList from "./products-list"
import {categoriesServices} from "@/services/categoriesServices"

const AdminProducts = async (props: {
  params: {category: ProductCategory}, searchParams: ProductsSearchParams
}) => {
  await adminCheck(true)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "product_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || "",
    category: props.params.category || "",
    category_menu: props.searchParams.category_menu || ""
  } as ProductsSearchParams
  const response: ResponseApi = await productsServices.productsRead(searchParams)
  const categoriesResponse: ResponseApi = await categoriesServices.categoriesList()
  return (
    <AdminLayout categories={categoriesResponse.data.categories}>
      <AdminProductsList
        products={response.data.products}
        total_rows={response.data.total_rows}
        category={props.params.category}
        searchParams={searchParams}
      />
    </AdminLayout>
  )
}

export default AdminProducts
