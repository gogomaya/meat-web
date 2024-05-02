import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {Board, BoardReply} from "@/types/boardsTypes"
import {commonServices} from "./commonServices"

export const boardsServices = {
  boardsCreate: async (board: Board, uuid: string): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(board).forEach(([key, value]) => {
        formData.append(key,
          key === "image" ? value[0] : value
        )
      })
      const response = await fetch(`/api/boards?uuid=${uuid}`, {
        method: "POST",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsList: async (searchParams: SearchParams, category: string): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/boards?` + new URLSearchParams({
        ...searchParams,
        category
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  boardsDetail: async (board_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/boards/${board_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  boardsVisitedCount: async (board_pk: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/boards/${board_pk}`, {
        method: "PUT"
      })
    } catch (error) {
      throw error
    }
  },
  boardsDelete: async (board_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/boards/${board_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsUpdate: async (board: Board, uuid: string): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(board).forEach(([key, value]) => {
        formData.append(key,
          key === "image" ? (value[0] || "") : value
        )
      })
      const response = await fetch(`/api/boards/${board.board_pk}?uuid=${uuid}`, {
        method: "PATCH",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsRepliesList: async (board_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/boards/replies/${board_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  boardsRepliesCreate: async (boardReply: BoardReply): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/boards/replies/${boardReply.board_pk}`, {
        method: "POST",
        body: JSON.stringify(boardReply)
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsRepliesUpdate: async (boardReply: BoardReply): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/boards/replies/${boardReply.board_pk}/${boardReply.board_reply_pk}`, {
        method: "PATCH",
        body: JSON.stringify(boardReply)
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsRepliesDelete: async (board_pk: number, board_reply_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/boards/replies/${board_pk}/${board_reply_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
