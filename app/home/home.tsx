"use client"
import {ProductsList, ProductsPagination} from "@/app/products/products"
import {Product} from "@/types/productsTypes"
import Image from "next/image"
import Link from "next/link"
import {useEffect, useRef, useState} from "react"
import {SwiperSlide} from "swiper/react"

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
      <div className="flex flex-col items-center space-y-4 md:w-1/2 z-6 gap-1" style={{maxWidth: "800px"}}>
        <div className="text-6xl font-extrabold text-yellow-400 shadow-lg">Premium No.9</div>
        <div className="text-4xl font-bold text-white shadow">모든 작업을 직접하여 적은 유통마진으로</div>
        <div className="text-2xl text-gray-300 shadow flex gap-2">
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
        width: 380px;
        height: 410px;
        background-image: url('/images/meat-img02_1.png');
        transform: translate(-100%, 0%);
        animation: slideInFromLeft 1s forwards;
        animation-delay: 0.005s;
      }

      .section::after {
        bottom: 0;
        right: 0;
        width: 400px;
        height: 416px;
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
        <div className="contatiner relative section flex-1 h-64 md:h-auto rounded-lg overflow-hidden" data-index="0">
          <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to bottom, #271a11, rgba(0, 0, 0, 0) 67%), url('/images/Rectangle 6.png')"}}></div>
          <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
            <div className="text-xl md:text-4xl font-bold mb-24 text-center">한우 투뿔 꽃등심 <br />부채살</div>
            <Link href="/products?category=cow">
              <button className="flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                <span>&apos;소고기&apos; 바로가기</span>
                <Image
                  src="/images/Icon Right.png"
                  alt="Ddun Dun Rice"
                  width={30}
                  height={30}
                  className="text-white"
                />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-1 gap-4">
            <div className="relative section flex-1 h-32 md:h-48 rounded-lg overflow-hidden" data-index="1">
              <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #271a11, rgba(217, 217, 217, 0) 100%), url('/images/Rectangle 10.png')"}}></div>
              <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
                <div className="text-md md:text-lg font-bold text-center text-yellow-400">한돈 국내산</div>
                <div className="text-xl md:text-2xl font-bold mb-12 text-center">🐷 생삼겹살 목살</div>
                <Link href="/products?category=pork">
                  <button className="flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                    <span>&apos;돼지고기&apos; 바로가기</span>
                    <Image
                      src="/images/Icon Right.png"
                      alt="Ddun Dun Rice"
                      width={30}
                      height={30}
                      className="text-white"
                    />
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative section flex-1 h-32 md:h-48 rounded-lg overflow-hidden" data-index="2">
              <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #271a11, rgba(217, 217, 217, 0) 100%), url('/images/Rectangle 8.png')"}}></div>
              <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
                <div className="text-md md:text-lg font-bold text-left text-yellow-400">가장 신선한</div>
                <div className="text-xl md:text-2xl font-bold mb-12 text-left">🥩 육회 & 육사시미</div>
                <Link href="/products?category=cow&category_menu=육회/사시미">
                  <button className="flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                    <span>&apos;육회&apos; 바로가기</span>
                    <Image
                      src="/images/Icon Right.png"
                      alt="Ddun Dun Rice"
                      width={30}
                      height={30}
                      className="text-white"
                    />
                  </button>
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
                <button className="flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                  <span>&apos;밀키트&apos; 바로가기</span>
                  <Image
                    src="/images/Icon Right.png"
                    alt="Ddun Dun Rice"
                    width={30}
                    height={30}
                    className="text-white"
                  />
                </button>
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
      <div className="container">
        <div ref={elementRef} className="flex flex-col items-start mb-4 px-6" style={animationStyle}>
          <div className="text-lg font-semibold text-gray-500">당신의 식탁을 풍요롭게</div>
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
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col space-y-4 md:w-1/2">
          <div className="why-inner text-xl font-extrabold text-yellow-400">WHY US?</div>
          <div className="why-inner text-4xl font-bold text-white">왜 <span className="text-yellow-400">&apos;한솔축산&apos;</span> 인가?</div>
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
          {/* <iframe
            src="https://www.youtube.com/embed/GSwEU2vT9LI?si=3Ub8EckRz6lTQJMQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full aspect-video"
          ></iframe> */}
          {/* <CounterSection /> */}
        </div>
      </div>
    </section>
  )
}

export const CounterSection: React.FC = () => {
  const sectionStyle = {
    backgroundColor: "#1c1c1e",
    padding: "50px 0",
    color: "#fff",
    textAlign: "center" as "center"
  }

  const counterWrapStyle = {
    display: "flex",
    flexWrap: "wrap" as "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  }

  const counterSingleWrapStyle = {
    margin: "20px"
  }

  const counterNumberWrapStyle = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: "10px"
  }

  const counterSingleNumberWrapStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    transition: "transform 0.3s ease-in-out"
  }

  const counterNumberStyle = {
    fontSize: "2em",
    color: "#ffcc00",
    textShadow: "0 0 5px rgba(255, 204, 0, 0.7)",
    margin: 0
  }

  const counterDetailsStyle = {
    fontSize: "1em",
    color: "#bbb"
  }

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  }

  return (
    <div data-w-id="7f92dd69-750e-0360-a1c7-795fdbde5fa8" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={counterWrapStyle}>
          <div data-w-id="e55b0bc7-9d09-c401-06f1-f28580e14f10" style={counterSingleWrapStyle}>
            <div style={counterNumberWrapStyle}>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  marginRight: "5px"
                }}
              >
                {["0", "1", "2", "3", "4", "5", "6", "7", "8", "2"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                }}
              >
                {["0", "8", "7", "6", "5", "4", "3", "2", "1", "0"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <h1 className="counter-number" style={counterNumberStyle}>+</h1>
            </div>
            <div className="counter-details" style={counterDetailsStyle}>years of experience</div>
          </div>
          <div data-w-id="cfa23c1a-1051-6b95-f34a-ff88723818a3" style={counterSingleWrapStyle}>
            <div style={counterNumberWrapStyle}>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  marginRight: "5px"
                }}
              >
                {["0", "1", "2", "3", "4", "5", "6", "7", "8", "5"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                }}
              >
                {["0", "8", "7", "6", "5", "4", "3", "2", "1", "0"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <h1 className="counter-number" style={counterNumberStyle}>K</h1>
              <h1 className="counter-number" style={counterNumberStyle}>+</h1>
            </div>
            <div className="counter-details" style={counterDetailsStyle}>satisfied customers</div>
          </div>
          <div data-w-id="24ac6198-a536-6a70-dbb2-5b617aae6381" style={counterSingleWrapStyle}>
            <div style={counterNumberWrapStyle}>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  marginRight: "5px"
                }}
              >
                {["0", "1", "2", "3", "4", "5", "6", "7", "8", "4"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <h1 className="counter-number" style={counterNumberStyle}>K</h1>
              <h1 className="counter-number" style={counterNumberStyle}>+</h1>
            </div>
            <div className="counter-details" style={counterDetailsStyle}>Total bookings</div>
          </div>
          <div data-w-id="bfafb6d7-05e5-9d3e-9b9e-b3f50031b6ed" style={counterSingleWrapStyle}>
            <div style={counterNumberWrapStyle}>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  marginRight: "5px"
                }}
              >
                {["0", "1", "2", "3", "4", "5", "6", "7", "8", "3"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <div
                style={{
                  ...counterSingleNumberWrapStyle,
                  WebkitTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform: "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                }}
              >
                {["5", "8", "7", "6", "5", "4", "3", "2", "1", "0"].map((num) => (
                  <h1 className="counter-number" style={counterNumberStyle} key={num}>{num}</h1>
                ))}
              </div>
              <h1 className="counter-number" style={counterNumberStyle}>K</h1>
              <h1 className="counter-number" style={counterNumberStyle}>+</h1>
            </div>
            <div className="counter-details" style={counterDetailsStyle}>event complete</div>
          </div>
        </div>
      </div>
    </div>
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
