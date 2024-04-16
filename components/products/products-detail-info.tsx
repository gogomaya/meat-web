"use client"
import Image from "next/image"
import {Button} from "@mui/material"

const ProductsDetailInfo = () => {
  return (
    <div className="lg:flex">
      <div className="mx-4 flex justify-center lg:block lg:flex-1 ">
        <Image
          src="https://www.vancleefarpels.com/content/dam/rcq/vca/qw/jf/Qg/vG/Ek/2i/pE/i3/bx/lD/hw/qwjfQgvGEk2ipEi3bxlDhw.jpeg.transform.vca-w820-2x.jpeg"
          alt="아 슈발 11개 라인 브레이슬릿"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-auto"
        />
      </div>
      <div className="mx-4 text-center lg:text-left lg:min-w-[420px]">
        <h3 className="text-xl font-bold">아 슈발 11개 라인 브레이슬릿</h3>
        <ul className="my-6 text-sm leading-8 text-gray-600">
          <li>18K 핑크 골드, 다이아몬드</li>
          <li>₩1,670,500,000 세금 포함</li>
        </ul>
        <Button className="w-full" variant="outlined">
          <span
            className="font-['NanumGothic']"
            onClick={() => alert("010-5517-2108")}
          >전화 주문</span>
        </Button>
      </div>
    </div>
  )
}

export default ProductsDetailInfo
