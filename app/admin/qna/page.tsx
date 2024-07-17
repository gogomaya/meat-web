import {loginCheck} from "@/app/users/login/loginCheck"
import {boardsServices} from "@/services/boardsServices"
import {ResponseApi} from "@/types/commonTypes"
import {ProductsSearchParams} from "@/types/productsTypes"
import {BoardsSearchParams} from "@/types/boardsTypes"
import AdminLayout from "@/app/admin-layout"
import {AdminQnaList} from "./qna"

const Products = async (props: {
  params: {product_pk: number},
  searchParams: ProductsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const boardsSearchParams = {
    rowsPerPage: 10,
    page: 0,
    category: "qna",
    product_pk: props.params.product_pk
  } as BoardsSearchParams
  const boardsResponse: ResponseApi = await boardsServices.boardsAdminRead(boardsSearchParams)
  const {boards, total_rows: boards_total_rows} = boardsResponse.data
  return (
    <AdminLayout>
      <div>
        <AdminQnaList
          user={user}
          boards={boards}
          total_rows={boards_total_rows}
          boardsSearchParams={boardsSearchParams}
          boardsMessage={{
            title: "문의하기",
            category: "qna",
            buttonCreateTitle: "문의하기",
            buttonUpdateTitle: "문의수정"
          }}
        />
      </div>
    </AdminLayout>
  )
}

export default Products
