import {loginCheck} from "../users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ResponseApi} from "@/types/commonTypes"
import {BoardsSearchParams} from "@/types/boardsTypes"
import {boardsServices} from "@/services/boardsServices"
import {QnaBoards} from "./qna"

const Qna = async (props: {
  searchParams: BoardsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const boardsSearchParams = {
    rowsPerPage: 10,
    page: 0,
    category: "qna"
  } as BoardsSearchParams
  const boardsResponse: ResponseApi = await boardsServices.boardsRead(boardsSearchParams)
  const {boards, total_rows} = boardsResponse.data
  return (
    <MainLayout user={user}>
      <div
        className="flex justify-center text-red-100 py-8 text-4xl"
        style={{
          backgroundImage: "url('/images/Bg.png')",
          backgroundPosition: "center calc(10% - 220px)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          textAlign: "center",
          minHeight: "200px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >1:1문의하기</div>
      <QnaBoards
        user={user}
        boards={boards}
        total_rows={total_rows}
        boardsSearchParams={boardsSearchParams}
      />
      <div></div>
    </MainLayout>
  )
}

export default Qna
