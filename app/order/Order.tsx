"use client"

import {SetStateAction, useState} from "react"
import {Divider, Typography} from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import React from "react"

export const OrderDetailContent = () => {

  const [isAccordianOpen, setIsAccordianOpen] = useState(false)

  const toggleAccordian = () => {
    setIsAccordianOpen(!isAccordianOpen)
  }

  const [orderInfo, setOrderInfo] = useState({
    shippingAddress: "",
    orderItems: [],
    discount: 0,
    paymentMethod: "",
    cashReceipt: false,
    receiptType: ""
  })

  // 주문 상품 목록
  const orderItems = [
    {id: 1, name: "상품1", quantity: 1, price: 10000},
    {id: 2, name: "상품2", quantity: 2, price: 20000}
  ]

  // 결제 정보
  const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalDiscount = orderInfo.discount
  const finalPrice = totalPrice - totalDiscount

  // 주문 상품 목록을 출력하는 함수
  const renderOrderItems = () => {
    return orderItems.map((item) => (
      <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2">
        <div className="p-3">
          <p className="font-semibold">{item.name}</p>
          <p>수량: {item.quantity}</p>
        </div>
        <p>{item.price * item.quantity}원</p>
      </div>
    ))
  }

  // 결제방법 타입 변경 핸들러
  const handlePayMethodChange = (type: string) => {
    setOrderInfo({...orderInfo, paymentMethod: type})
  }

  // 결제방법 내용 렌더링 함수
  const renderPayMethodContent = () => {
    if (orderInfo.paymentMethod === "toss") {
      return (
        <div className="flex justify-between items-center border-b p-2 m-2" style={{backgroundColor: "#fff"}}>
          <Link href="/">
            <Image
              src="/images/logo-toss-pay.svg"
              alt=""
              width={200}
              height={200}
              sizes="100vw"
              className="w-full"
              priority
            />
          </Link>
        </div>
      )
    } else if (orderInfo.paymentMethod === "naver") {
      return (
        <div className="flex justify-between items-center border-b p-2 m-2" style={{backgroundColor: "#fff"}}>
          <Link href="/">
            <Image
              src="/images/naver-pay-btn.png"
              alt=""
              width={200}
              height={200}
              sizes="100vw"
              className="w-full"
              priority
            />
          </Link>
        </div>
      )
    } else {
      return null
    }
  }

  // 영수증 타입 변경 핸들러
  const handleReceiptTypeChange = (type: string) => {
    setOrderInfo({...orderInfo, receiptType: type})
  }

  // 영수증 내용 렌더링 함수
  const RenderReceiptContent = () => {
    const [phoneNumber, setPhoneNumber] = useState("010-111-1111")
    const [editingPhoneNumber, setEditingPhoneNumber] = useState(false)

    const handlePhoneNumberChange = (e: { target: { value: SetStateAction<string> } }) => {
      setPhoneNumber(e.target.value)
    }

    const handleEditButtonClick = () => {
      setEditingPhoneNumber(true)
    }

    const handleSaveButtonClick = () => {
      setEditingPhoneNumber(false)
      // 여기에 전화번호를 저장하는 로직을 추가할 수 있습니다.
    }

    if (orderInfo.receiptType === "personal" || orderInfo.receiptType === "business") {
      return (
        <div className="flex justify-between items-center border-b m-2" style={{backgroundColor: "#fff"}}>
          <h5>{orderInfo.receiptType === "personal" ? "개인소득공제용" : "사업자 지출증빙용"}</h5>
          {editingPhoneNumber ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              style={{border: "1px solid black"}} // 추가된 부분
            />
          ) : (
            <h5>{phoneNumber}</h5>
          )}
          {editingPhoneNumber ? (
            <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors" onClick={handleSaveButtonClick}>
              저장
            </button>
          ) : (
            <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors" onClick={handleEditButtonClick}>
              변경
            </button>
          )}
        </div>
      )
    } else {
      return null
    }
  }


  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">주문/결제</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <div>
          <div className="bg-white rounded-lg shadow-lg p-3 w-full">
            <h3 className="text-xl font-semibold mb-4">주문상품</h3>
            {renderOrderItems()}
          </div>
          <div className="py-3">
            <div className="flex">
              <div className="bg-white rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-semibold mb-4 p-2">결제방법</h2>
                <div className="p-3">
                  <label htmlFor="" className="py-2">
                    <input type="radio" name="paymentMethod" id="naver" onClick={() => handlePayMethodChange("naver")} />네이버페이<br />
                  </label>
                  <label htmlFor="" className="py-2">
                    <input type="radio" name="paymentMethod" id="toss" onClick={() => handlePayMethodChange("toss")} />다른 결제수단<br />
                  </label>
                  {renderPayMethodContent()}
                </div>
              </div>
            </div>
          </div>
          <div className="py-3">
            <div className="py-3 bg-white rounded-lg shadow-lg p-3 w-full">
              <h2 className="text-2xl font-semibold mb-4">현금영수증 신청</h2>
              <div className="py-3 mr-3">
                <input type="radio" name="receiptType" id="personal" onClick={() => handleReceiptTypeChange("personal")}/>개인소득공제 <span className="gap-6"></span>
                <input type="radio" name="receiptType" id="business" onClick={() => handleReceiptTypeChange("business")}/>사업자지출증빙
                {RenderReceiptContent()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-white rounded-lg shadow-lg p-6 notch">
            <h3 className="text-xl font-semibold mb-4">결제내역</h3>
            {renderOrderItems()}
            <div className="mt-6 p-4">
              <p className="text-lg mb-2">총 상품금액: {totalPrice.toLocaleString()}원</p>
              <p className="text-lg mb-2">할인 금액: {totalDiscount.toLocaleString()}원</p>
              <p className="text-lg">최종 결제 금액: {finalPrice.toLocaleString()}원</p>
            </div>
            <Divider />
            <div className="max-w-md mx-auto my-8 px-4 rounded-lg">
              <h3 className="text-2xl text-gray-800 mb-4">결제수단</h3>
              <h5 className="text-lg text-gray-600 mb-2">위 주문내역을 확인하였으며, 결제 내역에 동의합니다.</h5>
              <div className="border-b py-3 px-4 flex justify-between cursor-pointer" onClick={toggleAccordian}>
                <h5 className="text-lg text-gray-600">주문 상품 정보 동의</h5>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${isAccordianOpen ? "rotate-180" : ""} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isAccordianOpen && (
                <div className="p-4">
                  <textarea className="w-full h-40 p-2 text-sm border border-gray-300 rounded-lg mb-4">
                    주문할 상품의 상품명, 가격, 배송정보 등을 최종 확인하였으며, 구매에 동의하십니까? (전자상거래법 제 8조 2항)
                  </textarea>
                </div>
              )}
              <div className="border-b py-3 px-4 flex justify-between cursor-pointer" onClick={toggleAccordian}>
                <h5 className="text-lg text-gray-600">개인정보 수집 및 이용동의</h5>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${isAccordianOpen ? "rotate-180" : ""} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isAccordianOpen && (
                <div className="p-4">
                  수집하는 개인정보의 항목
                  ① 한솔축산는 구매, 원활한 고객상담, 각종 서비스의 제공을 위해 주문 이용 시 아래와 같은 개인정보를 수집하고 있습니다.
                  o 필수수집항목 : 이름, 휴대폰번호, 이메일, 수신자정보(성명,주소,휴대폰번호,이메일), 개인통관고유보호(해외직구상품구매시)
                  o 수집목적 : 상품배송, 선물하기 서비스 제공, 배송지 관리
                  o 보유 및 이용기간 : 회원 탈퇴시 까지(단, 관계 법령에 따름)
                  ② 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
                  - IP Address, 쿠키, 방문 일시, OS종류, 브라우져 종류 서비스 이용 기록, 불량 이용 기록

                  ③ 부가 서비스 및 맞춤식 서비스 이용 또는 이벤트 응모 과정에서 해당 서비스의 이용자에 한해서만 아래와 같은 정보들이 수집될 수 있습니다.
                  - 개인정보 추가 수집에 대해 동의를 받는 경우

                  ④ 결제 과정에서 아래와 같은 정보들이 수집될 수 있습니다.
                  - 신용카드 결제 시 : 카드사명, 카드번호 등
                  - 휴대폰 결제 시 : 이동전화번호, 통신사, 결제승인번호, 이메일주소 등
                  - 계좌이체 시 : 은행명, 계좌번호 등
                  - 상품권 이용 시 : 상품권 번호
                  - 환불시 : 환불계좌정보(은행명, 계좌번호, 예금주명)
                  - 제휴포인트 결제시 : 제휴사명, 카드번호
                  - 현금영수증 : 휴대폰번호, 현금영수증 카드번호,, 사업자번호
                  개인정보의 수집 및 이용목적

                  한솔축산은 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전동의를 구할 것입니다.

                  ① 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                  - 컨텐츠 제공, 특정 맞춤 서비스 제공, 물품배송 또는 청구서 등 발송, 금융거래 본인 인증 및 금융 서비스, 구매 및 요금 결제, 요금추심 등

                  ② 비회원 관리
                  - 비회원 구매 서비스 이용에 따른 본인 확인, 개인 식별, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달

                  개인정보 보유 및 이용기간

                  이용자의 개인정보는 원칙적으로 회원탈퇴 시 지체없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

                  ① 회사 내부 방침에 의한 정보보유 사유
                  - 보존 항목 : 아이디(ID), 회원번호
                  - 보존 근거 : 서비스 이용의 혼선 방지
                  - 보존 기간 : 영구

                  ② 관계 법령에 의한 정보보유 사유
                  ‘상법’, ‘전자상거래 등에서의 소비자보호에 관한 법률’ 등 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 관계 법령에서 정한 일정한 기간 동안 개인정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존 기간은 아래와 같습니다.

                  1. 계약 또는 청약철회 등에 관한 기록
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률
                  - 보존 기간 : 5년
                  2. 대금결제 및 재화 등의 공급에 관한 기록
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률
                  - 보존 기간 : 5년
                  3. 소비자의 불만 또는 분쟁처리에 관한 기록
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률
                  - 보존 기간 : 3년
                  4. 웹사이트 방문기록
                  - 보존 근거 : 통신비밀보호법
                  - 보존 기간 : 3개월
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
                결제하기
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-20 w-20 h-20 flex justify-center items-center">
          <Image
            src="/images/free-icon-tack-2052642.png"
            alt=""
            width={100}
            height={100}
            sizes="100vw"
            className="w-full"
            priority
          />
        </div>
      </div>
    </div>
  )
}

