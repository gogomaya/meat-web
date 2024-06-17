"use client"
import Image from "next/image"
import Link from "next/link"
import {myPageAddCart} from "../mypage"
import {Cancellation} from "@/types/cancellationsTypes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {ResponseApi} from "@/types/commonTypes"
import {cancellationsServices} from "@/services/cancellationsServices"

interface CancellationListProps {
  cancellationList: Cancellation[]
}

export const CancellationList = ({cancellationList}: CancellationListProps) => {

  const formatDate = (isoString : string) => {
    const date = new Date(isoString)

    // 연도, 월, 일 추출
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0")

    // 원하는 형식으로 변환
    return `${year}/${month}/${day}`
  }


  // 🗑️ 취소 내역 삭제
  const handleDelete = async (cancellation_pk : number) => {
    console.log(`cancellation_pk : ${cancellation_pk}`)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p>정말로 삭제하시겠습니까?</p>,
      text: "취소 내역이 삭제되면, 되돌릴 수 없습니다.",
      icon: "warning",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.isConfirmed) {

        let response: ResponseApi = {}
        response = await cancellationsServices.cancellationDelete(cancellation_pk)
        console.log(response)

        MySwal.fire({
          title: <p>취소 내역이 삭제되었습니다.</p>,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        location.reload()
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-10 my-2 mx- md:mx-0">
      {cancellationList.map((cancellation) => (
        <div key={cancellation.cancellation_pk} className="w-full flex flex-col max-w-4xl bg-white border-2 border-solid border-gray-500 shadow-md">
          <div className="item">
            <div className="flex justify-start bg-gray-100 border-b-2 border-solid border-gray-500 items-center">
              <div className="item p-2">
                <p className="font-bold">
                  주문번호 : <span className="">{cancellation.order_pk}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="flex justify-between border-b-2 border-solid border-gray-500 items-center">
              <div className="item p-2">
                <p className="text-sm">
                  취소 접수일 : <span className="">{ formatDate(cancellation.created_at) }</span>
                </p>
              </div>
              <div className="item p-2">
                <p className="text-sm">
                  주문일 : <span className="">{ formatDate(cancellation.ordered_at) }</span>
                </p>
              </div>
            </div>
          </div>
          <div className="item p-2">
            <div className="flex justify-between items-center">
              <div className="item flex-[2]">
                <p className="font-bold text-xl">{cancellation.title}</p>
              </div>
              <div className="item flex-1">
                <div className="flex flex-col items-center gap-2">
                  <p className="">
                    <span>{cancellation.total_count}</span>개
                  </p>
                  <p className="font-bold">
                    <span>{cancellation.total_discount_price.toLocaleString()}</span>원
                  </p>
                </div>
              </div>
              <div className="item flex-1">
                <div className="inner">
                  <Link
                    href={`/mypage/cancellations/detail/${cancellation.cancellation_pk}`}
                    className="w-full my-2 px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    취소 상세
                  </Link>
                  <button onClick={()=>handleDelete(cancellation.cancellation_pk)} className="w-full my-2 px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                    삭제 하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}