"use client"
import React, {useState} from "react"
import {Button, Card, CardContent, Dialog, DialogActions, DialogContent, Grid, LinearProgress, Pagination, PaginationItem, Rating, TextField, TextareaAutosize, Typography} from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import Image from "next/image"
import {GeneralReviewsReplies} from "./general-reviews-replies"
import {GeneralReviewsLikes} from "./general-reviews-likes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {Product} from "@/types/productsTypes"
import {User} from "@/types/usersTypes"
import {Review, ReviewsSearchParams} from "@/types/reviewsTypes"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {reviewsServices} from "@/services/reviewsServices"
import moment from "moment"
import {backdrop} from "@/components/common/Backdrop"
import {toastError, toastSuccess} from "@/components/common/Toast"
import StarIcon from "@mui/icons-material/Star"


const GeneralReviewsForm = ({
  user,
  review,
  reviewsRead
}: {
  user: User
  review: Review
  reviewsRead: Function
}) => {
  const [open, setOpen] = useState(false)
  const reviewForm = useForm<Review>({
    defaultValues: review,
    resolver: yupResolver(yup.object().shape({
      review_pk: yup.number().required(),
      product_pk: yup.number().required(),
      user_pk: yup.number().required(),
      grade: yup.number().required(),
      contents: yup.string().required()
    }))
  })
  const {register} = reviewForm
  reviewForm.watch("contents")
  const reviewsAction = async () => {
    backdrop.open()
    const response: ResponseApi = await reviewsServices[
      review.review_pk === 0 ? "reviewsCreate" : "reviewsUpdate"
    ](reviewForm.getValues())
    if (response.error) {
      toastError(response.error)
    } else {
      setOpen(false)
      toastSuccess(
        review.review_pk === 0 ? "상품 리뷰가 등록 되었습니다." : "상품 리뷰가 수정 되었습니다."
      )
      await reviewsRead()
      if (review.review_pk === 0) {
        reviewForm.reset()
      }
    }
    backdrop.close()
  }
  const reviewsDelete = async () => {
    if (!confirm("상품 리뷰를 삭제 하시겠습니까?")) {
      return
    }
    backdrop.open()
    const response: ResponseApi = await reviewsServices.reviewsDelete(reviewForm.getValues("review_pk"))
    if (response.error) {
      toastError(response.error)
    } else {
      setOpen(false)
      toastSuccess("상품 리뷰가 삭제 되었습니다.")
      await reviewsRead()
    }
    backdrop.close()
  }
  const reviewsImagesDelete = async (review_image_pk: number) => {
    if (!confirm("해당 이미지를 삭제 하시겠습니까?")) {
      return
    }
    backdrop.open()
    const response: ResponseApi = await reviewsServices.reviewsImagesDelete(review_image_pk)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess("해당 이미지가 삭제 되었습니다.")
      await reviewsRead()
    }
    backdrop.close()
  }
  return (
    <div className="container py-4">
      <Button
        variant="outlined"
        className={`${review.review_pk === 0 ? "btn" : "!bg-[#ed6c02] hover:!bg-[#e65100]"}`}
        onClick={() => {
          if (!user.user_pk) {
            if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
              window.postMessage({loginPopup: "on"}, "*")
            }
            return
          }
          setOpen(true)
        }}
        style={{color: "#A51C30", borderColor: "#FACC15"}}
      >
        {review.review_pk === 0 ? "상품 리뷰 작성하기" : "수정하기"}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogContent>
          <div>
            <Rating
              defaultValue={reviewForm.getValues("grade")}
              onChange={(_, value) => reviewForm.setValue("grade", Number(value))}
            />
          </div>
          <TextareaAutosize
            autoFocus
            className="mt-4 w-[100%] !h-32 border border-grey p-2"
            placeholder="리뷰를 작성해 주세요. (5자 이상)"
            {...register("contents")}
          ></TextareaAutosize>
          {review.reviews_images?.length ? (
            <div className="mt-2 px-2">
              {review.reviews_images?.map((review_image) => (
                <span
                  key={review_image.review_image_pk}
                  className="p-2 relative inline-block h-[166px]"
                >
                  <Image
                    src={`/upload-images/reviews/${review_image.file_name}`}
                    alt={review_image.file_name}
                    width={150}
                    height={150}
                    priority
                    sizes="100vw"
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: "4px"
                    }}
                  />
                  <CancelIcon
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={() => reviewsImagesDelete(review_image.review_image_pk)}
                  />
                </span>
              ))}
            </div>
          ) : null}
          <TextField
            className="!mt-4"
            label="* 메인 이미지"
            type="file"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              accept: "image/*",
              multiple: true
            }}
            {...register("images")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false)
          }} color="primary" autoFocus>
            닫기
          </Button>
          {review.review_pk ? (
            <Button onClick={reviewsDelete} color="primary">
              삭제하기
            </Button>
          ) : null}
          <Button onClick={reviewsAction} color="primary" disabled={reviewForm.getValues("contents").length < 5}>
            {review.review_pk === 0 ? "작성하기" : "수정하기"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export const GeneralReview = ({
  user,
  product,
  review,
  reviewsRead
}: {
  user: User
  product?: Product
  review: Review
  reviewsRead: Function
}) => {
  return (
    // <div className="my-4 bg-white shadow overflow-hidden sm:rounded-lg mt-4">
    //   <div className="flex px-4 py-5 sm:px-6 gap-4">
    //     {!product ? (
    //       <h3 className="text-lg font-medium text-gray-900">{review.product_name}</h3>
    //     ) : null}
    //     <div className="flex justify-around items-center">
    //       <div className="mt-1 max-w-2xl text-sm text-gray-500">
    //         {review.user_name} - {moment(review.created_at).format("YYYY. MM. DD")}
    //       </div>
    //       <div className="mt-4 flex items-center">
    //       {/* 별점 표시 */}
    //         <div className="flex">
    //           {[...Array(review.grade)].map((_, index) => (
    //             <svg key={index} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    //               <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
    //             </svg>
    //           ))}
    //           <p className="ml-2 text-sm text-gray-500">{review.grade}점</p>
    //         </div>
    //       </div>
    //       <div>
    //         {review.user_pk === user.user_pk ? (
    //           <GeneralReviewsForm user={user} review={review} reviewsRead={reviewsRead} />
    //         ) : null}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
    //     <dl className="sm:divide-y sm:divide-gray-200">
    //       <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
    //         <div
    //           className="mt-1 text-sm text-gray-900 sm:col-span-2"
    //           dangerouslySetInnerHTML={{__html: review.contents.replaceAll("\n", "<br />")}}
    //         />
    //       </div>
    //     </dl>
    //   </div>
    //   <div className="px-2">
    //     {review.reviews_images?.map((review_image) => (
    //       <span
    //         key={review_image.review_image_pk}
    //         className="p-2 inline-block h-[166px]"
    //       >
    //         <Image
    //           src={`/upload-images/reviews/${review_image.file_name}`}
    //           alt={review_image.file_name}
    //           width={150}
    //           height={150}
    //           priority
    //           sizes="100vw"
    //           style={{
    //             aspectRatio: "1/1",
    //             borderRadius: "4px"
    //           }}
    //         />
    //       </span>
    //     ))}
    //   </div>
    //   <div className="px-6 py-3 flex justify-between items-center">
    //     <GeneralReviewsLikes  user={user} review={review} />
    //   </div>
    //   <GeneralReviewsReplies user={user} review={review} />
    // </div>
    <Card>
      <CardContent>
        <Image
          src={`/upload-images/reviews/${review.images}`}
          alt="상품 이미지"
          width={400}
          height={100}
          className="rounded"
          style={{marginRight: "20px"}} />
        <Typography variant="h5" component="h3" className="font-bold mt-2">
          {review.user_name}
        </Typography>
        <div className="flex items-center mt-1">
          {[...Array(review.grade)].map((_, index) => (
            <StarIcon key={index} className="text-yellow-400" />
          ))}
        </div>
        <Typography variant="body2" className="mt-2">
          {review.contents}
        </Typography>
        <div className="py-4">
          <GeneralReviewsLikes  user={user} review={review} />
        </div>
        <div>
          <GeneralReviewsReplies user={user} review={review} />
        </div>
      </CardContent>
    </Card>
  )
}

export const GeneralReviews = ({
  user,
  product,
  reviews,
  total_rows,
  reviewsSearchParams
}: {
  user: User
  product?: Product
  reviews: Review[]
  total_rows: number
  reviewsSearchParams: ReviewsSearchParams
}) => {
  const reviewsForm = useForm<{
    reviews: Review[]
    total_rows: number
  }>({
    defaultValues: {
      reviews,
      total_rows
    }
  })
  reviewsForm.watch("reviews")
  const reviewsRead = async () => {
    const reviewsResponse: ResponseApi = await reviewsServices.reviewsRead(reviewsSearchParams)
    reviewsForm.setValue("reviews", reviewsResponse.data.reviews)
    reviewsForm.setValue("total_rows", reviewsResponse.data.total_rows)
  }
  const reviewStats = {
    total: total_rows,
    fiveStars: reviews.filter((review) => review.grade === 5).length,
    fourStars: reviews.filter((review) => review.grade === 4).length,
    threeStars: reviews.filter((review) => review.grade === 3).length,
    twoStars: reviews.filter((review) => review.grade === 2).length,
    oneStar: reviews.filter((review) => review.grade === 1).length
  }
  return (
    <div className="container">
      <div className="py-8" style={{fontSize: "30px"}}><strong>고객리뷰</strong></div>
      {total_rows === 0 ? (
        <div className="mb-6">등록된 리뷰가 없습니다.</div>
      ) : (
        <div className="mb-6 p-4">
          {Object.entries(reviewStats).slice(1).map(([key, val], index) => (
            <div key={index} className="flex items-center">
              <Typography variant="body1" className="w-24">
                {key.replace("Stars", " Stars")}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={parseFloat((val * 100 / total_rows).toFixed(1))}
                sx={{
                  width: `${(val * 100 / total_rows).toFixed(1)}%`,
                  backgroundColor: "#271A11",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#FACC15"
                  }
                }}
                className="mx-2"
              />
              <Typography variant="body2">{(val * 100 / total_rows).toFixed(1)}%</Typography>
            </div>
          ))}
        </div>
      )}
      {product ? (
        <GeneralReviewsForm
          user={user}
          review={{
            review_pk: 0,
            product_pk: product.product_pk,
            user_pk: user.user_pk,
            grade: 5,
            contents: ""
          }}
          reviewsRead={reviewsRead}
        />
      ) : null}
      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <GeneralReview
              key={review.review_pk}
              user={user}
              product={product}
              review={review}
              reviewsRead={reviewsRead}
            />
          </Grid>
        ))}
      </Grid>
      {reviewsForm.getValues("reviews").length ? (
        <GeneralReviewsPagination
          searchParams={reviewsSearchParams}
          total_rows={reviewsForm.getValues("total_rows")}
          reviewsRead={reviewsRead}
        />
      ) : null}
    </div>
  )
}

export const GeneralReviewsPagination = ({
  searchParams,
  total_rows,
  reviewsRead
}: {
  searchParams: SearchParams,
  total_rows: number
  reviewsRead: Function
}) => {
  return (
    <Pagination
      variant="outlined"
      color="primary"
      showFirstButton
      showLastButton
      shape="rounded"
      count={Math.ceil(total_rows / searchParams.rowsPerPage)}
      page={searchParams.page + 1}
      className="flex justify-center py-4"
      onChange={(_, value) => {
        window.history.pushState({}, "", window.location.pathname + "?" + new URLSearchParams({
          ...searchParams,
          page: String(value - 1)
        }))
        searchParams.page = Number(value - 1) as never
        reviewsRead()
      }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black"
              }
            }
          }}
        />
      )}
    />
  )
}
