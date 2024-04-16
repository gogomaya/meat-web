"use client"
import Image from "next/image"
import Link from "next/link"
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, FormControl, IconButton, InputBase, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material"
import * as React from "react"
import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {red} from "@mui/material/colors"
import SearchIcon from "@mui/icons-material/Search"


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
        image="/images/review1.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            이야..이거 만족도 상당히 높습니다. 
            꽃삼겹 기름 정말 깨끗하고요, 비린내 누린내 잡내 정말 1도 안나요.. 너무 신기해요. 
            여지껏 먹어본 대패고기들 중에 1등입니다. 
            저희 엄마랑 언니는 비계를 싫어해서 뒷다리살을 구워먹는 사람들인데, 꽃삼겹 대패는 이게 뭐냐 너무 맛있다고 하면서 잘 먹었습니다. 
            정말 신선하고 고기가 야들야들하니 너무 좋았어요. 재구매하겠습니다, 번창하세요!
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
  return (
    <ol>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[33.3%]">
        <ReviewCard />
      </li>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[33.3%]">
        <Link href="/products/1">
          <ReviewCard />
        </Link>
      </li>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[33.3%]">
        <Link href="/products/1">
          <ReviewCard />
        </Link>
      </li>
    </ol>
  )
}
  

export const PhotoReview = () => {
  return (
    <><span>PHOTO REVIEW | 포토리뷰</span>

      <section className="flex justify-between align-center">
        <FormControl className="lg:w-[50.3%]">
          <InputLabel>카테고리를 선택해주세요</InputLabel>
          <Select
            label="카테고리"
            className="w-50"
          >
            <MenuItem value="소고기">소고기</MenuItem>
            <MenuItem value="돼지고기">돼지고기</MenuItem>
            <MenuItem value="간편식">간편식</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>정렬</InputLabel>
          <Select
            label="최신순"
            className="w-40"
          >
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="별점순">별점순</MenuItem>
            <MenuItem value="추천순">추천순</MenuItem>
          </Select>
        </FormControl>
        <section className="flex">
          <InputBase
            className="flex-1"
            placeholder="검색어를 입력해주세요."
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </section>    </section><ol>
        <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[20.0%]">
          <ReviewCard />
        </li>
        <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[20.0%]">
          <ReviewCard />
        </li>
        <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[20.0%]">
          <ReviewCard />
        </li>
        <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[20.0%]">
          <ReviewCard />
        </li>
        <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[20.0%]">
          <ReviewCard />
        </li>
      </ol></>
  )
}

export const PhotoPagination = () => {
  return (
    <Pagination
      variant="outlined"
      color="primary"
      count={5}
      page={1}
      className="flex justify-center"
    />
  )
}

export const GeneralReview = () => {
  return (
    <ol>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Link href="/products/1">
          <Image
            src="/images/main-best-menu1.jpg"
            alt="best-menu1"
            width={0}
            height={0}
            priority
            sizes="100vw"
            className="w-full aspect-square object-cover"
          />
        </Link>
        <p>
          <Link href="/products/1">한우암소 육회&사시미 400g</Link><br />
          <strong>26,000원</strong>
        </p>
      </li>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Image
          src="/images/main-best-menu2.jpg"
          alt="best-menu2"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full aspect-square object-cover"
        />
      </li>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Image
          src="/images/main-swiper2.jpg"
          alt="best-menu3"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full aspect-square object-cover"
        />
      </li>
      <li className="inline-block align-top w-[50%] md:w-[33.3%] lg:w-[25%]">
        <Image
          src="/images/main-swiper3.jpg"
          alt="best-menu4"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full aspect-square object-cover"
        />
      </li>
    </ol>
  )
}

export const GeneralPagination = () => {
  return (
    <Pagination
      variant="outlined"
      color="primary"
      count={5}
      page={1}
      className="flex justify-center"
    />
  )
}

