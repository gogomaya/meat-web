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
