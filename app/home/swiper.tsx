"use client"
import Image from "next/image"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay, Pagination} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const HomeSwiper = () => {
  return (
    <Swiper
      loop
      autoplay={{delay: 4000}}
      modules={[Autoplay, Pagination]}
      pagination={{clickable: true}}
      className="w-full absolute full-css"
    >
      <SwiperSlide>
        <Image
          src="/images/12.jpg"
          alt="Logo"
          layout="responsive"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/11.jpg"
          alt="Logo"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/13.jpg"
          alt="Logo"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-full"
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default HomeSwiper
