"use client"
import {getCancellationStatusMeaning, getOrderStatusMeaning} from "@/app/mypage/orders/ordersUtils"
import {EnhancedTabledHead, EnhancedTablePagination} from "@/components/common/Table"
import {Cancellation, CancellationSearchParams} from "@/types/cancellationsTypes"
import {SearchParams} from "@/types/commonTypes"
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import SearchIcon from "@mui/icons-material/Search"
import {IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import moment from "moment"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {orderCancel} from "./orderCancel"

const AdminCancelList = ({
  cancels,
  total_rows,
  searchParams
}: {
  cancels: Cancellation[]
  total_rows: number
  searchParams: SearchParams
}) => {

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


  const handleCancel = async (cancellation_pk : number, order_pk : number) => {
    MySwal.fire({
      title: <p>주문 취소 승인</p>,
      text: "주문 취소를 승인합니다. 주문 취소 처리 및 결제가 환불 처리됩니다.",
      icon: "warning",
      confirmButtonText: "주문취소",
      showCancelButton: true,
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.isConfirmed) {

        // TODO: 주문 취소 요청
        const params = {
          cancellation_pk : cancellation_pk,
          order_pk : order_pk
        } as CancellationSearchParams
        const cancelResult = await orderCancel(params)
        console.log(`cancelResult : ${cancelResult}`)
        console.dir(cancelResult)

        location.reload()
      }
    })
  }


  const handleOrderDetail = () => {

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
                {id: "cancellation_pk", label: "취소번호", sort: true},
                {id: "user_pk", label: "취소 회원번호", sort: true},
                {id: "total_discount_price", label: "총가격", sort: true},
                {id: "cancellation_status", label: "취소상태", sort: true},
                {id: "created_at", label: "취소등록일자", sort: true},
                {id: "title", label: "상세보기", sort: true},
                {id: "delete", label: "주문취소", sort: false}
              ]}
            />
            <TableBody>
              {cancels.map((cancel) => (
                <TableRow key={cancel.cancellation_pk}>
                  <TableCell>{cancel.cancellation_pk}</TableCell>
                  <TableCell>{cancel.user_pk}</TableCell>
                  <TableCell>{Number(cancel.total_discount_price).toLocaleString()}</TableCell>
                  <TableCell>{getCancellationStatusMeaning(cancel.status)}</TableCell>
                  <TableCell>{moment(cancel.created_at).format("YYYY-MM-DD")}</TableCell>
                  <TableCell style={{cursor: "pointer"}}>
                    <button  onClick={()=>handleOrderDetail()}>
                      {/* TODO: 취소 상세 보기에 어울리는 아이콘으로 */}
                      <LocalShippingIcon />
                    </button>
                  </TableCell>
                  <TableCell style={{cursor: "pointer"}}>
                    <button onClick={()=>handleCancel(cancel.cancellation_pk, cancel.order_pk)}>
                      <CreditCardOffIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EnhancedTablePagination total_rows={total_rows} searchParams={searchParams} />
        </TableContainer>
      </Paper>
    </div>
  )
}

export default AdminCancelList
