import {adminCheck} from "@/app/users/login/loginCheck"
import {ResponseApi} from "@/types/commonTypes"
import {ProductCategory} from "@/types/productsTypes"
import {productsServices} from "@/services/productsServices"
import AdminLayout from "@/app/admin-layout"
import AdminProductsForm from "@/app/admin/products/[category]/products-form"

const AdminProductsDetail = async (props: {
  params: {category: ProductCategory, product_pk: number}
}) => {
  await adminCheck(true)
  const response: ResponseApi = await productsServices.productsDetail(props.params.product_pk)
  return (
    <AdminLayout>
      <AdminProductsForm
        product={response.data.product}
      />
    </AdminLayout>
  )
}

export default AdminProductsDetail
