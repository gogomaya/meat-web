"use client"
import {Bookmark} from "@/types/bookmarksTypes"
import Image from "next/image"
import Link from "next/link"

interface BookMarkListProps {
  bookmarks: Bookmark[]
}

export const BookMarkList = ({bookmarks}: BookMarkListProps) => {
  console.log(bookmarks)
  return (
    <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.bookmark_pk} className="w-full flex gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
          <div className="item flex-1">
            <div className="inner">
              <Image
                src="/images/logo.png"
                alt=""
                width={128}
                height={128}
                className="w-full"
                priority
              />
            </div>
          </div>
          <div className="item flex-[3]">
            <div className="h-full flex flex-col flex-wrap gap-6 p-1">
              {/* 상품 간단 설명 */}
              <div className="item">
                <span className="text-sm text-gray-500">{bookmark.description}</span>
              </div>
              {/* 상품명 */}
              <div className="item">
                <span className="font-bold">{bookmark.name}</span>
              </div>
              <div className="item">
                <p className="font-bold text-[#A51C30]">
                  <span>{bookmark.price.toLocaleString()}</span>원
                </p>
              </div>
            </div>
          </div>
          <div className="item flex-1">
            <div className="h-full flex flex-col justify-between">
              <div className="item">
                <Link href={`/order?productPks=${bookmark.product_pk}&quantityList=1`} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  주문하기
                </Link>
              </div>
              <div className="item">
                {/* TODO: 장바구니로 연결 */}
                <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  장바구니 담기
                </button>
              </div>
              <div className="item">
                {/* TODO: 찜 리스트 항목 삭제 */}
                <button className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}