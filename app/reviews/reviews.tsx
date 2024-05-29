"use client"
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputBase, InputLabel, MenuItem, Pagination, Select, Typography, LinearProgress} from "@mui/material"
import * as React from "react"
import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {red} from "@mui/material/colors"
import SearchIcon from "@mui/icons-material/Search"
import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa"
import Image from "next/image"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import StarIcon from "@mui/icons-material/Star"

export const reviews = [
  {
    id: 1,
    title: "Shrimp and Chorizo Paella",
    date: "2024-03-09",
    category: "pork",
    content: "이야..이거 만족도 상당히 높습니다. 꽃삼겹 기름 정말 깨끗하고요, 비린내 누린내 잡내 정말 1도 안나요.. 너무 신기해요. 여지껏 먹어본 대패고기들 중에 1등입니다. 저희 엄마랑 언니는 비계를 싫어해서 뒷다리살을 구워먹는 사람들인데, 꽃삼겹 대패는 이게 뭐냐 너무 맛있다고 하면서 잘 먹었습니다.",
    rating: 5,
    likes: 10,
    src: "17.jpg"
  },
  {
    id: 2,
    title: "Shrimp and Chorizo Paella",
    date: "2024-04-09",
    category: "beef",
    content: "꽃삼겹 기름 정말 깨끗하고요, 비린내 누린내 잡내 정말 1도 안나요.. 너무 신기해요. 여지껏 먹어본 대패고기들 중에 1등입니다. 저희 엄마랑 언니는 비계를 싫어해서 뒷다리살을 구워먹는 사람들인데, 꽃삼겹 대패는 이게 뭐냐 너무 맛있다고 하면서 잘 먹었습니다.",
    rating: 4,
    likes: 5,
    src: "17.jpg"
  },
  {
    id: 3,
    title: "Delicious Beef Steak",
    date: "2024-01-09",
    category: "pork",
    content: "오랜만에 스테이크를 먹으러 갔는데 정말 맛있었습니다. 고기가 너무 부드럽고, 그릴맛이 일품이었습니다. 곁들여진 소스도 환상적이었습니다. 다음에 또 방문하고 싶은 식당이네요!",
    rating: 1,
    likes: 20,
    src: "17.jpg"
  },
  {
    id: 4,
    title: "Shrimp and Chorizo Paella",
    date: "2024-01-09",
    category: "beef",
    content: "오랜만에 스테이크를 먹으러 갔는데 정말 맛있었습니다. 고기가 너무 부드럽고, 그릴맛이 일품이었습니다. 곁들여진 소스도 환상적이었습니다. 다음에 또 방문하고 싶은 식당이네요!",
    rating: 11,
    likes: 11,
    src: "17.jpg"
  },
  {
    id: 5,
    title: "Shrimp and Chorizo Paella",
    date: "2024-05-09",
    category: "simple",
    content: "점심으로 스시를 시켰는데, 롤이 정말 맛있었습니다. 신선한 재료와 조화로운 맛이 인상적이었습니다. 포장도 깔끔하게 되어있어서 가져다 먹기에 편리했습니다. 다음에 또 주문하려고요!",
    rating: 7,
    likes: 5,
    src: "17.jpg"
  }
]

export const ReviewCard = ({reviews}: {reviews: any[]}) => {
  const [copied, setCopied] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedReview, setSelectedReview] = React.useState(null as any)

  const copyToClipboard = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => console.error("Could not copy text: ", err))
  }

  const openDialogHandler = (review: any) => {
    setSelectedReview(review)
    setOpenDialog(true)
  }

  const closeDialogHandler = () => {
    setOpenDialog(false)
  }

  const getContentPreview = (content: string) => {
    if (content.length > 100) {
      return `${content.substring(0, 100)}...`
    }
    return content
  }

  return (
    <>
      <Dialog open={openDialog} onClose={closeDialogHandler} maxWidth="lg">
        <DialogTitle>리뷰 상세 보기</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <>
              <div className="flex" style={{marginBottom: "20px"}}>
                <Image
                  src={`/images/${selectedReview.src}`}
                  alt="상품 이미지"
                  width={400}
                  height={100}
                  className="rounded"
                  style={{marginRight: "20px"}} />
                <div style={{flex: 1}}>
                  <h2 style={{margin: "0", fontSize: "1.2em"}}>{selectedReview.title}</h2>
                  <p style={{margin: "5px 0", lineHeight: "1.5"}}>{selectedReview.date}</p>
                  <p style={{margin: "5px 0", lineHeight: "1.5"}}>{selectedReview.content}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler} color="primary">닫기</Button>
        </DialogActions>
      </Dialog>
      <div>
        {reviews.map((review) => (
          <Card key={review.id} sx={{maxWidth: 345, height: "100%", marginBottom: "16px"}}>
            <CardHeader
              avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                R
              </Avatar>}
              action={<IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>}
              title={review.title}
              subheader={review.date}
              onClick={() => openDialogHandler(review)}
              style={{cursor: "pointer"}}
            />
            <CardContent onClick={() => openDialogHandler(review)} style={{cursor: "pointer"}}>
              <Typography variant="body2" color="text.secondary">
                {getContentPreview(review.content)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />{review.likes}
              </IconButton>
              <IconButton aria-label="add to favorites">
                <StarIcon />{review.rating}
              </IconButton>
              <IconButton aria-label="share" onClick={copyToClipboard}>
                {copied ? <CheckCircleIcon /> : <ShareIcon />}
              </IconButton>
              {copied && <span>주소가 복사되었습니다</span>}
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  )
}

export const MonthlyBestReview = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const bestReviews = reviews
    .filter((review) => {
      const [reviewYear, reviewMonth] = review.date.split("-").map(Number)
      return reviewYear === currentYear && reviewMonth === currentMonth
    })
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)

  return (
    <>
      <Image
        src="/images/monthly-best-review.jpg"
        alt="best-menu1"
        width={100}
        height={100}
        priority
        sizes="100vw"
        className="w-full py-10"
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-3">
        {bestReviews.map((review, index) => (
          <li key={index} className="block">
            <ReviewCard key={index} reviews={[review]} />
          </li>
        ))}
      </ol>
    </>
  )
}

export const ProductDetailReview = () => {
  const reviews = [
    {
      name: "Emily Selman",
      rating: 4,
      comment: "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
      imageUrl: "/images/1.jpg"
    },
    {
      name: "Hector Gibbons",
      rating: 5,
      comment: "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
      imageUrl: "/images/1.jpg"
    },
    {
      name: "Mark Edwards",
      rating: 5,
      comment: "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
      imageUrl: "/images/1.jpg"
    },
    {
      name: "Mark Edwards",
      rating: 5,
      comment: "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
      imageUrl: "/images/1.jpg"
    }
  ]

  const reviewStats = {
    total: 1624,
    fiveStars: 63,
    fourStars: 10,
    threeStars: 6,
    twoStars: 12,
    oneStar: 9
  }

  return (
    <div className="p-4 bg-white">
      <div className="py-4" style={{fontSize: "30px"}}><strong>고객리뷰</strong></div>
      <div className="mb-6">
        {Object.entries(reviewStats).slice(1).map(([key, val], index) => (
          <div key={index} className="flex items-center">
            <Typography variant="body1" className="w-24">
              {key.replace("Stars", " Stars")}
            </Typography>
            <LinearProgress variant="determinate" value={val} style={{width: "50%"}} className="mx-2" />
            <Typography variant="body2">{val}%</Typography>
          </div>
        ))}
      </div>
      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant="outlined" className="h-full">
              <CardContent>
                <Image
                  src="/images/7.jpg"
                  alt="상품 이미지"
                  width={400}
                  height={100}
                  className="rounded"
                  style={{marginRight: "20px"}} />
                <Typography variant="h5" component="h3" className="font-bold mt-2">
                  {review.name}
                </Typography>
                <div className="flex items-center mt-1">
                  {Array.from({length: review.rating}, (_, i) => (
                    <StarIcon key={i} className="text-yellow-400" />
                  ))}
                </div>
                <Typography variant="body2" className="mt-2">
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" className="mt-4">
        상품 리뷰 작성하기
      </Button>
    </div>
  )
}

export const PhotoReview = () => {
  const [sortBy, setSortBy] = React.useState("최신순")

  const sortReviews = (reviews: any[]) => {
    switch(sortBy) {
    case "최신순":
      return reviews.slice().sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any))
    case "별점순":
      return reviews.slice().sort((a, b) => b.rating - a.rating)
    case "추천순":
      return reviews.slice().sort((a, b) => b.likes - a.likes)
    default:
      return reviews
    }
  }

  const photoReviews = sortReviews(reviews.filter((review) => review.src ? true : false))

  return (
    <>
      <section className="flex justify-between items-center m-8 p-2">
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3">
        {photoReviews.map((review, index) => (
          <li key={index} className="block">
            <ReviewCard key={index} reviews={[review]} />
          </li>
        ))}
      </ol>
    </>
  )
}

export const GeneralReview = ({title, content, likes, rating}: {title: string, content: string, likes: number, rating: number}) => {

  const [liked, setLiked] = React.useState(false)
  const [disliked, setDisliked] = React.useState(false)

  const handleLikeClick = () => {
    setLiked(!liked)
    if (disliked) {
      setDisliked(false)
    }
  }

  const handleDislikeClick = () => {
    setDisliked(!disliked)
    if (liked) {
      setLiked(false)
    }
  }


  return (
    <div className="my-4 bg-white shadow overflow-hidden sm:rounded-lg mt-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">작성자 - {new Date().toLocaleDateString()}</p>
        <div className="mt-4 flex items-center">
          {/* 별점 표시 */}
          <div className="flex">
            {[...Array(rating)].map((_, index) => (
              <svg key={index} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .67.41l1.69 3.429 3.775.549a.75.75 0 0 1 .416 1.279l-2.732 2.67.645 3.758a.75.75 0 0 1-1.088.791L10 14.729l-3.385 1.782a.75.75 0 0 1-1.088-.791l.645-3.758-2.732-2.67a.75.75 0 0 1 .416-1.28l3.775-.548 1.69-3.429A.75.75 0 0 1 10 2z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-500">{rating}점</p>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <div className="mt-1 text-sm text-gray-900 sm:col-span-2">{content}</div>
          </div>
        </dl>
      </div>
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FaRegThumbsUp
            className={liked ? "text-red-500 cursor-pointer mr-2" : "text-gray-500 cursor-pointer mr-2"}
            onClick={handleLikeClick}
          />
          <span>좋아요</span>
          <FaRegThumbsDown
            className={disliked ? "text-red-500 cursor-pointer ml-2" : "text-gray-500 cursor-pointer ml-2"}
            onClick={handleDislikeClick}
          />
          <span>싫어요</span>
        </div>
        <span>{likes}</span>
      </div>
    </div>
  )
}

export const GeneralReviews = () => {
  return (
    <div>
      {reviews.map((review: any) => (
        <GeneralReview
          key={review.id}
          title={review.title}
          content={review.content}
          likes={review.likes}
          rating={review.rating}
        />
      ))}
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
