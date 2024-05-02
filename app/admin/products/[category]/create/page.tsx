import {adminCheck} from "@/app/admin/page"
import {ProductCategory} from "@/types/productsTypes"
import AdminLayout from "@/app/admin-layout"
import AdminProductsForm from "@/app/admin/products/[category]/products-form"

const AdminProductsCreate = async (props: {
  params: {category: ProductCategory}
}) => {
  await adminCheck(true)
  return (
    <AdminLayout>
      <AdminProductsForm
        product={{
          product_pk: 0,
          category: props.params.category,
          category_menu: "",
          name: "",
          price: "",
          is_today: false,
          is_best: false,
          is_sold_out: false,
          contents: ""
        }}
      />
    </AdminLayout>
  )
}

export default AdminProductsCreate
