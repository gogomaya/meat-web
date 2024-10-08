import {adminCheck} from "@/app/users/login/loginCheck"
import {ProductCategory} from "@/types/productsTypes"
import AdminLayout from "@/app/admin-layout"
import AdminProductsForm from "@/app/admin/products/[category]/products-form"
import {categoriesServices} from "@/services/categoriesServices"
import {ResponseApi} from "@/types/commonTypes"

const AdminProductsCreate = async (props: {
  params: {category: ProductCategory}
}) => {
  await adminCheck(true)
  const categoriesResponse: ResponseApi = await categoriesServices.categoriesList()

  return (
    <AdminLayout categories={categoriesResponse.data.categories}>
      <AdminProductsForm
        product={{
          product_pk: 0,
          category: props.params.category,
          category_menu: "",
          name: "",
          price: "",
          discounted_price: "",
          stock: "",
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
