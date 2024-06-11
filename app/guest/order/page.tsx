import MainLayout from "@/app/main-layout"
import {orderCheckout} from "@/app/order/orderCheckout"
import RedirectErrorPage from "@/app/redirect/redirect"
import {loginCheck} from "@/app/users/login/loginCheck"
import {OrderParams} from "@/types/ordersTypes"
import {redirect} from "next/navigation"

/**
 * 주문서 준비
 * - productPks : string[]
 * - quantityList : number[]
 * - 위의 두 파라미터 넘겨받고
 * - let ordersResponse: ResponseApi = {} 선언
 * - orderServices.orderCreate() 호출하면서 user_pk, guest_mobile, productPks, quantityList 전달
 * - ordersResponse 로 받아서 ordersResponse.order_pk 를 order_pk 로 선언
 * - /guest/order?mobile=01012341234&productPks=1,2,3&quantityList=1,1,1
 * - /guest/order/{order_pk} 로 리다이렉트
 * @param props
 * @returns
 */
const Order = async (props: {
  searchParams: { productPks: string; quantityList: string, mobile: string };
}) => {
  // 비회원 주문이므로 로그인 체크 안함
  const {user} = await loginCheck(false)

  console.log("::::::::::: productPks :::::::::::")
  let productPks = props.searchParams.productPks
  console.log(productPks)
  console.log("::::::::::: quantityList :::::::::::")
  let quantityList = props.searchParams.quantityList
  console.log(quantityList)
  console.log("::::::::::: 모바일 :::::::::::")
  let mobile = props.searchParams.mobile
  console.log(mobile)

  // 유효성 검사 함수
  const isValidInput = (arr: number[]) => arr?.every((num) => !isNaN(num) && num >= 0)
  const pks = productPks?.split(",").map(Number)
  const list = quantityList?.split(",").map(Number)

  // ================= [에러 리다이렉트] =================
  let title = "주문 요청 실패"
  let text = "잘못된 상품번호 또는 수량입니다."
  let errorCode = "400"
  let redirectUrl = "/"
  title = encodeURIComponent(title)
  text = encodeURIComponent(text)
  if( !isValidInput(pks) || !isValidInput(list) ) {
    let url = `/redirect?errorCode=${errorCode}&redirectUrl=${redirectUrl}&title=${title}&text=${text}&icon=warning`
    redirect(url)
  }
  // ================= [에러 리다이렉트] =================


  const params = {
    user_pk: 0,
    mobile: mobile,
    pks: pks,
    list: list
  } as OrderParams

  const orderResult = await orderCheckout(params)
  console.log(`orderResult : ${orderResult}`)

  if( orderResult.result ) {
    console.log(`result : ${orderResult.result}`)
    console.log(`order_pk : ${orderResult.order_pk}`)
    redirect(`/guest/order/${orderResult.order_pk}?guest=1`)
  }

  text = "주문 정보 저장에 실패하였습니다."
  let url = `/redirect?errorCode=${errorCode}&redirectUrl=${redirectUrl}&title=${title}&text=${text}&icon=warning`
  redirect(url)

  return (
    <MainLayout user={user}>
      <div>
        <div className="flex justify-center text-white text-4xl"
          style={{
            backgroundImage: "url('/images/Bg.png')",
            backgroundPosition: "center calc(10% - 620px)",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            textAlign: "center",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>주문 요청 중</div>
      </div>
      <RedirectErrorPage title={"주문 요청 중"} text={"고객님이 요청하신 주문을 처리하고있습니다."} errorCode={""} icon={"success"} />
    </MainLayout>
  )
}

export default Order