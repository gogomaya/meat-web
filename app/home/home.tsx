"use client"
import {ProductsList} from "@/app/products/products"
import {Product} from "@/types/productsTypes"
import Image from "next/image"
import Link from "next/link"
import {useEffect, useRef, useState} from "react"

export const HomeBanner = () => {
  return (
    <section
      className="section bg-cover bg-center bg-no-repeat py-12 p-6 md:p-12 text-white relative"
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
      <div className="flex flex-col items-center space-y-4 md:w-1/2 z-6" style={{maxWidth: "800px"}}>
        <div className="text-6xl font-extrabold text-yellow-400 shadow-lg">Premium No.9</div>
        <div className="text-4xl font-bold text-white shadow">모든 작업을 직접하여 적은 유통마진으로</div>
        <div className="text-2xl text-gray-300 shadow">
          <span style={{color: "red"}}>한우1++</span>
          <span style={{color: "yellow"}}>No.9</span>만을 판매하는 한솔축산입니다.
        </div>
        <div className="space-y-2">
          <Link href="/products?is_today=true">
            <button className="py-2 px-4 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition duration-300 ease-in-out shadow-lg">오늘의 메뉴 바로가기</button>
          </Link>
        </div>
      </div>
      <style jsx>{`
      @media (max-width: 768px) {
        .section::before,
        .section::after {
          display: none;
        }
      }

      .section {
        position: relative;
        overflow: hidden;
      }

      .section::before, .section::after {
        content: '';
        position: absolute;
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0;
      }

      .section::before {
        top: 0;
        left: 0;
        width: 480px;
        height: 440px;
        background-image: url('/images/meat-img02_1.png');
        transform: translate(-100%, 0%);
        animation: slideInFromLeft 1s forwards;
        animation-delay: 0.005s;
      }

      .section::after {
        bottom: 0;
        right: 0;
        width: 462px;
        height: 446px;
        background-image: url('/images/meat-img01.png');
        transform: translate(100%, 37%);
        animation: slideInFromRight 1s forwards;
        animation-delay: 0.1s;
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }

      @keyframes slideInFromRight {
        from {
          transform: translate(100%, 37%);
          opacity: 0;
        }
        to {
          transform: translate(-19%, 37%);
          opacity: 1;
        }
      }

      @keyframes slideInFromLeft {
        from {
          transform: translate(-100%, 0%);
          opacity: 0;
        }
        to {
          transform: translate(46%, 0%);
          opacity: 1;
        }
      }
    `}</style>
    </section>
  )
}

export const HomeCateMenu = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".section")

    const options = {
      threshold: 0.1,
      rootMargin: "0px"
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target)
        }
      })
    }, options)

    sections.forEach((section) => {
      observer.observe(section)
    })
  }, [])

  return (
    <section className="p-12 md:p-16 mx-8">
      <div className="contatiner flex flex-col md:flex-row gap-4">
        <div className="relative section flex-1 h-64 md:h-auto rounded-lg overflow-hidden" data-index="0">
          <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to bottom, #271a11, rgba(0, 0, 0, 0) 67%), url('/images/Rectangle 6.png')"}}></div>
          <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
            <div className="text-xl md:text-4xl font-bold mb-16 text-center">한우 투뿔 꽃등심 <br />부채살</div>
            <Link href="/products?category=cow">
              <button className="py-1 px-2 md:py-2 md:px-4 bg-black text-yellow-500 rounded hover:bg-gray-800 transition duration-300">소고기 바로가기</button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-1 gap-4">
            <div className="relative section flex-1 h-32 md:h-48 rounded-lg overflow-hidden" data-index="1">
              <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #271a11, rgba(217, 217, 217, 0) 100%), url('/images/Rectangle 10.png')"}}></div>
              <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
                <div className="text-md md:text-lg mb-8 font-bold text-center text-yellow-400">한돈 국내산</div>
                <div className="text-xl md:text-2xl font-bold mb-12 text-center">🐷 생삼겹살 목살</div>
                <Link href="/products?category=pork">
                  <button className="py-1 px-2 md:py-2 md:px-4 bg-black text-yellow-500 rounded hover:bg-gray-800 transition duration-300">돼지고기 바로가기</button>
                </Link>
              </div>
            </div>
            <div className="relative section flex-1 h-32 md:h-48 rounded-lg overflow-hidden" data-index="2">
              <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #271a11, rgba(217, 217, 217, 0) 100%), url('/images/Rectangle 8.png')"}}></div>
              <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
                <div className="text-md md:text-lg mb-8 font-bold text-center text-yellow-400">가장 신선한</div>
                <div className="text-xl md:text-2xl font-bold mb-12 text-center">🥩 육회 & 육사시미</div>
                <Link href="/products?category=cow&category_menu=육회/사시미">
                  <button className="py-1 px-2 md:py-2 md:px-4 bg-black text-yellow-500 rounded hover:bg-gray-800 transition duration-300">육회 바로가기</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative section flex-1 h-32 md:h-48 rounded-lg overflow-hidden" data-index="3">
            <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #271a11, rgba(217, 217, 217, 0) 100%), url('/images/Rectangle 7.png')"}}></div>
            <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
            <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
              <div className="text-xl md:text-2xl font-bold mb-12 text-center">🍲 고추장불고기 & 간장불고기 <br />제육볶음 주물럭 밀키트</div>
              <Link href="/products?category=simple">
                <button className="py-1 px-2 md:py-2 md:px-4 bg-black text-yellow-500 rounded hover:bg-gray-800 transition duration-300">밀키트 바로가기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 2s ease-out, transform 1s ease-out;
        }
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .bg-image {
          transition: transform 2s ease-in-out;
        }
        .section:hover .bg-image {
          transform: scale(1.13);
        }
      `}</style>
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
            <div className="text-4xl font-bold text-gray-700">베스트 상품🥇</div>
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
      <div className="flex flex-col md:flex-row justify-between items-center mx-12">
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
