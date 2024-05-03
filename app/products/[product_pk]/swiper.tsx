"use client"
import Image from "next/image"
import {Swiper, SwiperSlide} from "swiper/react"
import {FreeMode, Navigation, Thumbs} from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import {useState} from "react"

export default function ProductSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <style jsx>{`
        .thumbsSwiper .swiper-slide-thumb-active {
          opacity: 1;
        }
      `}</style>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-80 w-full"
      >
        <SwiperSlide>
          <Image
            src="/images/10.jpg"
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
            src="/images/12.jpg"
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
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-20 box-border my-3 opacity-90"
      >
        <SwiperSlide className="thumbsSwiper">
          <Image
            src="/images/10.jpg"
            alt="Logo"
            width={0}
            height={0}
            priority
            sizes="100vw"
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="thumbsSwiper">
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
        <SwiperSlide className="thumbsSwiper">
          <Image
            src="/images/12.jpg"
            alt="Logo"
            width={0}
            height={0}
            priority
            sizes="100vw"
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="thumbsSwiper">
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
    </>
  )
}