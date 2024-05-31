"use client"
import {useState} from "react"

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
