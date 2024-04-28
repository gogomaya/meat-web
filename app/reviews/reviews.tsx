"use client"
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputBase, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material"
import * as React from "react"
import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {red} from "@mui/material/colors"
import SearchIcon from "@mui/icons-material/Search"
import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa"
import Image from "next/image"



export const ReviewCard = () => {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/images/4.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            이야..이거 만족도 상당히 높습니다. 
            꽃삼겹 기름 정말 깨끗하고요, 비린내 누린내 잡내 정말 1도 안나요.. 너무 신기해요. 
            여지껏 먹어본 대패고기들 중에 1등입니다. 
            저희 엄마랑 언니는 비계를 싫어해서 뒷다리살을 구워먹는 사람들인데, 꽃삼겹 대패는 이게 뭐냐 너무 맛있다고 하면서 잘 먹었습니다. 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export const MonthlyBestReview = () => {
  const [openDialog, setOpenDialog] = React.useState(false)

  const openDialogHandler = () => {
    setOpenDialog(true)
  }

  const closeDialogHandler = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Dialog open={openDialog} onClose={closeDialogHandler} >
        <DialogTitle>리뷰 상세 보기</DialogTitle>
        <DialogContent>
          {/* 여기에 리뷰 상세 내용을 표시합니다. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler} color="primary">닫기</Button>
        </DialogActions>
      </Dialog>
      <Image
        src="/images/monthly-best-review.jpg"
        alt="best-menu1"
        width={100}
        height={100}
        priority
        sizes="100vw"
        className="w-full py-10"
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        <li className="block" onClick={openDialogHandler}>
          <ReviewCard />
        </li>
        <li className="block" onClick={openDialogHandler}>
          <ReviewCard />
        </li>
        <li className="block" onClick={openDialogHandler}>
          <ReviewCard />
        </li>
      </ol>
    </>
  )
}
  

export const PhotoReview = () => {
  return (
    <>
      <span className="my-8 mt-4 block"><strong>PHOTO REVIEW | 포토리뷰</strong></span>

      <section className="flex justify-between items-center mt-4">
        <FormControl className="w-full md:w-[50%] lg:w-[40%]">
          <InputLabel>카테고리를 선택해주세요</InputLabel>
          <Select
            label="카테고리"
            className="w-full"
          >
            <MenuItem value="소고기">소고기</MenuItem>
            <MenuItem value="돼지고기">돼지고기</MenuItem>
            <MenuItem value="간편식">간편식</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="w-full md:w-[30%] lg:w-[20%]">
          <InputLabel>정렬</InputLabel>
          <Select
            label="최신순"
            className="w-full"
          >
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="별점순">별점순</MenuItem>
            <MenuItem value="추천순">추천순</MenuItem>
          </Select>
        </FormControl>
        <div className="flex w-full md:w-[20%] lg:w-[30%]">
          <InputBase
            className="flex-1"
            placeholder="검색어를 입력해주세요."
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </div>
      </section>
      <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <li>
          <ReviewCard />
        </li>
        <li>
          <ReviewCard />
        </li>
        <li>
          <ReviewCard />
        </li>
        <li>
          <ReviewCard />
        </li>
      </ol>
    </>
  )
}

export const PhotoPagination = () => {
  return (
    <Pagination
      variant="outlined"
      color="primary"
      count={5}
      page={1}
      className="flex justify-center mt-4"
    />
  )
}

export const GeneralReview = () => {
  return (
    <div className="my-4 bg-white shadow overflow-hidden sm:rounded-lg mt-4">
      {/* 리뷰 헤더 */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900"> 아주 좋아요</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">작성자 - 2024년 4월 24일</p>
        <div className="mt-4 flex items-center">
          {/* 별점 표시 */}
          <div className="flex">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
            </svg>
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
            </svg>
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
            </svg>
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
            </svg>
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
            </svg>
          </div>
          {/* 리뷰 별점 */}
          <p className="ml-2 text-sm text-gray-500">5점</p>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <div className="mt-1 text-sm text-gray-900 sm:col-span-2">국거리 용으로 샀는데 국물부터가 달라요 찐맛 <br></br>구이용으로도 먹어봤는데 나쁘지않아요 ㅎ워낙 고기맛이좋아</div>
          </div>
        </dl>
      </div>
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FaRegThumbsUp className="text-gray-500 cursor-pointer mr-2" /><span>좋아요</span>
          <FaRegThumbsDown className="text-gray-500 cursor-pointer" /><span>싫어요</span>
        </div>
      </div>
    </div>
  )
}

export const GeneralPagination = () => {
  return (
    <Pagination
      variant="outlined"
      color="primary"
      count={5}
      page={1}
      className="flex justify-center my-4"
    />
  )
}

