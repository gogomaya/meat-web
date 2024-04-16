"use client"
import Image from "next/image"
import Link from "next/link"

export const ProductsList = () => {
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
