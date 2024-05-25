import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {Review, ReviewsReply, ReviewsSearchParams} from "@/types/reviewsTypes"
import {commonServices} from "./commonServices"

export const reviewsServices = {
  reviewsCreate: async (review: Review): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(review).forEach(([key, value]) => {
        if (key === "images") {
          for (let index = 0; index < value.length; index++) {
            formData.append("images[]", value[index])
          }
        } else {
          formData.append(key, value)
        }
      })
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  reviewsList: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${commonServices.ssrCsr()}/api/reviews?` + new URLSearchParams({
        ...searchParams
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  reviewsDelete: async (review_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/reviews/${review_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  reviewsImagesDelete: async (review_image_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/reviews/images/${review_image_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  reviewsUpdate: async (review: Review): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(review).forEach(([key, value]) => {
        if (key === "images") {
          for (let index = 0; index < value.length; index++) {
            formData.append("images[]", value[index])
          }
        } else {
          formData.append(key, value)
        }
      })
      const response = await fetch(`/api/reviews/${review.review_pk}`, {
        method: "PATCH",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  reviewsRepliesCreate: async (reviews_reply: ReviewsReply): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(reviews_reply).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const response = await fetch("/api/reviews/replies", {
        method: "POST",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  reviewsRepliesList: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${commonServices.ssrCsr()}/api/reviews/replies?` + new URLSearchParams({
        ...searchParams
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  reviewsRepliesDelete: async (review_reply_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/reviews/replies/${review_reply_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  reviewsRepliesUpdate: async (reviews_reply: ReviewsReply): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(reviews_reply).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const response = await fetch(`/api/reviews/replies/${reviews_reply.review_reply_pk}`, {
        method: "PATCH",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
