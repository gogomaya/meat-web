"use client"
import React, {useState} from "react"
import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa"
import {ResponseApi} from "@/types/commonTypes"
import {User} from "@/types/usersTypes"
import {Review, ReviewsLike} from "@/types/reviewsTypes"
import {useForm} from "react-hook-form"
import {reviewsServices} from "@/services/reviewsServices"
import {backdrop} from "@/components/common/Backdrop"
import {toastError} from "@/components/common/Toast"

export const GeneralReviewsLikes = ({
  user,
  review
}: {
  user: User
  review: Review
}) => {
  const reviewsLikeForm = useForm<{reviews_likes: ReviewsLike[]}>({
    defaultValues: {
      reviews_likes: review.reviews_likes
    }
  })
  reviewsLikeForm.watch("reviews_likes")
  const reviewsLikesRead = async () => {
    const reviewsLikesResponse: ResponseApi = await reviewsServices.reviewsLikesRead(review.review_pk)
    reviewsLikeForm.setValue("reviews_likes", reviewsLikesResponse.data.reviews_likes)
    setLike(getLike())
  }
  const reviewsLikesPut = async (is_like: boolean) => {
    if (!user.user_pk) {
      if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
        window.postMessage({loginPopup: "on"}, "*")
      }
      return
    }
    backdrop.open()
    const response: ResponseApi = await reviewsServices.reviewsLikesPut(review.review_pk, user.user_pk, is_like)
    if (response.error) {
      toastError(response.error)
    } else {
      await reviewsLikesRead()
    }
    backdrop.close()
  }
  const getLike = () => {
    const like = {
      liked: false,
      disliked: false,
      likedCount: 0,
      dislikedCount: 0
    }
    reviewsLikeForm.getValues("reviews_likes").forEach((reviews_like) => {
      if (reviews_like.is_like) {
        like.likedCount++
      } else {
        like.dislikedCount++
      }
      if (reviews_like.user_pk === user.user_pk) {
        if (reviews_like.is_like) {
          like.liked = true
        } else {
          like.disliked = true
        }
      }
    })
    return like
  }
  const [like, setLike] = useState(getLike())
  return (
    <div className="flex items-center gap-1">
      <FaRegThumbsUp
        className={like.liked ? "text-red-500 cursor-pointer mr-2" : "text-gray-500 cursor-pointer mr-2"}
        onClick={() => reviewsLikesPut(true)}
      />
      <span>{like.likedCount > 0 ? like.likedCount : null}</span>
      <FaRegThumbsDown
        className={like.disliked ? "text-red-500 cursor-pointer ml-2" : "text-gray-500 cursor-pointer ml-2"}
        onClick={() => reviewsLikesPut(false)}
      />
      <span>{like.dislikedCount > 0 ? like.dislikedCount : null}</span>
    </div>
  )
}
