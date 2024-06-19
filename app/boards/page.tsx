import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ResponseApi} from "@/types/commonTypes"
import {BoardsMessage, BoardsSearchParams} from "@/types/boardsTypes"
import {boardsServices} from "@/services/boardsServices"
import {BoardsList} from "./boards"

const boardsMessages: BoardsMessage[] = [
  {
    title: "공지사항",
    category: "notice",
    buttonCreateTitle: "작성하기",
    buttonUpdateTitle: "수정하기"
  },
  {
    title: "문의하기",
    category: "qna",
    buttonCreateTitle: "문의하기",
    buttonUpdateTitle: "문의수정"
  }
]

const Boards = async (props: {
  searchParams: BoardsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const boardsMessage = boardsMessages.find(
    (boardsMessage) => boardsMessage.category === props.searchParams.category
  ) || boardsMessages[0]
  const boardsSearchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    category: boardsMessage.category
  } as BoardsSearchParams
  const boardsResponse: ResponseApi = await boardsServices.boardsRead(boardsSearchParams)
  const {boards, total_rows} = boardsResponse.data
  return (
    <MainLayout user={user}>
      <div
        className="flex justify-center text-red-100 py-8 text-4xl"
        style={{
          backgroundImage: "url('/images/Bg_3.png')",
          backgroundPosition: "center calc(10% - 220px)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          textAlign: "center",
          minHeight: "200px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >{boardsMessage.title}</div>
      <BoardsList
        user={user}
        boards={boards}
        total_rows={total_rows}
        boardsSearchParams={boardsSearchParams}
        boardsMessage={boardsMessage}
      />
    </MainLayout>
  )
}

export default Boards
