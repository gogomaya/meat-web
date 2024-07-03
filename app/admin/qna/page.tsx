import {loginCheck} from "@/app/users/login/loginCheck"
import {productsServices} from "@/services/productsServices"
import {reviewsServices} from "@/services/reviewsServices"
import {boardsServices} from "@/services/boardsServices"
import {ResponseApi} from "@/types/commonTypes"
import {ProductsSearchParams} from "@/types/productsTypes"
import {ReviewsSearchParams} from "@/types/reviewsTypes"
import {BoardsSearchParams} from "@/types/boardsTypes"
import {BoardsList} from "@/app/boards/boards"
import AdminLayout from "@/app/admin-layout"

const Products = async (props: {
  params: {product_pk: number},
  searchParams: ProductsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const reviewsSearchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    product_pk: props.params.product_pk
  } as ReviewsSearchParams
  const boardsSearchParams = {
    rowsPerPage: 10,
    page: 0,
    category: "qna",
    product_pk: props.params.product_pk
  } as BoardsSearchParams
  const boardsResponse: ResponseApi = await boardsServices.boardsRead(boardsSearchParams)
  const {boards, total_rows: boards_total_rows} = boardsResponse.data
  return (
    <AdminLayout>
      <div>
        <BoardsList
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
