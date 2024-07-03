"use client"
import {Order, OrderParams} from "@/types/ordersTypes"
import Image from "next/image"
import Link from "next/link"
import {useEffect, useState} from "react"
import {getOrderStatusMeaning} from "./ordersUtils"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {orderItemsService} from "@/services/orderItemsServices"
import {myPageAddCart} from "../mypage"
import {ResponseApi} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {orderCancel} from "./orderCancel"


interface OrderProps {
  order: Order
}

export const CancelButton: React.FC<OrderProps> = ({order}) => {

  /*
     text="- 배송 전 주문 취소의 경우, 관리자 승인 후 환불 처리가 진행됩니다."
        subText="- 배송 후 주문 취소의 경우, 반품 또는 고객센터 문의 후 환불 절차가 진행될 수 있습니다."
  */


  // [🟥 주문/배송 취소] 클릭
  const handleCancelOrder = () => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title:
        <>
          <h3 className="text-2xl font-bold mb-6">정말로 주문을 취소하시겠습니까?</h3>
          <p className="text-base font-normal">
            -배송 전, 관리자 승인 후 환불 처리가 진행됩니다. <br />
            -배송 후, 고객센터 문의 후 환불 절차가 진행될 수 있습니다. <br />
          </p>
          <p className="text-lg">
            문의) &nbsp;
            <a href="tel:042-471-1534" className="text-lg font-bold underline">042-471-1534 [전화]</a>
          </p>
        </>
      ,
      text: "",
      icon: "warning",
      confirmButtonText: "주문취소",
      showCancelButton: true,
      cancelButtonText: "닫기"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // TODO: 주문 취소 요청
        const params = {
          order_pk : order.order_pk
        } as OrderParams
        const cancelResult = await orderCancel(params)
        console.log(`cancelResult : ${cancelResult}`)
        console.dir(cancelResult)




        // 1️⃣ 주문 상태 변경 : cancelled
        // 2️⃣ 취소 등록
        // 3️⃣ 환불은 관리자에서 확인 후, ⚡ 토스 결체 취소 요청
        MySwal.fire({
          title: <p>주문 취소가 요청되었습니다.</p>,
          text: "",
          didOpen: () => {
            Swal.showLoading()
          }
        })

        // location.reload()
      }
    })
  }

  return (
    <>
      <button onClick={handleCancelOrder} className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
          주문/배송 취소
      </button>
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

  // 🗑️ 주문 삭제
  const handleDelete = async (order_pk : number) => {
    console.log(`order_pk : ${order_pk}`)
    MySwal.fire({
      title: <p>정말로 삭제하시겠습니까?</p>,
      text: "주문 내역이 삭제되면, 되돌릴 수 없습니다.",
      icon: "warning",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.isConfirmed) {

        let response: ResponseApi = {}
        response = await ordersServices.ordersDelete(order_pk)
        console.log(response)

        MySwal.fire({
          title: <p>주문 내역이 삭제되었습니다.</p>,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        location.reload()
      }
    })
  }

  // [장바구니] & [이미지] 클릭
  const handleOrderClick = (order : Order) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <OrderItemTable order={order} />,
      text: "",
      confirmButtonText: "확인"
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
                {/* 주문 상태 */}
                <div className="item"><span className="text-[#A51C30] font-bold">{getOrderStatusMeaning(order.status)}</span></div>
                {/* 주문 삭제 */}
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
                  {/* 주문 이미지 */}
                  <button onClick={() => handleOrderClick(order)}>
                    <Image
                      src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(order.file_name))}`}
                      alt=""
                      width={32}
                      height={32}
                      sizes="100vw"
                      className="md:w-16"
                      priority />
                  </button>
                </div>
                <div className="item flex-[3]">
                  <div className="flex flex-col items-between">
                    {/* 주문 제목 / 가격 / 수량 */}
                    <div className="item"><span>{order.title}</span></div>
                    <div className="item"><span>{order.total_discount_price?.toLocaleString()}</span>원</div>
                    <div className="item"><span>{order.total_quantity}</span>개</div>
                  </div>
                </div>
                <div className="item flex-[2]">
                  <div className="flex flex-col items-between gap-3">
                    <div className="item">
                      <button
                        type="button"
                        className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-6 py-1 w-full active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={() => handleOrderClick(order)}
                      >
                        장바구니
                      </button>
                    </div>
                    {/* 총 가격 */}
                    <div className="item text-center">
                      <p className="font-bold">
                        <span>{order.total_discount_price?.toLocaleString()}</span>원
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
                {/* 로젠택배 https://www.ilogen.com/m/personal/trace/{tracking_no}} 띄우기 */}
                {order.status == "paid" || order.status == "shipping" || order.status == "delivered"
                  ?
                  <>
                    <Link
                      href={`/mypage/orders/shipments/${order.shipment_pk}`}
                      className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      배송조회
                    </Link>
                    {/* 주문/배송취소 버튼 */}
                    <CancelButton order={order} />
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

/**
 * 주문상세 모달(sweet alert용)
 * @returns
 */
interface OrderItemTableProps {
  order: Order
  // items: OrderItem[]
}
const OrderItemTable: React.FC<OrderItemTableProps> = ({order}) => {
  const [orderItems, setOrderItems] = useState([] as OrderItem[])

  useEffect(() => {
    const searchParams = {
      order_pk : order.order_pk,
      rowsPerPage: null,
      page: null,
      orderColumn: "order_pk",
      orderDirection: "desc",
      query: ""
    } as OrderItemSearchParams
    const fetchOrderItems = async () => {
      try {
        const orderItemsResponse = await orderItemsService.orderItemsRead(searchParams)
        const items = await orderItemsResponse.data.orderItems
        setOrderItems(items)
        console.log(`items : ${items}`)

      } catch (err) {
        console.log("주문항목 못 가져옴...")

      }
    }

    fetchOrderItems()
  }, [order.order_pk])

  const data = [
    {id: 1, name: "John Doe", email: "john@example.com", status: "Active"},
    {id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive"},
    {id: 3, name: "Sam Green", email: "sam@example.com", status: "Active"}
  ]

  const handleCartClick = (item : OrderItem) => {
    console.log(`orderItem : ${item}`)
    console.log(`product_pk : ${item.product_pk}`)
    // 장바구니 추가
    myPageAddCart(item.product_pk, 1)
  }


  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{order.title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                NO
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                상품명
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                비고
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={item.order_item_pk}>
                <td className="px-6 py-4 border-b text-left text-sm border-gray-200">{index+1}</td>
                <td className="px-6 py-4 border-b text-left text-sm border-gray-200">
                  <a href={`/products/${item.product_pk}`}>
                    {item.name}
                  </a>
                </td>
                <td className="px-6 py-4 border-b text-left text-sm border-gray-200">
                  <button onClick={() => handleCartClick(item)}>
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium md:w-8 md:h-8 css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShoppingCartIcon"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"></path></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderItemTable