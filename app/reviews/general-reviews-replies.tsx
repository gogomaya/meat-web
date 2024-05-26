"use client"
import React, {useEffect, useState} from "react"
import {Button, TextareaAutosize} from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {ResponseApi} from "@/types/commonTypes"
import {User} from "@/types/usersTypes"
import {Review, ReviewsRepliesSearchParams, ReviewsReply, ReviewsSearchParams} from "@/types/reviewsTypes"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {reviewsServices} from "@/services/reviewsServices"
import {backdrop} from "@/components/common/Backdrop"
import {toastError, toastSuccess} from "@/components/common/Toast"

export const GeneralReviewsReply = ({
  user,
  reviews_reply,
  reviewsRepliesList
}: {
  user: User
  reviews_reply: ReviewsReply
  reviewsRepliesList: Function
}) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)
  }, [reviews_reply])
  return (
    <div className="my-4 bg-white shadow overflow-hidden mt-4">
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex justify-between items-center">
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {reviews_reply.user_name}
          </p>
          {reviews_reply.user_pk === user.user_pk ? (
            <Button
              variant={open ? undefined : "contained"}
              color={open ? undefined : "primary"}
              className={`${open ? "" : "!bg-[#ed6c02] hover:!bg-[#e65100]"}`}
              onClick={() => setOpen(!open)}
            >
              {open ? "취소" : "수정하기"}
            </Button>
          ) : null}
        </div>
      </div>
      <dl className="sm:divide-y sm:divide-gray-200">
        {open ? (
          <GeneralReviewsRepliesForm user={user} reviews_reply={reviews_reply} reviewsRepliesList={reviewsRepliesList} />
        ) : (
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <div
              className="text-sm text-gray-900 sm:col-span-2"
              dangerouslySetInnerHTML={{__html: reviews_reply.contents.replaceAll("\n", "<br />")}}
            />
          </div>
        )}
      </dl>
    </div>
  )
}

export const GeneralReviewsReplies = ({
  user,
  review
}: {
  user: User
  review: Review
}) => {
  const [open, setOpen] = useState(false)
  const reviewsReplyForm = useForm<{reviews_replies: ReviewsReply[]}>({
    defaultValues: {
      reviews_replies: review.reviews_replies
    }
  })
  reviewsReplyForm.watch("reviews_replies")
  const reviewsRepliesList = async () => {
    const reviewsRepliesSearchParams = {
      review_pk: review.review_pk
    } as ReviewsRepliesSearchParams
    const reviewsRepliesResponse: ResponseApi = await reviewsServices.reviewsRepliesList(reviewsRepliesSearchParams)
    reviewsReplyForm.setValue("reviews_replies", reviewsRepliesResponse.data.reviews_replies)
  }
  return (
    <div className="relative">
      <div className="mr-6 flex justify-center absolute top-[-36px] right-0">
        <span>댓글 {reviewsReplyForm.getValues("reviews_replies").length}</span>
        {open ?
          <KeyboardArrowUpIcon className="cursor-pointer" onClick={() => setOpen(false)} />
          :
          <KeyboardArrowDownIcon className="cursor-pointer" onClick={() => setOpen(true)} />
        }
      </div>
      <div className={open ? "border-t border-gray-200 px-4 py-5 sm:p-0" : "hidden"}>
        {reviewsReplyForm.getValues("reviews_replies").map((reviews_reply: ReviewsReply) => (
          <GeneralReviewsReply
            key={reviews_reply.review_reply_pk}
            user={user}
            reviews_reply={reviews_reply}
            reviewsRepliesList={reviewsRepliesList}
          />
        ))}
        <GeneralReviewsRepliesForm
          user={user}
          reviews_reply={{
            review_pk: review.review_pk,
            review_reply_pk: 0,
            user_pk: user.user_pk,
            contents: ""
          }}
          reviewsRepliesList={reviewsRepliesList}
        />
      </div>
    </div>
  )
}

const GeneralReviewsRepliesForm = ({
  user,
  reviews_reply,
  reviewsRepliesList
}: {
  user: User
  reviews_reply: ReviewsReply
  reviewsRepliesList: Function
}) => {
  const [open, setOpen] = useState(!!reviews_reply.review_reply_pk)
  const reviewsReplyForm = useForm<ReviewsReply>({
    defaultValues: reviews_reply,
    resolver: yupResolver(yup.object().shape({
      review_pk: yup.number().required(),
      review_reply_pk: yup.number().required(),
      user_pk: yup.number().required(),
      contents: yup.string().required()
    }))
  })
  const {register} = reviewsReplyForm
  reviewsReplyForm.watch("contents")
  const reviewsRepliesAction = async () => {
    backdrop.open()
    const response: ResponseApi = await reviewsServices[
      reviews_reply.review_reply_pk === 0 ? "reviewsRepliesCreate" : "reviewsRepliesUpdate"
    ](reviewsReplyForm.getValues())
    if (response.error) {
      toastError(response.error)
    } else {
      setOpen(false)
      toastSuccess(
        reviews_reply.review_reply_pk === 0 ? "댓글이 등록 되었습니다." : "댓글이 수정 되었습니다."
      )
      await reviewsRepliesList()
      if (reviews_reply.review_reply_pk === 0) {
        reviewsReplyForm.reset()
      }
    }
    backdrop.close()
  }
  const reviewsDelete = async () => {
    if (!confirm("댓글을 삭제 하시겠습니까?")) {
      return
    }
    backdrop.open()
    const response: ResponseApi = await reviewsServices.reviewsRepliesDelete(reviewsReplyForm.getValues("review_reply_pk"))
    if (response.error) {
      toastError(response.error)
    } else {
      setOpen(false)
      toastSuccess("댓글이 삭제 되었습니다.")
      await reviewsRepliesList()
    }
    backdrop.close()
  }
  return (
    <div className="p-4">
      <TextareaAutosize
        autoFocus
        className="w-[100%] !h-32 border border-grey p-2"
        placeholder="댓글을 작성해 주세요. (5자 이상)"
        {...register("contents")}
        onClick={() => {
          setOpen(true)
          if (!user.user_pk) {
            if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
              window.postMessage({loginPopup: "on"}, "*")
            }
            return
          }
        }}
      ></TextareaAutosize>
      <div className={`flex justify-end ${open ? "" : "hidden"}`}>
        {reviews_reply.review_reply_pk === 0 ? (
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            취소
          </Button>
        ) : null}
        {reviews_reply.review_reply_pk ? (
          <Button
            className="!bg-[#d32f2f] hover:!bg-[#d32f2f]/[.4]"
            variant="contained"
            onClick={reviewsDelete}
          >
            삭제하기
          </Button>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          className={`ml-4 ${reviews_reply.review_reply_pk === 0 ? "btn" : "!bg-[#ed6c02] hover:!bg-[#e65100]"}`}
          onClick={reviewsRepliesAction}
          disabled={!user.user_pk || reviewsReplyForm.getValues("contents").length < 5}
        >
          {reviews_reply.review_reply_pk === 0 ? "댓글 작성하기" : "수정하기"}
        </Button>
      </div>
    </div>
  )
}
