"use client"
import {SetStateAction, useState} from "react"
import {Divider, Typography} from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import DaumPostcode from "react-daum-postcode"
import {CartProduct} from "@/types/productsTypes"
import _ from "lodash"

// 배송지
export const Post = (props: { setcompany: (arg0: any) => void; company: any }) => {

  const complete = (data: { address: any; addressType: string; bname: string; buildingName: string }) =>{
    let fullAddress = data.address
    let extraAddress = ""

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname
      }
      if (data.buildingName !== "") {
        extraAddress += (extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName)
      }
      fullAddress += (extraAddress !== "" ? ` (${extraAddress})` : "")
    }
    props.setcompany({
      ...props.company,
      address:fullAddress
    })
  }

  return (
    <div>
      <DaumPostcode
        className="postmodal"
        autoClose
        onComplete={complete} />
    </div>
  )
}

export const OrderDetailContent = ({
  orderProducts
}: {
  orderProducts: CartProduct[]
}) => {
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false)
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false)

  const toggleOrderInfo = () => {
    setIsOrderInfoOpen(!isOrderInfoOpen)
  }

  const togglePersonalInfo = () => {
    setIsPersonalInfoOpen(!isPersonalInfoOpen)
  }

  const [orderInfo, setOrderInfo] = useState({
    shippingAddress: "",
    discount: 0,
    shipfee: 0,
    paymentMethod: "",
    cashReceipt: false,
    receiptType: ""
  })

  // 결제 정보
  const totalPrice = _.sumBy(orderProducts, (orderProduct) => {
    return Number(orderProduct.product.price) * orderProduct.quantity
  })
  const totalDiscount = orderInfo.discount
  const totalShipFee = orderInfo.shipfee
  const finalPrice = totalPrice - totalDiscount + totalShipFee

  const renderOrderItems = () => {
    return (
      <table className="w-full p-4 mx-12">
        <thead>
          <tr>
            <th className="py-2">상품사진</th>
            <th className="py-2">상품명</th>
            <th className="py-2">가격</th>
            <th className="py-2">수량</th>
            <th className="py-2">총금액</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((orderProduct) => (
            <tr key={orderProduct.product.product_pk}>
              <td className="flex justify-center">
                <Image
                  src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(orderProduct.product.image_file_name))}`}
                  alt=""
                  width={100}
                  height={50}
                  sizes="100vw"
                  priority
                />
              </td>
              <td className="p-3 text-center">{orderProduct.product.name}</td>
              <td className="p-3 text-center">{orderProduct.product.price.toLocaleString()}원</td>
              <td className="p-3 text-center">{orderProduct.quantity}</td>
              <td className="p-3 text-center">{(Number(orderProduct.product.price) * orderProduct.quantity).toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const handlePayMethodChange = (type: string) => {
    setOrderInfo({...orderInfo, paymentMethod: type})
  }

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

  // 주소창 이벤트 핸들러
  const [enroll_company, setEnroll_company] = useState({
    address:""
  })

  const [popup, setPopup] = useState(false)

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]:e.target.value
    })
  }

  const handleComplete = (data: any) => {
    setPopup(!popup)
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

  const handlePayment = () => {
    console.log(orderProducts)
    console.log(orderInfo)
    alert("토스페이먼츠 호출")
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">주문/결제</h2>
      <div className="bg-white rounded-lg shadow-lg p-3 w-full mb-5">
        <h3 className="text-xl font-semibold mb-4">주문상품</h3>
        {renderOrderItems()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <div>
          <div className="py-3">
            <div className="bg-white rounded-lg shadow-lg w-full">
              <h2 className="text-2xl font-semibold mb-4 p-2">배송지 정보</h2>
              <div className="p-3">
                <label htmlFor="recipientName" className="py-2 block">
                  수령인 이름:
                  <input type="text" id="recipientName" name="recipientName" className="ml-2 border border-gray-300 rounded-lg p-2" />
                </label>
                <br />
                <h2>배송지주소:</h2>
                <div className="flex flex-col">
                  <div className="flex items-center flex-grow mb-2">
                    <input type="text" id="contactNumber" required={true} name="address" onChange={handleInput} value={enroll_company.address} className="mr-2 border border-gray-300 rounded-lg p-2 flex-grow" />
                    <button onClick={handleComplete} className="ml-2 py-2 bg-blue-500 text-white rounded-lg post-button">우편번호 찾기</button>
                  </div>
                  {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
                  <input type="text" id="addressLine2" name="addressLine2" placeholder="상세 주소" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <label htmlFor="contactNumber" className="py-2 block">
                  연락처:
                  <input type="tel" id="contactNumber" name="contactNumber" className="ml-2 border border-gray-300 rounded-lg p-2" />
                </label>
              </div>
            </div>
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
          <div className="bg-white rounded-lg shadow-lg p-3 notch">
            <h2 className="text-xl font-semibold mb-4">결제내역</h2>
            <div className="mt-6 p-4">
              <p className="text-lg mb-2">총 상품금액: {totalPrice.toLocaleString()}원</p>
              <p className="text-lg mb-2">할인 금액: {totalDiscount.toLocaleString()}원</p>
              <p className="text-lg mb-2">총 배송비: {totalShipFee.toLocaleString()}원</p>
              <p className="text-lg">최종 결제 금액: {finalPrice.toLocaleString()}원</p>
            </div>
            <Divider />
            <div className="max-w-md mx-auto my-8 px-4 rounded-lg">
              <h3 className="text-2xl text-gray-800 mb-4">결제수단</h3>
              <h5 className="text-lg text-gray-600 mb-2">위 주문내역을 확인하였으며, 결제 내역에 동의합니다.</h5>
              <div className="border-b py-3 px-4 flex justify-between cursor-pointer" onClick={toggleOrderInfo}>
                <h5 className="text-lg text-gray-600">주문 상품 정보 동의</h5>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${isOrderInfoOpen ? "rotate-180" : ""} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isOrderInfoOpen && (
                <div className="p-4">
                  <textarea className="w-full h-40 p-2 text-sm border border-gray-300 rounded-lg mb-4">
                    주문할 상품의 상품명, 가격, 배송정보 등을 최종 확인하였으며, 구매에 동의하십니까? (전자상거래법 제 8조 2항)
                  </textarea>
                </div>
              )}
              <div className="border-b py-3 px-4 flex justify-between cursor-pointer" onClick={togglePersonalInfo}>
                <h5 className="text-lg text-gray-600">개인정보 수집 및 이용동의</h5>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${isPersonalInfoOpen ? "rotate-180" : ""} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isPersonalInfoOpen && (
                <div className="p-4">
                  수집하는 개인정보의 항목
                  ① 한솔축산는 구매, 원활한 고객상담, 각종 서비스의 제공을 위해 주문 이용 시 아래와 같은 개인정보를 수집하고 있습니다.
                  o 필수수집항목 : 이름, 휴대폰번호, 이메일, 수신자정보(성명,주소,휴대폰번호,이메일), 개인통관고유보호(해외직구상품구매시)
                  o 수집목적 : 상품배송, 선물하기 서비스 제공, 배송지 관리
                  o 보유 및 이용기간 : 회원 탈퇴시 까지(단, 관계 법령에 따름)
                  ② 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
                  - IP Address, 쿠키, 방문 일시, OS종류, 브라우져 종류 서비스 이용 기록, 불량 이용 기록
                  ③ 부가 서비스 및 맞춤식 서비스 이용 또는 이벤트 응모 과정에서 해당 서비스의 이용자에 한해서만 아래와 같은 정보들이 수집될 수 있습니다.
                  - 생년월일, 생년월일, 성별, 개인맞춤 서비스 이용내역, 취미, 고객의 서비스 이용이나 이벤트에 대한 피드백
                  ④ 제휴 서비스 이용 과정에서 아래와 같은 정보들이 수집될 수 있습니다.
                  - 제휴 서비스 이용 기록, 제휴 서비스 이용 관련 고객의 특정 정보
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors" onClick={handlePayment}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}