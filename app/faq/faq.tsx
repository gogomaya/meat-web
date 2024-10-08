"use client"

import React, {useEffect, useRef, useState} from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({question, answer}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [maxHeight, setMaxHeight] = useState("0px")
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleFaq = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px")
    }
  }, [isOpen])

  return (
    <div className="faq-single-wrap">
      <div
        className="faq-qus-wrap flex justify-between items-center p-4 rounded cursor-pointer bg-opacity-10 hover:bg-opacity-99 hover:bg-[#3b2e20]"
        onClick={toggleFaq}
        style={{backgroundImage: "url('/images/Bg_2.png')", backgroundBlendMode: "overlay"}}
      >
        <h5 className="faq-qustion text-white text-lg font-semibold">{question}</h5>
        <AddCircleOutlineIcon className="text-white" />
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          overflow: "hidden",
          transition: "max-height 0.3s ease"
        }}
        className="faq-answer-wrap"
      >
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  )
}

export const FaqSection: React.FC = () => {
  const faqData = [
    // 배송
    {
      category: "shipment",
      question: "주문한 상품은 얼마나 빨리 배송되나요?",
      answer: "주문한 상품은 보통 2~3일 이내에 배송됩니다. 배송일은 지역 및 상품에 따라 다를 수 있습니다."
    },
    {
      category: "shipment",
      question: "무료 배송 기준은 어떻게 되나요?",
      answer: "무료 배송 기준은 한 번에 구매하는 상품 가격이 5만원 이상일 경우에 적용됩니다."
    },
    {
      category: "shipment",
      question: "국제 배송을 제공하나요? 그 경우 배송 시간은 얼마나 걸리나요?",
      answer: "아니오, 국제배송을 제공하고있지 않으며, 국내배송을 우선으로 하고있습니다."
    },

    {
      category: "shipment",
      question: "주문 후 배송상태를 어떻게 확인할 수 있나요?",
      answer: "주문한 상품의 배송상태는 주문 내역 페이지에서 확인하실 수 있습니다."
    },

    // 교환 및 환불정책

    {
      category: "policy",
      question: "상품을 교환하거나 환불하려면 어떻게 해야 하나요?",
      answer: "상품을 교환하거나 환불하려면 주문한 상품을 받은 후 7일 이내에 고객센터로 연락하여 신청하시면 됩니다."
    },

    {
      category: "policy",
      question: "교환 및 환불 정책은 어떻게 되나요?",
      answer: "상품의 불량 또는 오배송인 경우에는 무료로 교환해드립니다. 환불은 상품 수령 후 7일 이내에 가능합니다."
    },

    // 상품에 관한 문의

    {
      category: "product",
      question: "제품의 재고 상황은 어떻게 확인할 수 있나요?",
      answer: "제품의 재고 상황은 각 제품 상세 페이지에서 확인하실 수 있습니다."
    },
    {
      category: "product",
      question: "상품의 세부 정보 및 사양은 어디에서 확인할 수 있나요?",
      answer: "상품의 세부 정보와 사양은 각 제품 상세 페이지에서 확인하실 수 있습니다."
    },
    {
      category: "product",
      question: "상품 리뷰를 확인할 수 있나요?",
      answer: "네, 상품 페이지 하단에 다양한 고객 리뷰를 확인하실 수 있습니다."
    },
    // 계정 및 주문관리
    {
      category: "accountAndOrder",
      question: "주문한 상품의 배송 상태를 어떻게 확인하나요?",
      answer: "주문한 상품의 배송 상태는 마이 페이지에서 주문 내역을 확인하면 됩니다."
    },

    {
      category: "accountAndOrder",
      question: "주문 내역을 어디에서 확인할 수 있나요?",
      answer: "주문 내역은 마이 페이지에서 확인하실 수 있습니다."
    },

    {
      category: "accountAndOrder",
      question: "회원 가입은 필수인가요?",
      answer: "회원 가입 시 다양한 혜택을 누리실 수 있지만, 비회원 주문하기도 가능합니다."
    },

    // 보안 및 개인정보보호
    {
      category: "security",
      question: "개인 정보 보호 정책은 무엇인가요?",
      answer: "저희는 고객의 개인 정보를 보호하기 위해 최선을 다하고 있습니다. 자세한 내용은 개인 정보 보호 정책을 참고해주세요."
    },

    {
      category: "security",
      question: "주문 및 결제 정보는 어떻게 보호되나요?",
      answer: "주문 및 결제 정보는 안전한 암호화 기술을 통해 보호되며, 저희 사이트는 PCI DSS 준수를 위해 노력하고 있습니다."
    },

    // 결제에 관해
    {
      category: "pay",
      question: "어떤 결제 수단을 제공하나요?",
      answer: "저희는 다양한 결제 수단을 제공하고 있습니다. 신용카드, 계좌이체, 페이팔 등을 이용하실 수 있습니다."
    },
    {
      category: "pay",
      question: "결제가 안전하게 이루어지는지 어떻게 확인할 수 있나요?",
      answer: "결제 과정은 안전한 SSL 프로토콜을 통해 보호되며, 고객의 개인 정보는 안전하게 암호화됩니다."
    },

    // 기타
    {
      category: "etc",
      question: "고객 서비스에 연락하는 방법은 무엇인가요?",
      answer: "고객 서비스에는 온라인 채팅, 이메일, 전화 등 다양한 연락 수단이 제공되고 있습니다."
    },

    {
      category: "etc",
      question: "제품에 대한 추가 문의가 있을 경우 어떻게 연락해야 하나요?",
      answer: "제품에 대한 추가 문의 사항이 있으시면 고객 서비스로 연락 주시면 친절히 안내해드리겠습니다."
    }
  ]

  return (
    <><div className="flex justify-center items-center text-balck text-4xl font-bold p-8"
      style={{
        backgroundImage: "url('/images/Bg_3.png')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
        backgroundPositionX: "55%",
        backgroundPositionY: "0%",
        textAlign: "center",
        minHeight: "250px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
      <div style={{marginBottom: "10px", fontSize: "2rem", textTransform: "uppercase", letterSpacing: "2px"}}>FAQ</div>
      <div style={{fontSize: "1.5rem", fontWeight: "lighter", opacity: "0.9"}}>자주 묻는 질문</div>
    </div>
    <section className="section faq">
      <div className="container">
        <div className="faq-main-wrap">
          {/* <div className="section-top-wrap">
      <div className="section-sub-title" style={{ fontSize: '2rem' }}>faq</div>
      <div className="section-title" style={{ fontSize: '3rem' }}>자주 묻는 질문</div>
    </div> */}
          <div className="faq-grid-wrap">
            {faqData.map((faq, index) => (
              <div key={index} id={`faq-${index}`} className="faq-wrapper">
                <FaqItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section></>
  )
}