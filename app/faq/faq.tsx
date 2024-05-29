"use client"

import React, {useEffect, useRef, useState} from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const faqItems = [
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
    answer: "네, 국제 배송을 제공하고 있습니다. 국제 배송은 주문 후 약 7~14일 정도 소요됩니다."
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
    answer: "제품의 재고 상황은 각 제품 페이지에서 확인하실 수 있습니다."
  },
  {
    category: "product",
    question: "상품의 세부 정보 및 사양은 어디에서 확인할 수 있나요?",
    answer: "상품의 세부 정보와 사양은 각 제품 페이지에서 확인하실 수 있습니다."
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
    answer: "네, 회원 가입은 필수입니다. 회원 가입 시 다양한 혜택을 누릴 수 있습니다."
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

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div style={{maxWidth: "1000px", margin: "0 auto", fontFamily: "Arial, sans-serif", padding: "20px"}}>
      <h1 style={{textAlign: "center", color: "#333", marginBottom: "30px"}}>자주 묻는 질문 (FAQ)</h1>
      {faqItems.map((item, index) => (
        <div key={index} style={{marginBottom: "30px"}}>
          {index === 0 || faqItems[index - 1].category !== item.category ? (
            <div style={{marginBottom: "15px", padding: "10px", backgroundColor: "#f0f0e0", borderRadius: "5px", textAlign: "center"}}>
              <strong style={{fontSize: "20px", color: "#555"}}>
                {item.category === "shipment" ? "배송 관련" :
                  item.category === "policy" ? "교환 및 환불 정책" :
                    item.category === "product" ? "상품 관련" :
                      item.category === "accountAndOrder" ? "계정 및 주문 관리" :
                        item.category === "security" ? "보안 및 개인정보 보호" :
                          item.category === "pay" ? "결제 관련" :
                            "기타"}
              </strong>
            </div>
          ) : null}
          <div onClick={() => toggleAccordion(index)} style={{padding: "10px", backgroundColor: activeIndex === index ? "#eaeaea" : "#f9f9f9", cursor: "pointer", borderRadius: "5px"}}>
            <h3 style={{margin: 0, fontSize: "18px", color: "#555"}}>{item.question}</h3>
          </div>
          {activeIndex === index && (
            <div style={{padding: "10px", backgroundColor: "#fff", borderTop: "1px solid #ddd", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}}>
              <p style={{margin: 0}}>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FAQPage

// test용

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
      <div className="faq-qus-wrap" onClick={toggleFaq} style={{cursor: "pointer"}}>
        <h5 className="faq-qustion">{question}</h5>
        <AddCircleOutlineIcon />
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
      answer: "네, 국제 배송을 제공하고 있습니다. 국제 배송은 주문 후 약 7~14일 정도 소요됩니다."
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
      answer: "제품의 재고 상황은 각 제품 페이지에서 확인하실 수 있습니다."
    },
    {
      category: "product",
      question: "상품의 세부 정보 및 사양은 어디에서 확인할 수 있나요?",
      answer: "상품의 세부 정보와 사양은 각 제품 페이지에서 확인하실 수 있습니다."
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
      answer: "네, 회원 가입은 필수입니다. 회원 가입 시 다양한 혜택을 누릴 수 있습니다."
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
    <section className="section faq">
      <div className="container">
        <div className="faq-main-wrap">
          <div className="section-top-wrap">
            <div className="section-sub-title">faq</div>
            <h2 className="section-title">자주 묻는 질문</h2>
          </div>
          <div className="faq-grid-wrap">
            {faqData.map((faq, index) => (
              <div key={index} id={`faq-${index}`} className="faq-wrapper">
                <FaqItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}