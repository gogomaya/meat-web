import {adminCheck} from "@/app/users/login/loginCheck"
import AdminLayout from "@/app/admin-layout"
import AdminBoardsForm from "@/app/admin/boards/[category]/boards-form"
import {ResponseApi} from "@/types/commonTypes"
import {categoriesServices} from "@/services/categoriesServices"

const AdminBoardsCreate = async (props: {
  params: {category: string}
}) => {
  const {user} = await adminCheck(true)
  const categoriesResponse: ResponseApi = await categoriesServices.categoriesList()

  return (
    <AdminLayout categories={categoriesResponse.data.categories}>
      <AdminBoardsForm board={{
        board_pk: 0,
        category: props.params.category,
        user_pk: user.user_pk,
        title: "",
        contents: ""
      }} />
    </AdminLayout>
  )
}

export default AdminBoardsCreate
