import {adminCheck} from "@/app/admin/page"
import {ProductCategory} from "@/types/productsTypes"
import AdminLayout from "@/app/admin-layout"
import AdminProductsForm from "@/app/admin/products/[category]/products-form"

const AdminProductsCreate = async (props: {
  params: {category: ProductCategory}
}) => {
  await adminCheck()
  return (
    <AdminLayout>
      <AdminProductsForm
        product={{
          // product_pk: 0,
          // category: props.params.category,
          // category_menu: "",
          // name: "",
          // price: "",
          // is_today: false,
          // is_best: false,
          // is_sold_out: false,
          // contents: ""
          product_pk: 0,
          category: props.params.category,
          category_menu: "특수모듬",
          name: "한우1++",
          price: 96000,
          description: "5월 1일 수요일",
          origin: "원산지",
          weight: "제품중량",
          type: "식품중량",
          part: "부위",
          per100g: "100g당",
          grade: "등급",
          package: "포장방법",
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
