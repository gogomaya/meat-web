"use client"
import Image from "next/image"
import Link from "next/link"
import {FormControl, InputLabel, MenuItem, Pagination, Select} from "@mui/material"

export const ProductsSearch = () => {
  return (
    <section className="flex justify-between items-center">
      <span>상품이 모두 <strong>4</strong>개 있습니다.</span>
      <FormControl>
        <InputLabel>상품정렬</InputLabel>
        <Select
          label="상품정렬"
          className="w-32"
        >
          <MenuItem value="신상품">신상품</MenuItem>
          <MenuItem value="추천순">추천순</MenuItem>
          <MenuItem value="판매량순">판매량순</MenuItem>
        </Select>
      </FormControl>
    </section>
  )
}

export const ProductsPagination = () => {
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
