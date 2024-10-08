"use client"
import {SetStateAction, useEffect, useState} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Link, Modal, Typography} from "@mui/material"
import Image from "next/image"
import DaumPostcode from "react-daum-postcode"
import _ from "lodash"
import {CheckoutPage} from "./toss"
import React from "react"
import MainLayout from "../main-layout"
import {useRouter} from "next/navigation"
import {Order, OrderParams, OrderSearchParams} from "@/types/ordersTypes"
import {OrderItem} from "@/types/orderItemsTypes"
import {User} from "@/types/usersTypes"
import {Address, AddressSearchParams} from "@/types/addressTypes"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import {usersServices} from "@/services/usersServices"
import MyPageAddress from "../mypage/address/page"

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

// export const OrderDetailContent = ({
//   orderProducts
// }: {
//   orderProducts: CartProduct[]
// }) => {

// export const OrderDetailContent = () => {


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
  order, orderItems, userInfo, addressList
}: {
  order: Order
  orderItems: OrderItem[]
  userInfo: User
  addressList: Address[]
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

  // // 결제 정보
  // const totalPrice = _.sumBy(orderProducts, (orderProduct) => {
  //   return Number(orderProduct.product.price) * orderProduct.quantity
  // })
  // const totalDiscount = orderInfo.discount
  // const totalShipFee = orderInfo.shipfee
  // const finalPrice = totalPrice - totalDiscount + totalShipFee

  const [addressPk, setAddressPk] = useState(addressList[0].address_pk || 0)

  console.log(`addressList[0].address_pk (기본 배송지 번호) : ${addressList[0].address_pk}`)

  const totalDiscount = order.discount
  const totalShipFee = Number(order?.total_price) >= 50000 ? 0 : 5000
  // const totalShipFee = 0
  // const totalShipFee = order.shipfee
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
            {/*
              Check the top-level render call using <tbody>. See https://reactjs.org/link/warning-keys for more information.
              반복문 바로 아래 tr 에라 줘야 경고 안뜸.
            */}
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
                  <td className="p-3 text-center">
                    <span className="line-through">{Number(orderItem.price).toLocaleString()}원</span><br />
                    <span className="text-[#A51C30] font-bold">{Number(orderItem.discounted_price).toLocaleString()}원</span>
                  </td>
                  <td className="p-3 text-center">{orderItem.quantity}</td>
                  <td className="p-3 text-center">
                    <span className="text-[#A51C30] font-bold">{(Number(orderItem.discounted_price)*orderItem.quantity).toLocaleString()}원</span>
                  </td>
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
  // 배송지 선택
  const handleCheckboxChange = (address_pk: number) => {
    console.log(`address_pk (선택한 배송지 번호) : ${address_pk}`)
    setAddressPk(address_pk)
  }

  // 이름 및 전화번호 수정
  const router = useRouter()
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userInfo.name)
  const [newName, setNewName] = useState(name)
  const [mobile, setMobile] = useState(userInfo.mobile)
  const [newMobile, setNewMobile] = useState(mobile)

  // 이름 수정
  const handleNameEditClick = () => {
    setIsNameEditing(true)
  }

  const handleNameSaveClick = () => {
    setIsNameEditing(false)
  }

  const handleNameCancelClick = () => {
    setIsNameEditing(false)
    setNewName(name)
  }


  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setNewMobile(mobile)
  }
  const handelUpdateName = async () => {
    let updatedUser = {
      user_pk: userInfo.user_pk || 0,
      id: userInfo.id || "",
      nickname: userInfo.nickname || "",
      mobile: userInfo.mobile || "",
      third_party: userInfo.third_party || "Naver",
      name: newName || ""
    }

    if (name === "") {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">주문자 정보 확인</p>,
        text: "보내는 분 성함을 반드시 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }

    const userUpdateResult = await usersServices.usersUpdate(updatedUser)

    if (userUpdateResult.data.status === 200) {
      // const MySwal = withReactContent(Swal)
      // MySwal.fire({
      //   title: <p className="text-xl">이름 수정 완료</p>,
      //   text: "이름을 수정하였습니다.",
      //   confirmButtonText: "확인"
      // })
      // 새로고침
      router.refresh()
    }
  }

  const handelUpdateMobile = async () => {
    let updatedUser = {
      user_pk: userInfo.user_pk || 0,
      id: userInfo.id || "",
      nickname: userInfo.nickname || "",
      mobile: newMobile || "",
      third_party: userInfo.third_party || "Naver",
      name: userInfo.name || ""
    }

    if (mobile === "") {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">회원정보 수정 확인</p>,
        text: "전화번호를 기호 없이 숫자만 올바르게 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }

    const userUpdateResult = await usersServices.usersUpdate(updatedUser)

    if (userUpdateResult.data.status === 200) {
      // const MySwal = withReactContent(Swal)
      // MySwal.fire({
      //   title: <p className="text-xl">전화번호정보 수정 완료</p>,
      //   text: "전화번호 수정을 완료하였습니다.",
      //   confirmButtonText: "확인"
      // })
      // 새로고침
      router.refresh()
    }
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-8">
      <div className="p-3 w-full mb-5">
        <div className="text-2xl font-semibold mb-4">주문상품</div>
        <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
        {renderOrderItems()}
        {renderMobileOrderItems()}
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-start mb-8 gap-6">
        <div className="w-full md:w-3/4 pr-4 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">주문자 정보 <span className="px-4 text-red-700 text-sm">수정 시 회원정보도 동일하게 업데이트 됩니다.</span></div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between py-2 gap-4">
                <div className="w-1/4 font-medium">보내는 분</div>
                <div className="w-3/4">
                  {isNameEditing ? (
                    <input
                      type="text"
                      id="name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="(보내는 분 성함을 입력해주세요.)"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{newName}</span>
                  )}
                </div>
                {isNameEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => { handelUpdateName(); handleNameSaveClick() }}
                      className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                    >
                      <span className="text-lg font-normal">수정</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNameCancelClick}
                      className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                    >
                      <span className="text-lg font-normal">취소</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleNameEditClick}
                    className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                  >
                    <span className="text-lg font-normal">수정</span>
                  </button>
                )}
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            <div>
              <div className="flex items-center justify-between py-2 gap-4">
                <div className="w-1/4 font-medium">휴대폰</div>
                <div className="w-3/4">
                  {isEditing ? (
                    <input
                      type="text"
                      id="mobile"
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value)}
                      placeholder="(전화번호를 기호(-) 없이 바르게 입력해주세요.)"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{newMobile}</span>
                  )}
                </div>
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => { handelUpdateMobile(); handleSaveClick() }}
                      className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                    >
                      <span className="text-lg font-normal">수정</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                    >
                      <span className="text-lg font-normal">취소</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                  >
                    <span className="text-lg font-normal">수정</span>
                  </button>
                )}
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 mt-8 md:mt-0 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">결제금액</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-2 bg-gray-200 rounded-lg p-3">
            <p className="text-lg m-2 text-black">
              총 상품금액: <span className="line-through">{order.total_price?.toLocaleString()}원</span>
            </p>
            <p className="text-lg m-2 text-black">할인 금액: {Number(totalDiscount).toLocaleString()}원</p>
            <p className="text-lg m-2 text-black">총 배송비: {Number(totalShipFee).toLocaleString()}원</p>
            <p className="text-lg m-2 text-black">(5만원 결제 시, 무료 배송)</p>
            <p className="text-lg m-2 font-semibold text-[#A51C30]">최종 결제 금액: {Number(finalPrice).toLocaleString()}원</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-start mb-8 gap-6">
        <div className="w-full md:w-3/4 pr-4 p-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold mb-4">배송 정보</div>
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              <div className="w-full flex gap-6 max-w-4xl">
                {/* <a
                  href="/mypage/address/create"
                  onClick={handleOpenDialog}
                  className="ml-auto w-full flex justify-center items-center gap-2 px-4 py-2 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>새 배송지 등록</span>
                </a> */}
                <Link
                  href={"/mypage/address/create"}
                  className="no-underline ml-auto w-full flex justify-center items-center gap-2 px-4 py-2 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>새 배송지 등록</span>
                </Link>
              </div>
              <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>새 배송지 추가</DialogTitle>
                <DialogContent>
                  <div>배송지 추가</div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    닫기
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-4">
            <div>
              <div className="flex items-center py-2 px-4">
                <div className="flex-1">분류</div>
                <div className="flex-[2]">이름/연락처</div>
                <div className="flex-[4]">주소</div>
                <div className="flex-[1] text-center">선택</div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            {
              addressList.map((address, index) => (
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
                          <span></span>
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
                    <div className="flex-[1] text-center">
                      {
                        <input type="radio" name="address_pk" value={address.address_pk}
                          className="form-radio h-5 w-5 text-blue-600"
                          checked={address.address_pk == addressPk ? true : false}
                          onChange={(e) => handleCheckboxChange(Number(e.target.value))} />
                      }
                    </div>
                  </div>
                  <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
                </div>
              ))
            }
          </div>
          <div className="py-8">
            <div className="flex">
              <div className="w-full">
                <div className="text-2xl font-semibold mb-4 p-2">결제방법</div>
                <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
                {/* 토스 결제 위젯 */}
                <CheckoutPage pay={pay} address_pk={addressPk} guest={undefined} />
                {/* <div className="flex items-center justify-between py-2">
                  <div className="w-1/4 font-medium">결제수단</div>
                  <div className="w-3/4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="toss"
                          onClick={() => handlePayMethodChange("toss")}
                        />
                        <label htmlFor="toss">
                          <Link href="/">
                            <Image
                              src="/images/logo-toss-pay.svg"
                              alt="Toss Pay"
                              width={200}
                              height={200}
                              sizes="100vw"
                              className="w-34 h-auto"
                              priority
                            />
                          </Link>
                        </label>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="naver"
                          onClick={() => handlePayMethodChange("naver")}
                        />
                        <label htmlFor="naver">
                          <Link href="/">
                            <Image
                              src="/images/naver-pay-btn.png"
                              alt="Naver Pay"
                              width={200}
                              height={200}
                              sizes="100vw"
                              className="w-34 h-auto"
                              priority
                            />
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
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
          {/* <div className="flex justify-center mt-4">
            <button
              className="text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
              style={{backgroundColor: "#271A11"}}
              onClick={handlePayment}
            ><span>16,800원 </span>결제하기</button>
          </div> */}
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
  const totalShipFee = Number(order?.total_price) >= 50000 ? 0 : 5000
  // const totalShipFee = order.shipfee
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
  console.log(":::::::::::::::::: 주문 항목 리스트 확인 ::::::::::::::::::::::")

  console.log(`orderItems : ${orderItems}`)

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
                  <td className="p-3 text-center">
                    <span className="line-through">{orderItem.price.toLocaleString()}원</span><br />
                    <span className="text-[#A51C30] font-bold">{orderItem.discounted_price.toLocaleString()}원</span>
                  </td>
                  <td className="p-3 text-center">{orderItem.quantity}</td>
                  <td className="p-3 text-center">
                    <span className="text-[#A51C30] font-bold">{(Number(orderItem.discounted_price)*orderItem.quantity).toLocaleString()}원</span>
                  </td>
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


  const [name, setName] = useState(userInfo.name)
  const [mobile, setMobile] = useState(userInfo.mobile)

  const handelUpdate = async () => {
    let updatedUser = {
      user_pk: userInfo.user_pk || 0,
      id: userInfo.id || "",
      nickname: userInfo.nickname || "",
      mobile: mobile || "",
      third_party: userInfo.third_party || "Naver",
      name: userInfo.name || ""
    }

    if (mobile === "") {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">회원정보 수정 확인</p>,
        text: "전화번호를 기호 없이 숫자만 올바르게 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }

    const userUpdateResult = await usersServices.usersUpdate(updatedUser)

    if (userUpdateResult.data.status === 200) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">회원정보 수정 완료</p>,
        text: "회원정보 수정을 완료하였습니다.",
        confirmButtonText: "확인"
      })
      // 새로고침
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
                <div className="w-1/4 font-medium">성명 또는 닉네임</div>
                <div className="w-3/4">{userInfo.name || userInfo.nickname}</div>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
            <div>
              <div className="flex items-center justify-between py-2">
                <div className="w-1/4 font-medium">휴대폰</div>
                <div className="w-3/4">
                  <input
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={handelUpdate}
                  className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
                >
                  <span className="text-lg font-normal">수정하기</span>
                </button>
              </div>
              <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 mt-8 md:mt-0 bg-white p-3">
          <div className="text-2xl font-semibold mb-4">결제금액</div>
          <Divider style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
          <div className="space-y-2 bg-gray-200 rounded-lg p-3">
            <p className="text-lg m-2 text-black">
              총 상품금액: <span className="line-through">{order.total_price?.toLocaleString()}원</span>
            </p>
            <p className="text-lg m-2 text-black">할인 금액: {totalDiscount.toLocaleString()}원</p>
            <p className="text-lg m-2 text-black">총 배송비: {totalShipFee.toLocaleString()}원</p>
            <p className="text-lg m-2 font-semibold text-[#A51C30]">최종 결제 금액: {finalPrice.toLocaleString()}원</p>
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
                  {/* TODO:  결제수단 컬럼 지정할 것 */}
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <div className="w-1/4 font-medium">결제수단 선택</div>
                      <div className="w-3/4">-</div>
                    </div>
                    <Divider style={{backgroundColor: "#ddd", height: "0.1px"}} />
                  </div>
                  {/* TODO: 현금 영수증 신청 정보만 등로하면 될 지? */}
                  {/* TODO: 신용/현금 분리 처리 할 것인지 그냥 무조건 입력 받을건지 */}
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <div className="w-1/4 font-medium">현금 영수증 신청</div>
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

