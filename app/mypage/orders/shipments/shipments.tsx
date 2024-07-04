"use client"
import React, {useEffect,useState} from "react"
import Link from "next/link"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

/**
* 로젝백배 운송장 번호
* 💻 web       :   https://www.ilogen.com/web/personal/tkSearch
* 📱 mobile     :   https://www.ilogen.com/m/personal/tkSearch
* @returns [버튼] 배송 상태 확인
*/
interface DeliveryStatusLinkProps {
  tracking_no: string | undefined;
}

export const DeliveryStatusLink: React.FC<DeliveryStatusLinkProps> = ({tracking_no}) => {
  const [href, setHref] = useState(`https://www.ilogen.com/web/personal/trace/${tracking_no}`)

  useEffect(() => {
    const userAgent = typeof window.navigator === "undefined" ? "SSR" : navigator.userAgent
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)

    if (isMobile) {
      setHref(`https://www.ilogen.com/m/personal/trace/${tracking_no}`)
    }
  }, [tracking_no])

  return (
    <Link
      target="_blank"
      href={href}
      className={`w-full px-4 py-2 bg-[#A51C30] border-2 border-solid border-white rounded-lg text-center text-white font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 transition-colors duration-200 ${
        !tracking_no ? "disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed" : ""
      }`}
    >
      <button disabled={!tracking_no} className="w-full h-full">
        배송 상태 확인
      </button>
    </Link>
  )
}

export const ShipNoCopyButton = ({disabled}: { disabled: boolean }) => {
  // 클릭 핸들러
  const handleCopy = () => {
    const shipNoElement = document.getElementById("shipNo")
    if (shipNoElement) {
      const textToCopy = shipNoElement.innerText
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            title: <p className="text-xl">송장번호 복사</p>,
            text: "운송장 번호가 클립보드에 복사되었습니다. [" + textToCopy + "]",
            icon: "info",
            confirmButtonText: "확인"
          })
          // alert("운송장 번호가 클립보드에 복사되었습니다. [" + textToCopy + "]")
        })
        .catch((err) => {
          console.error("클립보드 복사에 실패했습니다.", err)
        })
    }
  }
  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      className={`w-full px-4 py-2 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200 ${
        disabled ? "disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed" : ""
      }`}
    >
      운송장 번호 복사
    </button>
  )
}