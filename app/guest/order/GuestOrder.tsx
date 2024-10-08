"use client"
import {SetStateAction, useEffect, useState} from "react"
import {Divider, Link, Typography} from "@mui/material"
import Image from "next/image"
import DaumPostcode from "react-daum-postcode"
import {CartProduct} from "@/types/productsTypes"
import _ from "lodash"
import {ResponseApi} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import React from "react"
import MainLayout from "../../main-layout"
import {useRouter} from "next/router"
import {Order, OrderParams, OrderSearchParams} from "@/types/ordersTypes"
import {OrderItem} from "@/types/orderItemsTypes"
import {User} from "@/types/usersTypes"
import {Address} from "@/types/addressTypes"
import {CheckoutPage} from "@/app/order/toss"

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


/**
 * 주문 상세 정보
 * - 주문 상품
 * - 주문자 정보
 * - 결제금액
 *  - 총 상품 금액 : order.total_price
 *  - 할인 금액 : ??? (discount_amount)
 *  - 배송비 : ??? (shipping_fee)
 *
 * - 배송 정보
 * @param param0
 * @returns
 */
export const OrderDetailContent = ({
  order, orderItems, guest
}: {
  order: Order
  orderItems: OrderItem[]
  guest: number
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


  const totalDiscount = order.discount
  const totalShipFee = Number(order?.total_price) >= 50000 ? 0 : 5000
  // const totalShipFee = order.shipfee
  const finalPrice = Number(order?.total_price) - totalDiscount + totalShipFee

  // 결제에 필요한 정보
  const orderId = order.order_id                    // 주문 UID
  const orderPk = order.order_pk                    // 주문번호
  const orderName = order.title                     // 주문제복
  const [customerName, setCustomerName] = useState("")                           // 결제자 이름
  const customerEmail = ""                          // 이메일 ❌  : 안하기로함 - 에러체크후 향후삭제
  const customerMobilePhone = order.guest_mobile    // 전화번호 (01012341234 형식, 특수문자 제외)
  const addressPk = 0
  const [guestRecipient, setGuestRecipient] = useState("")
  const [guestMobile, setGuestMobile] = useState("")
  const [guestAddress, setGuestAddress] = useState("")
  const [guestAddressDetail, setGuestAddressDetail] = useState("")

  // 주소창 이벤트 핸들러
  const [enroll_company, setEnroll_company] = useState({
    address:""
  })


  // 결제 요청 정보
  let pay = {
    orderId: orderId,
    orderPk: orderPk,
    finalPrice : finalPrice,
    orderName : orderName,
    customerName : customerName,
    customerEmail : customerEmail,
    customerMobilePhone : customerMobilePhone,
    guestRecipient : guestRecipient,
    guestMobile: guestMobile,
    guestAddress: enroll_company.address,
    guestAddressDetail: guestAddressDetail
  }

  const renderOrderItems = () => {
    return (
      <div className="hidden md:block">
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
            {
              orderItems.map((orderItem, index) => (
                <tr key={orderItem.order_item_pk}>
                  <td className="flex justify-center p-3">
                    <Image
                      src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(orderItem.image_file_name))}`}
                      alt=""
                      width={100}
                      height={30}
                      sizes="100vw"
                      priority />
                  </td>
                  <td className="p-3 text-center">{orderItem.name}</td>
                  <td className="p-3 text-center">{orderItem.price.toLocaleString()}원</td>
                  <td className="p-3 text-center">{orderItem.quantity}</td>
                  <td className="p-3 text-center">{(Number(orderItem.price)*orderItem.quantity).toLocaleString()}원</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  const renderMobileOrderItems = () => {
    return (
      <div className="block md:hidden space-y-4">
        {
          orderItems.map((orderItem, index) => (
            <div key={orderItem.order_item_pk} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(orderItem.image_file_name))}`}
                    alt={orderItem.name}
                    width={100}
                    height={30}
                    sizes="100vw"
                    priority
                    className="rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{orderItem.name}</div>
                  <div className="text-gray-500">
                    <span className="line-through">{Number(orderItem.price).toLocaleString()}원</span>
                  </div>
                  <div className="text-[#A51C30] font-bold">
                    {Number(orderItem.discounted_price).toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-gray-600">수량: {orderItem.quantity}</div>
                <div className="text-[#A51C30] font-bold">
                  최종금액: {(Number(orderItem.discounted_price) * orderItem.quantity).toLocaleString()}원
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
  // 입력 값이 변경될 때 호출되는 함수
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value)
    pay.customerName = event.target.value
  }


  // 받는 사람 정보
  //
  const handleChangeRecipient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestRecipient(event.target.value)
    pay.guestRecipient= event.target.value
  }
  //
  const handleChangeGuestMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestMobile(event.target.value)
    pay.guestMobile= event.target.value
  }
  //
  const handleChangeGuestAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestAddress(event.target.value)
    pay.guestAddress= event.target.value
  }
  //
  const handleChangeGuestAddressDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestAddressDetail(event.target.value)
    pay.guestAddressDetail= event.target.value
  }

  const [popup, setPopup] = useState(false)

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]:e.target.value
    })
    setGuestAddress(enroll_company.address)

  }

  const handleComplete = (data: any) => {
    pay.guestAddress = enroll_company.address
    setPopup(!popup)
  }

  return (
    <div className="container mx-auto p-8">
      <div className="p-3 w-full mb-5">
        <div className="text-2xl font-semibold mb-4">주문상품 asdfsdfdsff</div>
        <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
        {renderOrderItems()}
        {renderMobileOrderItems()}
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-start mb-8 gap-6">
        <div className="w-full md:w-3/4 pr-4 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">주문자 정보</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">보내는 분</div>
                <div className="w-3/4">
                  <input
                    className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    type="text"
                    name="customerName"
                    value={customerName}
                    onChange={handleChangeName}
                    placeholder="이름을 입력하세요"
                  />
                </div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">휴대폰</div>
                <div className="w-3/4">{order.guest_mobile}</div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 mt-8 md:mt-0 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">결제금액</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-2 bg-gray-200 rounded-lg p-3">
            <p className="text-lg m-2 text-black">총 상품금액: {Number(order.total_price).toLocaleString()}원</p>
            {/* TODO: 할인금액이랑 배송비는 어디서 등록하고, 가져와야할까요? */}
            <p className="text-lg m-2 text-black">할인 금액: {totalDiscount.toLocaleString()}원</p>
            <p className="text-lg m-2 text-black">총 배송비: {totalShipFee.toLocaleString()}원</p>
            <p className="text-lg m-2 font-semibold text-black">최종 결제 금액: {finalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-start mb-8 gap-6">
        <div className="w-full md:w-3/4 pr-4 p-3">
          <div className="text-2xl font-semibold mb-4">배송 정보</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          {/* 새 배송지 입력폼 */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">수령인 이름</div>
                <div className="w-3/4">
                  <input
                    type="text"
                    placeholder="이름을 입력하세요."
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChangeRecipient}
                  />
                </div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">연락처</div>
                <div className="w-3/4">
                  <input
                    type="text"
                    placeholder="전화번호 (01012341234) 기호없이"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChangeGuestMobile}
                  />
                </div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">배송지 주소</div>
                <div className="w-3/4">
                  <div className="flex flex-col">
                    <div className="flex items-center flex-grow mb-2">
                      <input type="text" placeholder="우편번호 찾기 버튼을 눌러 배송지 주소를 검색해주세요." id="contactNumber" required={true} name="address"
                        onChange={handleInput} value={enroll_company.address} className="mr-2 border border-gray-300 rounded-lg p-2 flex-grow" />
                      <button
                        onClick={handleComplete}
                        className="ml-2 py-2 text-white rounded-lg post-button"
                        style={{backgroundColor: "#271A11"}}
                      >우편번호 찾기</button>
                    </div>
                    {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
                    <input type="text" id="addressLine2" name="addressLine2" placeholder="상세 주소"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      onChange={handleChangeGuestAddressDetail} />
                  </div>
                </div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
          </div>

          <div className="py-3">
            <div className="flex">
              <div className="w-full">
                <div className="text-2xl font-semibold mb-4 p-2">결제방법</div>
                <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
                {/* 토스 결제 위젯 */}
                <CheckoutPage pay={pay} address_pk={addressPk} guest={guest} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 mt-8 md:mt-0 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">결제확인</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-2">
            <h5 className="text-lg text-gray-600 mb-2">위 주문내역을 확인하였으며, 결제 내역에 동의합니다.</h5>
            <div className="border-b py-3 px-4 flex justify-between cursor-pointer bg-gray-100 rounded-lg" onClick={toggleOrderInfo}>
              <h5 className="text-lg text-gray-600" >주문 상품 정보 동의</h5>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${isOrderInfoOpen ? "rotate-180" : ""} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isOrderInfoOpen && (
              <div className="p-4">
                <div className="w-full h-30 text-sm rounded-lg mb-4">
                    주문할 상품의 상품명, 가격, 배송정보 등을 최종 확인하였으며, 구매에 동의하십니까? (전자상거래법 제 8조 2항)
                </div>
              </div>
            )}
            <div className="border-b py-3 px-4 flex justify-between cursor-pointer bg-gray-100 rounded-lg" onClick={togglePersonalInfo}>
              <h5 className="text-lg text-gray-600">개인정보 수집 및 이용동의</h5>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${isPersonalInfoOpen ? "rotate-180" : ""} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isPersonalInfoOpen && (
              <div className="w-full h-80 p-4 text-sm mb-4" style={{overflow:"scroll"}}>
                  수집하는 개인정보의 항목
                  ① 한솔축산은 구매, 원활한 고객상담, 각종 서비스의 제공을 위해 주문 이용 시 아래와 같은 개인정보를 수집하고 있습니다.
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
        </div>
      </div>
    </div>
  )
}




/**
 * 주문 성공 화면
 * - 주문 상품
 * - 주문자 정보
 * - 배송 정보
 * - 결제금액
 *  - 총 상품 금액 : order.total_price
 *  - 할인 금액 : ??? (discount_amount)
 *  - 배송비 : ??? (shipping_fee)
 *
 * @param param0
 * @returns
 */
export const OrderSuccessContent = ({
  order, orderItems, userInfo, address
}: {
  order: Order
  orderItems: OrderItem[]
  userInfo: User
  address: Address
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

  const totalDiscount = order.discount
  // const totalShipFee = order.shipfee
  const totalShipFee = Number(order?.total_price) >= 50000 ? 0 : 5000
  const finalPrice = Number(order?.total_price) - totalDiscount + totalShipFee

  // 결제에 필요한 정보
  const orderId = order.order_id        // 주문 UID
  const orderPk = order.order_pk        // 주문번호
  const orderName = order.title         // 주문제복
  const customerName = userInfo.name    // 결제자 이름
  const customerEmail = ""              // TODO: 이메일 보류
  const customerMobilePhone = userInfo.mobile   // 전화번호 (01012341234 형식, 특수문자 제외)

  // 결제 요청 정보
  const pay = {
    orderId: orderId,
    orderPk: orderPk,
    finalPrice : finalPrice,
    orderName : orderName,
    customerName : customerName,
    customerEmail : customerEmail,
    customerMobilePhone : customerMobilePhone
  }
  // console.log(":::::::::::::::::: 주문 항목 리스트 확인 ::::::::::::::::::::::")

  // console.log(`orderItems : ${orderItems}`)

  const renderOrderItems = () => {
    return (
      <div className="hidden md:block">
        <table className="w-full">
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
            {/*
              Check the top-level render call using <tbody>. See https://reactjs.org/link/warning-keys for more information.
              반복문 바로 아래 tr 에라 줘야 경고 안뜸.
            */}
            {
              orderItems?.map((orderItem, index) => (
                <tr key={orderItem.order_item_pk}>
                  <td className="flex justify-center">
                    <Image
                      src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(orderItem.image_file_name))}`}
                      alt=""
                      width={100}
                      height={30}
                      sizes="100vw"
                      priority />
                  </td>
                  <td className="p-3 text-center">{orderItem.name}</td>
                  <td className="p-3 text-center">{orderItem.price.toLocaleString()}원</td>
                  <td className="p-3 text-center">{orderItem.quantity}</td>
                  <td className="p-3 text-center">{(Number(orderItem.price)*orderItem.quantity).toLocaleString()}원</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  const renderMobileOrderItems = () => {
    return (
      <div className="block md:hidden space-y-4">
        {
          orderItems.map((orderItem, index) => (
            <div key={orderItem.order_item_pk} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(orderItem.image_file_name))}`}
                    alt={orderItem.name}
                    width={100}
                    height={30}
                    sizes="100vw"
                    priority
                    className="rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{orderItem.name}</div>
                  <div className="text-gray-500">
                    <span className="line-through">{Number(orderItem.price).toLocaleString()}원</span>
                  </div>
                  <div className="text-[#A51C30] font-bold">
                    {Number(orderItem.discounted_price).toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-gray-600">수량: {orderItem.quantity}</div>
                <div className="text-[#A51C30] font-bold">
                  최종금액: {(Number(orderItem.discounted_price) * orderItem.quantity).toLocaleString()}원
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  // const handlePayMethodChange = (type: string) => {
  //   setOrderInfo({...orderInfo, paymentMethod: type})
  // }

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
  // const handleReceiptTypeChange = (type: string) => {
  //   setOrderInfo({...orderInfo, receiptType: type})
  // }

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

  }

  return (
    <div className="container mx-auto p-8">

      <div className="p-3 w-full mb-5">
        <p className="text-4xl">
          감사합니다.
          주문
          <Link href={`/mypage/orders/detail/${order.order_pk}`}>
            (#{order.order_pk})
          </Link>
          이 정상적으로 완료 되었습니다.
        </p>
        <p className="mt-5 mb-10">
          한솔축산을 이용해 주셔서 감사합니다. <br />
          고객님의 상품을 안전하고 신속하게 배달을 해 드리겠습니다.
        </p>
      </div>

      <div className="p-3 w-full mb-5">
        <div className="text-2xl font-semibold mb-4">주문상품</div>
        <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
        {renderOrderItems()}
        {renderMobileOrderItems()}
      </div>
      {/*  */}
      <div className="flex flex-col md:flex-row items-start md:items-start mb-8 gap-6">
        <div className="w-full md:w-3/4 pr-4 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">주문자 정보</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">보내는 분</div>
                <div className="w-3/4">{userInfo.name}</div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">휴대폰</div>
                <div className="w-3/4">{userInfo.mobile}</div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 mt-8 md:mt-0 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">결제금액</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-2 bg-gray-200 rounded-lg p-3">
            <p className="text-lg m-2 text-black">할인 금액: {totalDiscount.toLocaleString()}원</p>
            <p className="text-lg m-2 text-black">총 배송비: {totalShipFee.toLocaleString()}원</p>
            <p className="text-lg m-2 font-semibold text-black">최종 결제 금액: {finalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-start mb-10 gap-6">
        <div className="w-full md:w-3/4 pr-4 p-3">
          {/*  배송 정보 */}
          <div className="text-2xl font-semibold mb-4">배송 정보</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-4 mb-20">
            <div>
              <div className="flex items-center py-2 px-4">
                <div className="flex-1">분류</div>
                <div className="flex-[2]">이름/연락처</div>
                <div className="flex-[4]">주소</div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
              <div key={address.address_pk}>
                <div className="flex items-center py-2 px-4">
                  <div className="flex-1 ">
                    {
                      address.is_primary == 1
                        ?
                        <p className="inline-block text-center text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                              기본
                          <br />
                              배송지
                        </p>
                        :
                        <span>-</span>
                    }
                  </div>
                  <div className="flex-[2]">
                    <p>{address.recipient}</p>
                    <p>{address.mobile}</p>
                  </div>
                  <div className="flex-[4]">
                    <p>{address.address}</p>
                    <p>{address.address_detail}</p>
                  </div>
                </div>
                <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
              </div>
            </div>
          </div>

          {/* 결제 수단  */}
          <div className="py-3">
            <div className="flex">
              <div className="w-full">
                <div className="text-2xl font-semibold mb-4 p-2">결제 수단</div>
                <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <div className="w-1/4 font-medium">결제수단 선택</div>
                      {/* TODO:  결제수단 컬럼 지정할 것 */}
                      <div className="w-3/4">-</div>
                    </div>
                    <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <div className="w-1/4 font-medium">현금 영수증 신청</div>
                      {/* TODO: 현금 영수증 신청 정보만 등로하면 될 지? */}
                      {/* TODO: 신용/현금 분리 처리 할 것인지 그냥 무조건 입력 받을건지 */}
                      <div className="w-3/4">-</div>
                    </div>
                    <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

