import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {Board, BoardsReply} from "@/types/boardsTypes"
import {commonServices} from "./commonServices"

export const boardsServices = {
  boardsCreate: async (board: Board, uuid: string): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(board).forEach(([key, value]) => {
        formData.append(key, value)
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
  boardsRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/boards?` + new URLSearchParams({
        ...searchParams
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
        formData.append(key, value)
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
  // boardsRepliesRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
  //   try {
  //     const response = await fetch(`${commonServices.ssrCsr()}/api/boards/replies?` + new URLSearchParams({
  //       ...searchParams
  //     }))
  //     return await commonServices.responseJson(response)
  //   } catch (error) {
  //     throw error
  //   }
  // },
  boardsRepliesCreate: async (boards_Reply: BoardsReply): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(boards_Reply).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const response = await fetch("/api/boards/replies", {
        method: "POST",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsRepliesDelete: async (board_reply_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/boards/replies/${board_reply_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  boardsRepliesUpdate: async (boards_Reply: BoardsReply): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(boards_Reply).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const response = await fetch(`/api/boards/replies/${boards_Reply.board_reply_pk}`, {
        method: "PATCH",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
