"use client"
import {ProductsList} from "@/app/products/products"
import { Divider, Typography } from "@mui/material"
import Image from "next/image"

export const HomePledge = () => {
  return (
    <section>
      <Image
        src="/images/main-pledge.jpg"
        alt="Logo"
        width={0}
        height={0}
        priority
        sizes="100vw"
        className="w-full"
      />
    </section>
  )
}

export const HomeBestReview = () => {
  return (
    <section>
      <Image
        src="/images/main-best-review.png"
        alt="Logo"
        width={0}
        height={0}
        priority
        sizes="100vw"
        className="w-full"
      />
    </section>
  )
}

export const HomeBrandStory = () => {
  return (
    <section className="flex items-center w-full" style={{ marginBottom: '50px', marginTop: '50px' }}>      
      <Divider sx={{ border:'2px solid red', width: '115px'}}/>
      <Typography className="mx-5 w-[30%]" variant="h3">Brand Story</Typography>
      <div className="w-[46%]">
        <Typography className="mb-1" variant="h6" color="textSecondary">대한민국 육식문화</Typography>
        <Typography className="mb-1" variant="h6" color="textSecondary">프리미엄에 프리미엄을 더하다</Typography>
        <Typography variant="h6" color="textSecondary">대한민국에서 가장 좋은 고기로 정직하게 보여드리겠습니다</Typography>
      </div>
    </section>
  )
}

export const HomeBestMenu = () => {
  return (
    <section className="mt-5">
      <h2 className="flex justify-center">BEST MENU</h2>
      <ProductsList />
    </section>
  )
}

export const HomeYoutube = () => (
  <iframe
    src="https://www.youtube.com/embed/GSwEU2vT9LI?si=3Ub8EckRz6lTQJMQ"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    className="w-full aspect-video mt-5"
  ></iframe>
)
