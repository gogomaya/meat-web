"use client"
import {ProductsList, ProductsPagination} from "@/app/products/products"
import {Product} from "@/types/productsTypes"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {useEffect, useRef, useState} from "react"
import {SwiperSlide} from "swiper/react"


// 팝업 이벤트
export const HomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true)

  const closePopup = () => {
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999
  }

  const contentStyle: React.CSSProperties = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    position: "relative",
    width: "100%",
    maxWidth: "550px",
    maxHeight: "80%",
    overflowY: "auto",
    backgroundImage: "url(\"/images/Bg_3.png\")"

  }

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer"
  }

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: "10px"
  }

  const iconsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  }

  const iconStyle: React.CSSProperties = {
    width: "50px",
    height: "50px",
    margin: "0 10px"
  }

  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <button style={closeButtonStyle} onClick={closePopup}>
          &times;
        </button>
        <Image
          src="/images/logo.png"
          alt=""
          width={100}
          height={100}
          sizes="100vw"
          priority
        />
        <h5>2024 추석 맞이 한솔축산 Grand 오픈!</h5>
        <p>추석을 맞이하여 한솔축산 홈페이지가 새롭게 오픈하였습니다. <br /> 많은 방문 부탁드립니다!</p>
      </div>
    </div>
  )
}


export const HomeBanner = () => {
  return (
    <section
      className="section bg-cover bg-center bg-no-repeat py-12 p-6 md:p-12 text-white relative border border-yellow-200"
      style={{
        backgroundImage: "url('/images/Bg_4.png')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundPositionX: "25%",
        backgroundPositionY: "0%",
        textAlign: "center",
        minHeight: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex flex-col items-center space-y-4 md:w-1/2 z-6 gap-1" style={{maxWidth: "800px"}}>
        <div className="title-description text-6xl font-extrabold text-yellow-400">Premium No.9</div>
        <div className="sub-description text-4xl font-bold text-black">모든 작업을 직접하여 적은 유통마진으로</div>
        <div className="description text-2xl text-black flex gap-2">
          <span style={{color: "red"}}>한우1++</span>
          <span className="text-yellow-400">No.9</span>만을 판매하는 한솔축산입니다.
        </div>
        <div className="space-y-2">
          <Link href="/products">
            <button className="click-mobile-version py-2 px-4 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition duration-300 ease-in-out shadow-lg">한솔축산상품 둘러보기</button>
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
        height: 385px;
        background-image: url('/images/meat-img01.png');
        transform: translate(100%, 37%);
        animation: slideInFromRight 1s forwards;
        animation-delay: 0.1s;
      }

      // @keyframes backgroundScroll {
      //   from {
      //     background-position: 0 0;
      //   }
      //   to {
      //     background-position: -100% 0;
      //   }
      // }

      // .section {
      //   animation: backgroundScroll 10s linear infinite;
      // }

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
    <section className="px-8 md:p-8 mx-2 md:mx-8 py-12">
      <div className="container flex flex-col md:flex-row gap-10">
        <div className="relative section flex-1 h-64 md:h-auto rounded-lg overflow-hidden" data-index="0">
          <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to bottom, #271a11, rgba(0, 0, 0, 0) 67%), url('/images/Rectangle 6.png')"}}></div>
          <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white p-2 gap-10">
            <div className="click-mobile-version home-cate-mobile text-lg md:text-4xl font-bold mb-4 text-center">한우 투뿔 꽃등심 부채살</div>
            <Link href="/products?category=cow">
              <button className="text-xs md:text-xl home-cate-mobile flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                <span>&#39;소고기&#39; 바로가기</span>
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
        <div className="flex flex-col flex-1 gap-10">
          <div className="flex flex-1 gap-10">
            <div className="relative section flex-1 h-32 md:h-48 rounded-lg overflow-hidden" data-index="1">
              <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #271a11, rgba(217, 217, 217, 0) 100%), url('/images/Rectangle 10.png')"}}></div>
              <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-lg"></div>
              <div className="relative flex flex-col justify-center items-center h-full text-white p-2">
                <div className="text-xs md:text-2xl font-bold text-center text-yellow-400">한돈 국내산</div>
                <div className="text-xs md:text-2xl font-bold mb-2 text-center">🐷 생삼겹살 목살</div>
                <Link href="/products?category=pork">
                  <button className="text-xs md:text-base flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                    <span>&#39;돼지고기&#39; 바로가기</span>
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
                <div className="text-xs md:text-2xl font-bold text-center text-yellow-400">가장 신선한</div>
                <div className="text-xs md:text-2xl font-bold mb-2 text-center">🥩 육회 & 육사시미</div>
                <Link href="/products?category=cow&category_menu=육회/사시미">
                  <button className="text-xs md:text-base flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300 text-sm md:text-base">
                    <span>&#39;육회&#39; 바로가기</span>
                    <Image
                      src="/images/Icon Right.png"
                      alt="Ddun Dun Rice"
                      width={25}
                      height={25}
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
            <div className="relative flex flex-col justify-center items-center h-full text-white p-2 gap-6">
              <div className="text-sm md:text-2xl md:text-2xl font-bold mb-2 text-center">🍲 고추장불고기 & 간장불고기 <br />제육볶음 주물럭 밀키트</div>
              <Link href="/products?category=simple">
                <button className="text-xs md:text-xl flex items-center justify-between gap-2 w-full p-2 md:py-2 md:px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                  <span>&#39;밀키트&#39; 바로가기</span>
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
        @media screen and (max-width: 767px) {
          .text-lg {
            font-size: 1.5rem; /* 모바일에서 텍스트 크기 조정 */
          }
          .text-md {
            font-size: 1.2rem; /* 모바일에서 텍스트 크기 조정 */
          }
          .text-sm {
            font-size: 1rem; /* 모바일에서 텍스트 크기 조정 */
          }
          .p-8, .mx-8 {
            padding: 2rem; /* 모바일 화면에서만 padding 조정 */
            margin: 0; /* 모바일 화면에서는 margin을 0으로 설정 */
          }
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
          <div className="flex items-center justify-between" style={animationStyle}>
            <div className="text-4xl font-bold text-gray-700">베스트 상품🥇</div>
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
      className="section why p-6 md:p-12 text-black border border-yellow-100"
      style={{
        backgroundImage: "url(\"/images/Bg_3.png\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundPositionX: "55%",
        backgroundPositionY: "60%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="container flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col space-y-4 md:w-1/2 md:px-16">
          <div className="why-inner text-lg font-extrabold text-red-700">WHY US?</div>
          <div className="why-inner text-2xl md:text-4xl font-bold text-black">왜 <span className="text-red-700">&apos;한솔축산&apos;</span> 인가?</div>
          <div className="why-inner text-lg md:text-xl text-black">
            <span className="text-lg md:text-xl text-red-700 font-bold">&lsquo;신선함을 잇다&rsquo;</span>는 바로 고객과의
            <br />
            신뢰와 품질을 지키기 위해
            <br />
            노력하는 약속입니다.
          </div>
          <div className="space-y-2">
            <div className="text-lg md:text-xl why-inner text-lg text-black">한솔축산은 신선한 프리미엄 <span className="text-yellow-400 font-bold">한우 1++ No.9</span>만을 고집합니다.<br />누구나 특별한 날, 특별한 시간을 즐길 수 있도록!<br />하누솔이 만들어 드립니다.</div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
          {/* <iframe
            src="https://www.youtube.com/embed/GSwEU2vT9LI?si=3Ub8EckRz6lTQJMQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full aspect-video"
          ></iframe> */}
          {/* <CounterSection /> */}
          <Image
            src="/images/15.jpg"
            alt=""
            width={450}
            height={250}
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export const CounterSection: React.FC = () => {
  const countersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    countersRef.current.forEach((counter, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const numberWraps = entry.target.querySelectorAll(".counter-single-number-wrap")
            numberWraps.forEach((numberWrap: any) => {
              numberWrap.style.transform = "translate3d(0, -90%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
            })
          }
        })
      })

      if (counter) {
        observer.observe(counter)
      }

      return () => {
        if (counter) {
          observer.unobserve(counter)
        }
      }
    })
  }, [])

  return (
    <div className="section counter">
      <div className="container">
        <div className="counter-wrap">
          {[
            {value1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 2], value2: [0, 8, 7, 6, 5, 4, 3, 2, 1, 0], label: "years of experience"},
            {value1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 5], value2: [0, 8, 7, 6, 5, 4, 3, 2, 1, 0], label: "satisfied customers", suffix: "K+"},
            {value1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 4], label: "Total bookings", suffix: "K+"},
            {value1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 3], value2: [5, 8, 7, 6, 5, 4, 3, 2, 1, 0], label: "event complete", suffix: "K+"}
          ].map((counter, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el && !countersRef.current.includes(el)) countersRef.current[index] = el
              }}
              className={`counter-single-wrap _${index + 1}`}
            >
              <div className="counter-number-wrap">
                <div className={"counter-single-number-wrap _1"} style={{transform: "translate3d(0, 0%, 0)"}}>
                  {counter.value1.map((num, idx) => (
                    <h1 key={idx} className="counter-number">{num}</h1>
                  ))}
                </div>
                {counter.value2 && (
                  <div className={"counter-single-number-wrap _2"} style={{transform: "translate3d(0, 0%, 0)"}}>
                    {counter.value2.map((num, idx) => (
                      <h1 key={idx} className="counter-number">{num}</h1>
                    ))}
                  </div>
                )}
                {counter.suffix && <h1 className="counter-number">{counter.suffix}</h1>}
              </div>
              <div className="counter-details">{counter.label}</div>
            </div>
          ))}
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
