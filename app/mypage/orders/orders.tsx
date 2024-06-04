"use client"
import {Order} from "@/types/ordersTypes"
import Image from "next/image"
import Link from "next/link"
import {useState} from "react"
import {getOrderStatusMeaning} from "./ordersUtils"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface ModalProps {
    title: string;
    text: string;
    subText: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({title, text, subText, isOpen, onCancel, onConfirm}) => {
  if (!isOpen)
    return null
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">{title}</p>
            <p className="text-md text-gray-600 mb-4">{text}</p>
            <p className="text-md text-gray-600 mb-4">{subText}</p>
            <div className="flex justify-center">
              <button onClick={onCancel} className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300">취소안함</button>
              <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600">주문취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CancelButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }
  const handleConfirm = () => {
    // 주문 취소 작업 수행
    console.log("주문이 취소되었습니다.")
    setIsOpen(false)
  }
  return (
    <>
      <button onClick={handleOpenModal} className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
          주문/배송 취소
      </button>
      <Modal
        title="정말로 주문을 취소하시겠습니까?"
        text="- 배송 전 주문 취소의 경우, 관리자 승인 후 환불 처리가 진행됩니다."
        subText="- 배송 후 주문 취소의 경우, 반품 또는 고객센터 문의 후 환불 절차가 진행될 수 있습니다."
        isOpen={isOpen}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  )
}

// -----------------------------------------------------------------
interface OrderListProps {
  orders: Order[]
}

/**
 * ✅ TODO
 * - 주문삭제(휴지통) 클릭 시, 주문내역 삭제 --> CONFIRM [확인] [취소]
 * @param param0
 * @returns
 */
export const OrderList = ({orders}: OrderListProps) => {
  console.log(orders)

  const MySwal = withReactContent(Swal)
  const handleDelete = async (order_pk : number) => {
    console.log(`order_pk : ${order_pk}`)
    MySwal.fire({
      title: <p>정말로 삭제하시겠습니까?</p>,
      text: "주문 내역이 삭제되면, 되돌릴 수 없습니다.",
      icon: "warning",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: <p>주문 내역이 삭제되었습니다.</p>,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        // TODO: 주문 삭제 요청
        // ordersServices.ordersDelete(order_pk)
        location.reload()
      }
    })
  }
  return (
    <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
      {orders.map((order) => (
        <div key={order.order_pk} className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
          {/* 주문일자, 상세보기 */}
          <div className="flex justify-between">
            <div className="item">
              <span>{new Date(order.created_at).toLocaleDateString()}</span> 주문
            </div>
            <div className="item">
              <Link
                href={`/mypage/orders/detail/${order.order_pk}`}
                className="flex justify-between items-center"
              >
                <span>상세보기</span>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          {/* 주문카드 */}
          <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
            {/* 주문정보 */}
            <div className="item flex-[2]">
              {/* 타이틀 */}
              <div className="w-full flex justify-between items-center px-4 py-2">
                <div className="item"><span className="text-[#A51C30] font-bold">{getOrderStatusMeaning(order.status)}</span></div>
                <div className="item">
                  <button onClick={()=>handleDelete(order.order_pk)}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* 내용 */}
              <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                <div className="item flex-1">
                  <Image
                    src="/images/logo.png"
                    alt=""
                    width={32}
                    height={32}
                    sizes="100vw"
                    className="md:w-16"
                    priority
                  />
                </div>
                <div className="item flex-[3]">
                  <div className="flex flex-col items-between">
                    <div className="item"><span>{order.title}</span></div>
                    <div className="item"><span>{order.total_price?.toLocaleString()}</span>원</div>
                    <div className="item"><span>{order.total_quantity}</span>개</div>
                  </div>
                </div>
                <div className="item flex-[2]">
                  <div className="flex flex-col items-between gap-3">
                    <div className="item">
                      <button
                        type="button"
                        className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        장바구니
                      </button>
                    </div>
                    {/* 총 가격 */}
                    <div className="item text-center">
                      <p className="font-bold">
                        <span>{order.total_price?.toLocaleString()}</span>원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 버튼 */}
            <div className="item flex-1">
              <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                {/* 결제대기 */}
                {order.status == "pending"
                  ?
                  <Link
                    href={`/order/${order.order_pk}`}
                    className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    결제하기
                  </Link>
                  :
                  <></>
                }
                {/* 결제완료, 배송중, 배송완료 */}
                {order.status == "paid" || order.status == "shipping" || order.status == "delivered"
                  ?
                  <>
                    <Link
                      href={`/mypage/orders/shipments/${order.order_pk}`}
                      className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      배송조회
                    </Link>
                    {/* 주문/배송취소 버튼 */}
                    <CancelButton />
                  </>
                  :
                  <></>
                }
                {/* 주문취소 */}
                {order.status == "cancelled"
                  ?
                  <span className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                    취소된 주문
                  </span>
                  : <></>
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}