"use client"
import Link from "next/link"
import {useEffect, useState} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Pagination, PaginationItem, Select, TextField, TextareaAutosize, styled} from "@mui/material"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {User} from "@/types/usersTypes"
import {Board, BoardsMessage, BoardsReply, BoardsSearchParams} from "@/types/boardsTypes"
import {boardsServices} from "@/services/boardsServices"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {backdrop} from "@/components/common/Backdrop"
import {toastError, toastSuccess, toastWarning} from "@/components/common/Toast"
import {v4 as uuidv4} from "uuid"
import moment from "moment"

interface BoardControl extends Board {
  openDetail: boolean
}

export const BoardsList = ({
  user,
  boards,
  total_rows,
  boardsSearchParams,
  boardsMessage
}: {
  user: User
  boards: Board[]
  total_rows: number
  boardsSearchParams: BoardsSearchParams,
  boardsMessage: BoardsMessage
}) => {
  const boardsFormReset = (boards: Board[]) => {
    return boards.map((board) => {
      return {
        ...board,
        openDetail: false
      }
    })
  }
  const boardsForm = useForm<{
    boards: BoardControl[]
    total_rows: number
  }>({
    defaultValues: {
      boards: boardsFormReset(boards),
      total_rows
    }
  })
  boardsForm.watch("boards")
  const boardsRead = async () => {
    const boardsResponse: ResponseApi = await boardsServices.boardsRead(boardsSearchParams)
    boardsForm.setValue("boards", boardsFormReset(boardsResponse.data.boards))
    boardsForm.setValue("total_rows", boardsResponse.data.total_rows)
  }
  const boardsDetail = async (board: BoardControl, index: number) => {
    if (board.openDetail) {
      boardsForm.setValue(`boards.${index}.openDetail`, false)
      return
    }
    if (
      boardsMessage.category === "qna" &&
      (!user.is_admin && user.user_pk !== board.user_pk)
    ) {
      boardsForm.setValue(`boards.${index}.openDetail`, !board.openDetail)
      return
    }
    backdrop.open()
    const boardsDetailResponse: ResponseApi = await boardsServices.boardsDetail(board.board_pk)
    boardsForm.setValue(`boards.${index}.contents`, boardsDetailResponse.data.board.contents)
    boardsForm.setValue(`boards.${index}.boards_replies`, boardsDetailResponse.data.board.boards_replies)
    boardsForm.setValue(`boards.${index}.openDetail`, !board.openDetail)
    backdrop.close()
  }
  useEffect(() => {
    boardsForm.setValue("boards", boardsFormReset(boards))
    boardsForm.setValue("total_rows", total_rows)
  }, [boardsForm, boards, total_rows])
  return (
    <div className="container flex flex-col py-4 mx-8 py-6">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  py-4">
        <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead style={{backgroundColor: "#271A11"}} className="text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    번호
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    제목
                  </th>
                  {boardsMessage.category === "qna" ? (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        답변 여부
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        작성자
                      </th>
                    </>
                  ) : null}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    작성 일자
                  </th>
                </tr>
              </thead>
              {boardsForm.getValues("boards").length === 0 ? (
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td colSpan={9999999} className="px-6 py-12 whitespace-nowrap">
                      <div className="flex justify-center items-center">게시물이 없습니다.</div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                boardsForm.getValues("boards").map((board, index) => (
                  <tbody key={board.board_pk} className="bg-white divide-y divide-gray-200">
                    <tr className="transition-all hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span
                            className="cursor-pointer"
                            onClick={() => boardsDetail(board, index)}
                          >{board.board_pk}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!boardsSearchParams.product_pk && board.product_pk ? (
                          <div className="mb-2 text-sm text-gray-900">
                            <Link href={`/products/${board.product_pk}`}>{board.product_name}</Link>
                          </div>
                        ) : null}
                        <div className="text-sm text-gray-900">
                          <span
                            className="cursor-pointer"
                            onClick={() => boardsDetail(board, index)}
                          >{board.title}</span>
                        </div>
                      </td>
                      {boardsMessage.category === "qna" ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${board.replies_count ? "bg-gray-900" : "bg-yellow-500"} text-white`}>
                              {board.replies_count ? "완료" : "대기"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {board.user_name}
                          </td>
                        </>
                      ) : null}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(board.created_at).format("YYYY-MM-DD")}
                      </td>
                    </tr>
                    {board.openDetail ? (
                      <tr>
                        <td colSpan={9999999}>
                          {board.contents ? (
                            <div>
                              <div className="px-6 py-12 whitespace-nowrap flex justify-center items-center">
                                <div
                                  className="leading-7 ck-content [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
                                  dangerouslySetInnerHTML={{__html: board.contents}}
                                />
                              </div>
                              {board.boards_replies?.length === 0 ? (
                                <div className="relative">
                                  {user.user_pk === board.user_pk ? (
                                    <span className="inline-block ml-4 mb-4">
                                      <BoardsForm
                                        user={user}
                                        board={board}
                                        boardsRead={boardsRead}
                                        boardsMessage={boardsMessage}
                                      />
                                    </span>
                                  ) : null}
                                  {user.is_admin ? (
                                    <span className="absolute right-0 top-0 inline-block mr-4 mb-4">
                                      <BoardsRepliesForm
                                        user={user}
                                        boards_reply={{
                                          board_pk: board.board_pk,
                                          board_reply_pk: 0,
                                          user_pk: user.user_pk,
                                          contents: ""
                                        }}
                                        boardsRead={boardsRead}
                                        boardsMessage={boardsMessage}
                                      />
                                    </span>
                                  ) : null}
                                </div>
                              ) : (
                                <div>
                                  <Divider className="my-4" sx={{border: "1px solid secondary"}} />
                                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <div
                                      className="text-sm text-gray-900 sm:col-span-2"
                                      dangerouslySetInnerHTML={{__html: board.boards_replies?.[0].contents.replaceAll("\n", "<br />") || ""}}
                                    />
                                  </div>
                                  {user.is_admin ? (
                                    <span className="inline-block ml-4 mb-4">
                                      <BoardsRepliesForm
                                        user={user}
                                        boards_reply={board.boards_replies?.[0] as BoardsReply}
                                        boardsRead={boardsRead}
                                        boardsMessage={boardsMessage}
                                      />
                                    </span>
                                  ) : null}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="px-6 py-12 whitespace-nowrap flex justify-center items-center">본인 또는 관리자만 읽을 수 있습니다.</div>
                          )}
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                ))
              )}
            </table>
          </div>
        </div>
        {boardsForm.getValues("boards").length ? (
          <BoardsPagination
            searchParams={boardsSearchParams}
            total_rows={boardsForm.getValues("total_rows")}
            boardsRead={boardsRead}
          />
        ) : null}
      </div>
      <BoardsForm
        user={user}
        board={{
          board_pk: 0,
          category: boardsSearchParams.category,
          user_pk: user.user_pk,
          product_pk: boardsSearchParams.product_pk,
          title: "",
          contents: ""
        }}
        boardsRead={boardsRead}
        boardsMessage={boardsMessage}
      />
    </div>
  )
}


export const BoardsPagination = ({
  searchParams,
  total_rows,
  boardsRead
}: {
  searchParams: BoardsSearchParams
  total_rows: number
  boardsRead: Function
}) => {

  const StyledPaginationItem = styled(PaginationItem)(({ }) => ({
    "&.Mui-selected": {
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "black"
      }
    }
  }))

  return (
    <Pagination
      variant="outlined"
      color="primary"
      shape="rounded"
      count={Math.ceil(total_rows / searchParams.rowsPerPage)}
      showFirstButton
      showLastButton
      page={searchParams.page + 1}
      className="flex justify-center"
      onChange={(_, value) => {
        if (!searchParams.product_pk) {
          window.history.pushState({}, "", window.location.pathname + "?" + new URLSearchParams({
            ...searchParams as SearchParams,
            page: String(value - 1)
          }))
        }
        searchParams.page = Number(value - 1) as never
        boardsRead()
      }}
      renderItem={(item) => <StyledPaginationItem {...item} />}
    />
  )
}

let contentsEditor: any
const BoardsForm = ({
  user,
  board,
  boardsRead,
  boardsMessage
}: {
  user: User
  board: Board
  boardsRead: Function
  boardsMessage: BoardsMessage
}) => {
  const [open, setOpen] = useState(false)
  const [uuid] = useState(uuidv4())
  const boardForm = useForm<Board>({
    defaultValues: board,
    resolver: yupResolver(yup.object().shape({
      board_pk: yup.number().required(),
      user_pk: yup.number().required().default(board.user_pk),
      category: yup.string().default(board.category),
      title: yup.string().required().default(board.title),
      contents: yup.string().default(board.contents)
    }))
  })
  const {register, formState: {errors}, control} = boardForm
  const boardFormSubmit = boardForm.handleSubmit(() => {})
  const boardsAction = async () => {
    const board = boardForm.getValues()
    board.contents = contentsEditor.getData()
    boardForm.clearErrors()
    await boardFormSubmit()
    if (Object.keys(boardForm.formState.errors).length) return
    if (
      boardsMessage.category === "qna" &&
        board.contents.replace(/(<([^>]+)>)/gi, "").length < 5
    ) {
      toastWarning("내용을 5자 이상 입력해주세요.")
      return
    }
    backdrop.open()
    const response: ResponseApi = await boardsServices[
      board.board_pk === 0 ? "boardsCreate" : "boardsUpdate"
    ](board, uuid)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess(
        board.board_pk === 0 ? "등록 되었습니다." : "수정 되었습니다."
      )
      await boardsRead()
      setOpen(false)
    }
    backdrop.close()
  }
  const boardsDelete = async () => {
    if (!window.confirm("삭제 하시겠습니까?")) return
    backdrop.open()
    const response: ResponseApi = await boardsServices.boardsDelete(board.board_pk)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess("삭제 되었습니다.")
      await boardsRead()
      setOpen(false)
    }
    backdrop.close()
  }
  useEffect(() => {
    boardForm.reset(board)
  }, [boardForm, board])
  return (
    <>
      {boardsMessage.category === "qna" || user.is_admin ? (
        <button
          className="product-button"
          style={{
            padding: "5px 8px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.8rem",
            width: "76px"
          }}
          onClick={() => {
            if (!user.user_pk) {
              if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
                window.postMessage({loginPopup: "on"}, "*")
              }
              return
            }
            setOpen(true)
            backdrop.open()
          }}
        >
          {board.board_pk === 0 ? boardsMessage.buttonCreateTitle : boardsMessage.buttonUpdateTitle}
        </button>
      ) : null}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth
        TransitionProps={{onEntered: () => {
          const DecoupledEditor = require("@ckeditor/ckeditor5-build-decoupled-document")
          DecoupledEditor
            .create(document.querySelector("#editor"), {
              ckfinder: {
                uploadUrl: `/api/ckeditor5/upload-images?table=boards&uuid=${uuid}`
              },
              mediaEmbed: {
                previewsInData: true
              }
            })
            .then((editor: any) => {
              const toolbarContainer: any = document.querySelector("#toolbar-container")
              toolbarContainer.appendChild(editor.ui.view.toolbar.element)
              contentsEditor = editor
            })
            .catch((error: unknown) => {
              console.error(error)
            }).finally(() => backdrop.close())
        }}}
      >
        <DialogTitle>{board.board_pk === 0 ? boardsMessage.buttonCreateTitle : boardsMessage.buttonUpdateTitle}</DialogTitle>
        <DialogContent>
          {boardsMessage.category === "qna" ? (
            <FormControl variant="standard" error={!!errors.title} className="w-40">
              <InputLabel shrink>제목을 선택해 주세요.</InputLabel>
              <Controller
                control={control}
                name="title"
                render={({field}) => (
                  <Select {...field}>
                    <MenuItem value="상품문의입니다.">상품문의</MenuItem>
                    <MenuItem value="배송문의입니다.">배송문의</MenuItem>
                    <MenuItem value="취소문의입니다.">취소문의</MenuItem>
                    <MenuItem value="환불문의입니다.">환불문의</MenuItem>
                    <MenuItem value="기타문의입니다.">기타문의</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          ) : (
            <TextField
              autoFocus
              label="제목"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true
              }}
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title && errors.title.message}
            />
          )}
          <div className="mt-4 min-w-[400px]">
            <div id="toolbar-container"></div>
            <div
              id="editor"
              className="!border !border-[#ccced1] h-[300px] [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
              dangerouslySetInnerHTML={{__html: boardForm.getValues("contents")}}
            ></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false)
          }} color="primary" autoFocus>
            닫기
          </Button>
          {board.board_pk ? (
            <Button onClick={boardsDelete} color="primary">
              삭제하기
            </Button>
          ) : null}
          <Button onClick={boardsAction} color="primary">
            {board.board_pk === 0 ? "작성하기" : "수정하기"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const BoardsRepliesForm = ({
  user,
  boards_reply,
  boardsRead,
  boardsMessage
}: {
  user: User
  boards_reply: BoardsReply
  boardsRead: Function
  boardsMessage: BoardsMessage
}) => {
  const [open, setOpen] = useState(false)
  const boardsReplyForm = useForm<BoardsReply>({
    defaultValues: boards_reply,
    resolver: yupResolver(yup.object().shape({
      board_pk: yup.number().required(),
      board_reply_pk: yup.number().required(),
      user_pk: yup.number().required().default(boards_reply.user_pk),
      contents: yup.string().default(boards_reply.contents)
    }))
  })
  const {register} = boardsReplyForm
  const boardFormSubmit = boardsReplyForm.handleSubmit(() => {})
  const boardsRepliesAction = async () => {
    boardsReplyForm.clearErrors()
    await boardFormSubmit()
    if (Object.keys(boardsReplyForm.formState.errors).length) return
    backdrop.open()
    const response: ResponseApi = await boardsServices[
      boards_reply.board_reply_pk === 0 ? "boardsRepliesCreate" : "boardsRepliesUpdate"
    ](boardsReplyForm.getValues())
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess(
        boards_reply.board_reply_pk === 0 ? "등록 되었습니다." : "수정 되었습니다."
      )
      await boardsRead()
      setOpen(false)
    }
    backdrop.close()
  }
  const boardsRepliesDelete = async () => {
    if (!window.confirm("삭제 하시겠습니까?")) return
    backdrop.open()
    const response: ResponseApi = await boardsServices.boardsRepliesDelete(boards_reply.board_reply_pk)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess("삭제 되었습니다.")
      await boardsRead()
      setOpen(false)
    }
    backdrop.close()
  }
  boardsReplyForm.watch("contents")
  return (
    <>
      {boardsMessage.category === "qna" ? (
        <button
          className="product-button"
          style={{
            padding: "5px 3px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.8rem",
            width: "100px"
          }}
          onClick={() => {
            if (!user.user_pk) {
              if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
                window.postMessage({loginPopup: "on"}, "*")
              }
              return
            }
            setOpen(true)
          }}
        >
          {boards_reply.board_reply_pk === 0 ? "문의 답변 작성" : "문의 답변 수정"}
        </button>
      ) : null}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>문의 답변 {boards_reply.board_reply_pk === 0 ? "작성" : "수정"}</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            autoFocus
            className="w-[100%] !h-32 border border-grey p-2"
            placeholder="댓글을 작성해 주세요. (5자 이상)"
            {...register("contents")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false)
          }} color="primary" autoFocus>
            닫기
          </Button>
          {boards_reply.board_reply_pk ? (
            <Button onClick={boardsRepliesDelete} color="primary">
              삭제하기
            </Button>
          ) : null}
          <Button
            color="primary"
            onClick={boardsRepliesAction}
            disabled={boardsReplyForm.getValues("contents").length < 5}
          >
            {boards_reply.board_reply_pk === 0 ? "작성하기" : "수정하기"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
