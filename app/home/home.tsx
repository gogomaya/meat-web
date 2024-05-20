"use client"
import {ProductsList} from "@/app/products/products"
import {Product} from "@/types/productsTypes"
import {Divider, Typography} from "@mui/material"
import Image from "next/image"
import {useState} from "react"

export const HomeBestMenu = ({products}: {products: Product[]}) => {
  return (
    <section className="mt-5 py-10">
      <ProductsList products={products} />
    </section>
  )
}

export const HomeWhyUs = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      className="section why bg-cover bg-center bg-no-repeat p-6 md:p-12 text-white"
      style={{
        backgroundImage: "url(\"/images/Bg.png\")"
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col space-y-4 md:w-1/2">
          <div className="why-inner text-3xl font-extrabold text-yellow-400">WHY US?</div>
          <div className="why-inner text-2xl font-bold text-white">왜<span className="text-yellow-400">&apos;한솔축산&apos;</span>인가?</div>
          <div className="why-inner text-lg text-gray-300">
            <span className="text-yellow-400">&lsquo;신선함을 잇다&rsquo;</span>는 바로 고객과의
            <br />
            신뢰와 품질을 지키기 위해
            <br />
            노력하는 약속입니다.
          </div>
          <div className="space-y-2">
            <div className="why-inner text-lg text-white">한솔축산은 신선한 프리미엄 한우 1++ No.9만을 고집합니다.<br />누구나 특별한 날, 특별한 시간을 즐길 수 있도록!<br />하누솔이 만들어 드립니다.</div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
          <iframe
            src="https://www.youtube.com/embed/GSwEU2vT9LI?si=3Ub8EckRz6lTQJMQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full aspect-video"
          ></iframe>
        </div>
      </div>
    </section>
  )
}


// 기타 section
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
