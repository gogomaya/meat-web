"use client"
import Image from "next/image"

// 배송 리스트
export const OrderList = () => {
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
