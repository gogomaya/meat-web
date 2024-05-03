"use client"
import {ProductsList} from "@/app/products/products"
import {Divider, Typography} from "@mui/material"
import Image from "next/image"
import {useState} from "react"

export const HomeKeyPoint = () => {
  return (
    <section>
      <Image
        src="/images/main-pledge.jpg"
        alt="Logo"
        width={0}
        height={0}
        priority
        sizes="100vw"
        className="w-full py-4"
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
        className="w-full py-4"
      />
    </section>
  )
}

export const HomeBrandStory = () => {
  return (
    <section className="flex flex-col md:flex-row items-center w-full px-4 py-2" style={{marginBottom: "50px", marginTop: "50px"}}>
      <Divider sx={{border:"2px solid red", width: "115px"}} className="mb-4 md:mb-0 md:mr-5" />
      <div className="w-full md:w-[30%] md:mr-5">
        <Typography variant="h3" className="mb-4 md:mb-0">Brand Story</Typography>
      </div>
      <div className="w-full md:w-[46%]">
        <Typography className="mb-1" variant="h6" color="textSecondary">대한민국 육식문화</Typography>
        <Typography className="mb-1" variant="h6" color="textSecondary">프리미엄에 프리미엄을 더하다</Typography>
        <Typography variant="h6" color="textSecondary">대한민국에서 가장 좋은 고기로 정직하게 보여드리겠습니다</Typography>
      </div>
    </section>
  )
}

export const HomeDunDunRice = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={"container mx-auto py-24 bg-center"}
      style={{backgroundImage: "url('/images/3.jpg')"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white bg-opacity-75 rounded-lg p-8">
        <div>
          <Image
            src="/images/10.jpg"
            alt="Ddun Dun Rice"
            width={600}
            height={400}
            className={`rounded-lg ${isHovered ? "transform scale-105 transition-all duration-5000" : ""}`}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold mb-4">든든한 한끼를 즐겨보세요</p>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim erat id erat accumsan, a mattis eros ultricies. Ut sed sollicitudin nisl.</p>
        </div>
      </div>
    </div>
  )
}

export const HomeIntro = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={"container mx-auto py-24 my-10 bg-center relative"}
      style={{backgroundImage: "url('/images/10.jpg')"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg p-8 relative z-10">
        <div className="hidden md:block bg-white bg-opacity-75 rounded-lg w-full h-full md:w-1/2 md:col-start-2"></div>
        <div className="flex flex-col justify-center w-full md:w-2/3 md:col-start-2">
          <p className="text-xl font-semibold mb-4">든든한 한끼를 즐겨보세요</p>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim erat id erat accumsan, a mattis eros ultricies. Ut sed sollicitudin nisl.</p>
        </div>
      </div>
    </div>
  )
}


export const HomeBestMenu = () => {
  return (
    <section className="mt-5 py-10">
      <Image
        src="/images/monthly-best-review.jpg"
        alt="best-menu1"
        width={100}
        height={100}
        priority
        sizes="100vw"
        className="w-full py-10"
      /><ProductsList />
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
