"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Paper, TextField, Button} from "@mui/material"
import {ResponseApi} from "@/types/commonTypes"
import {Board} from "@/types/boardsTypes"
import {boardsServices} from "@/services/boardsServices"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {backdrop} from "@/components/common/Backdrop"
import {toastError, toastSuccess} from "@/components/common/Toast"
import {v4 as uuidv4} from "uuid"

let contentsEditor: any
const AdminBoardsForm = ({
  from,
  board
}: {
  from?: "Main"
  board: Board
}) => {
  const router = useRouter()
  const [uuid] = useState(uuidv4())
  const boardForm = useForm<Board>({
    defaultValues: board,
    resolver: yupResolver(yup.object().shape({
      board_pk: yup.number().required(),
      user_pk: yup.number().required().default(board.user_pk),
      category: yup.string().default(board.category),
      title: yup.string().default(board.title),
      contents: yup.string().default(board.contents)
    }))
  })
  const {register, formState: {errors}} = boardForm
  const boardFormSubmit = boardForm.handleSubmit(() => {})
  const boardsAction = async () => {
    const board = boardForm.getValues()
    board.contents = contentsEditor.getData()
    boardForm.clearErrors()
    await boardFormSubmit()
    if (Object.keys(boardForm.formState.errors).length) return
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
      router.back()
      router.refresh()
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
      if (from === "Main") router.back()
      router.back()
      router.refresh()
    }
    backdrop.close()
  }
  useEffect(() => {
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
      })
  }, [uuid, board.board_pk])
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Paper className="p-4">
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
      </Paper>
      <Paper className="mt-4 p-4">
        <div id="toolbar-container"></div>
        <div
          id="editor"
          className="h-[800px] [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
          dangerouslySetInnerHTML={{__html: boardForm.getValues("contents")}}
        ></div>
      </Paper>
      <div className="mt-4 flex justify-end">
        {board.board_pk === 0 ? (
          <Button
            className="!bg-[#1976d2] hover:!bg-[#1565c0]"
            variant="contained"
            onClick={() => boardsAction()}
          >등록</Button>
        ) : (
          <>
            <Button
              className="!bg-[#d32f2f] hover:!bg-[#d32f2f]/[.4]"
              variant="contained"
              onClick={() => boardsDelete()}
            >삭제</Button>
            <Button
              className="!ml-4 !bg-[#ed6c02] hover:!bg-[#e65100]"
              variant="contained"
              onClick={() => boardsAction()}
            >수정</Button>
          </>
        )}
      </div>
    </form>
  )
}

export default AdminBoardsForm
