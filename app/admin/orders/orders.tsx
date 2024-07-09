"use client"
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import {IconButton, InputBase, Button} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {EnhancedTabledHead, EnhancedTablePagination} from "@/components/common/Table"
import {User} from "@/types/usersTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {usersServices} from "@/services/usersServices"
import {backdrop} from "@/components/common/Backdrop"
import {toastError} from "@/components/common/Toast"
import moment from "moment"
import {Order} from "@/types/ordersTypes"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {orderItemsService} from "@/services/orderItemsServices"
import orders from "@/app/mypage/orders/orders"
import {getOrderStatusMeaning} from "@/app/mypage/orders/ordersUtils"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import * as XLSX from "xlsx"
import {ordersServices} from "@/services/ordersServices"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff"
import {shipmentsServices} from "@/services/shipmentsServices"
import {Shipment} from "@/types/shipmentsTypes"

const AdminOrdersList = ({
  orders,
  total_rows,
  searchParams
}: {
  orders: Order[]
  total_rows: number
  searchParams: SearchParams
}) => {
  const handleDownloadExcel = () => {
    // '결제완료' 상태만 필터링
    const filteredOrders = orders.filter((order) => getOrderStatusMeaning(order.status) === "결제완료")
    const data = filteredOrders.map((order) => ({
      "주문번호": order.order_pk,
      "주소지": order.address_pk,
      "주문자 회원번호": order.user_pk,
      "주문내역": order.title,
      "총 수량": order.total_quantity,
      "총가격": order.total_price,
      "(비회원)전화번호": order.guest_mobile,
      "주문상태": getOrderStatusMeaning(order.status),
      "주문등록일자": moment(order.created_at).format("YYYY-MM-DD")
    }))

    // 엑셀 시트 생성
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "주문목록")

    // 엑셀 파일 다운로드
    XLSX.writeFile(wb, "주문목록.xlsx")
  }
  const customButtonStyle = {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  }
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.query)
  const MySwal = withReactContent(Swal)
  // const handleOrderDetail = async (order_pk : number) => {
  //   // console.log(`order_pk : ${order_pk}`)
  //   MySwal.fire({
  //     title: <p>주문 상세</p>,
  //     text: `주문번호: ${order_pk} `,
  //     icon: "info",
  //     showCancelButton: true,
  //     cancelButtonText: "닫기"
  //   })
  // }
  const handleOrderDetail = async (order_pk: number, user_pk: number, address_pk: number, shipment_pk: number) => {
    router.push(`/admin/orders/detail/${order_pk}/${user_pk}/${address_pk}/${shipment_pk}`)
  }
  const handleDelete = async (order_pk : number) => {
    MySwal.fire({
      title: <p>정말로 삭제하시겠습니까?</p>,
      text: "주문이 취소되면, 되돌릴 수 없습니다.",
      icon: "warning",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let orderResponse: ResponseApi = {}
        orderResponse = await ordersServices.ordersDelete(order_pk)
        console.log(orderResponse)

        MySwal.fire({
          title: <p>주문요청이 취소되었습니다.</p>,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        location.reload()
      }
    })
  }
  // const handleShipmentDetail = (shipment_pk: number) => {
  //   router.push(`/admin/orders/detail/${shipment_pk}`)
  // }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleShipmentDetail = (shipment_pk: Number) => {
    handleClickOpen()
  }
  useEffect(() => {
    setQuery(searchParams.query)
  }, [searchParams.query])
  return (
    <div>
      <form
        className="mb-4 flex justify-between"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("?query=" + query)
        }}
      >
        <Paper className="flex-1 flex">
          <InputBase
            sx={{ml: 1, flex: 1}}
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <IconButton type="button" sx={{p: "10px"}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <Paper>
        <TableContainer>
          <Table>
            <EnhancedTabledHead
              searchParams={searchParams}
              headCells={[
                // {id: "shipment_start", label: "배송상태", sort: true},
                {id: "order_pk", label: "주문번호", sort: true},
                // {id: "address_pk", label: "주소지", sort: true},
                {id: "user_pk", label: "주문자 회원번호", sort: true},
                {id: "title", label: "주문내역", sort: true},
                {id: "total_quantity", label: "총 수량", sort: true},
                {id: "total_discount_price", label: "총가격", sort: true},
                {id: "guest_mobile", label: "회원여부", sort: true},
                {id: "order_status", label: "주문상태", sort: true},
                // {id: "shipment_pk", label: "배송번호", sort: true},
                {id: "created_at", label: "주문등록일자", sort: true},
                {id: "shipment", label: "상세보기", sort: false},
                {id: "delete", label: "주문취소", sort: false}
              ]}
            />
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_pk}>
                  <TableCell>{order.order_pk}</TableCell>
                  {/* <TableCell onClick={()=>handleOrderDetail(order.order_pk)} style={{cursor: "pointer"}}>{order.address_pk}</TableCell> */}
                  <TableCell>{order.user_pk}</TableCell>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{order.total_quantity}</TableCell>
                  <TableCell>{Number(order.total_discount_price).toLocaleString()}</TableCell>
                  <TableCell>{order.user_pk ? "회원" : "비회원"}</TableCell>
                  <TableCell>{getOrderStatusMeaning(order.status)}</TableCell>
                  {/* <TableCell>{order.shipment_pk}</TableCell> */}
                  <TableCell>{moment(order.created_at).format("YYYY-MM-DD")}</TableCell>
                  {/*  결제대기일 때 배송관리 불가 */}
                  {(order.status !== "pending") ? (
                    <TableCell style={{cursor: "pointer"}}>
                      <button  onClick={()=>handleOrderDetail(order.order_pk, order.user_pk ?? 0, order.address_pk, order.shipment_pk)}>
                        <LocalShippingIcon />
                      </button>
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  {/* 결제완료, 배송중, 배송완료일 때만 주문취소 가능 */}
                  {(order.status === "paid" || order.status === "shipping" || order.status === "delivered") ? (
                    <TableCell style={{cursor: "pointer"}}>
                      <button onClick={()=>handleDelete(order.order_pk)}>
                        <CreditCardOffIcon />
                      </button>
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EnhancedTablePagination total_rows={total_rows} searchParams={searchParams} />
        </TableContainer>
      </Paper>
      <div className="flex justify-start py-4">
        <button
          onClick={handleDownloadExcel}
          className="py-4"
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease"
          }}
        >
          결제완료 주문 목록 Excel 다운로드
        </button>
      </div>
    </div>
  )
}

export default AdminOrdersList
