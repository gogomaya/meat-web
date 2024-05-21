"use client"
import {ProductsList} from "@/app/products/products"
import {Product} from "@/types/productsTypes"
import Image from "next/image"
import Link from "next/link"
import {useEffect, useRef, useState} from "react"

export const HomeBanner = () => {
  return (
    <section
      className="section bg-cover bg-center bg-no-repeat py-2 p-6 md:p-12 text-white relative"
      style={{
        backgroundImage: "url('/images/Bg.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textAlign: "center",
        minHeight: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="flex flex-col items-center space-y-4 md:w-1/2" style={{maxWidth: "800px"}}>
        <div className="text-6xl font-extrabold text-yellow-400 shadow-lg">Premium No.9</div>
        <div className="text-4xl font-bold text-white shadow">모든 작업을 직접하여 적은 유통마진으로</div>
        <div className="text-2xl text-gray-300 shadow">
          <span style={{color: "red"}}>한우1++</span>
          <span style={{color: "yellow"}}>No.9</span>만을 판매하는 한솔축산입니다.
        </div>
        <div className="space-y-2">
          <button className="py-2 px-4 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition duration-300 ease-in-out shadow-lg">오늘의 메뉴 바로가기</button>
        </div>
      </div>

      <style jsx>{`
        .section::before, .section::after {
          content: '';
          position: absolute;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .section::before {
          top: 0;
          left: 0;
          width: 530px;
          height: 340px;
          background-image: url('/images/meat-img02.png');
          transform: translate(24%, 0%);
        }
        .section::after {
          bottom: 0;
          right: 0;
          width: 462px;
          height: 446px;
          background-image: url('/images/meat-img01.png');
          transform: translate(-19%, 37%);
        }
      `}</style>
    </section>
  )
}

export const HomeCateMenu = () => {
  return (
    <section className="p-6 md:p-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative section bg-cover bg-center bg-no-repeat flex-1 h-64 md:h-auto" style={{backgroundImage: "url('/images/12.jpg')"}}>
          <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-60 transition duration-300"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white p-4">
            <div className="text-2xl font-bold mb-4">한우 투뿔 꽃등심 <br />부채살</div>
            <button className="py-2 px-4 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-300">소고기 바로가기</button>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex flex-1 gap-6">
            <div className="relative section bg-cover bg-center bg-no-repeat flex-1 h-64 md:h-auto" style={{backgroundImage: "url('/images/11.jpg')"}}>
              <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-70 transition duration-300"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-4">
                <div className="text-2xl font-bold mb-4">생삼겹살 목살</div>
                <button className="py-2 px-4 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-300">돼지고기 바로가기</button>
              </div>
            </div>
            <div className="relative section bg-cover bg-center bg-no-repeat flex-1 h-64 md:h-auto" style={{backgroundImage: "url('/images/13.jpg')"}}>
              <div className="absolute inset-0 bg-black bg-opacity-60 hover:bg-opacity-80 transition duration-300"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-4">
                <div className="text-2xl font-bold mb-4">육회 & 육사시미</div>
                <button className="py-2 px-4 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-300">육회 바로가기</button>
              </div>
            </div>
          </div>
          <div className="relative section bg-cover bg-center bg-no-repeat flex-1 h-64 md:h-auto" style={{backgroundImage: "url('/images/15.jpg')"}}>
            <div className="absolute inset-0 bg-black bg-opacity-70 hover:bg-opacity-90 transition duration-300"></div>
            <div className="relative flex flex-col justify-center items-center h-full text-white p-4">
              <div className="text-2xl font-bold mb-4">고추장불고기 & 간장불고기 <br />제육볶음 주물럭 밀키트</div>
              <button className="py-2 px-4 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-300">밀키트 바로가기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const HomeBestMenu = ({products}: { products: Product[] }) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible && elementRef.current) {
        const top = elementRef.current.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        if (top < windowHeight) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isVisible])

  const animationStyle = isVisible ? {animation: "slideIn 1.5s forwards"} : {}

  return (
    <section className="mt-5 py-10">
      <div className="container mx-auto">
        <div ref={elementRef} className="flex flex-col items-start mb-4 px-6" style={animationStyle}>
          <h2 className="text-lg font-semibold text-gray-600">당신의 식탁을 풍요롭게</h2>
        </div>
        <div className="flex justify-between items-start mb-8 px-6">
          <div className="flex items-center space-x-2" style={animationStyle}>
            <div className="text-4xl font-bold text-gray-700">🥇 베스트 상품</div>
          </div>
          <div>
            <Link href="/">
              <svg
                width="70"
                height="70"
                viewBox="0 0 57 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:scale-110 transition transform duration-300"
              >
                <path
                  d="m28.5 9.5-3.349 3.349 13.253 13.276H9.5v4.75h28.904L25.15 44.151 28.5 47.5l19-19-19-19z"
                  fill="#A51C30"
                />
              </svg>
            </Link>
          </div>
        </div>
        <ProductsList products={products} />
      </div>
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
          <div className="why-inner text-xl font-extrabold text-yellow-400">WHY US?</div>
          <div className="why-inner text-4xl font-bold text-white">왜<span className="text-yellow-400">&apos;한솔축산&apos;</span>인가?</div>
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
