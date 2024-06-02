import {loginCheck} from "../users/login/loginCheck"

/**
 * 주문서 준비
 * - productPks : string[]
 * - quantityList : number[]
 * - 위의 두 파라미터 넘겨받고
 * - let ordersResponse: ResponseApi = {} 선언
 * - orderServices.orderCreate() 호출하면서 user_pk, guest_mobile, productPks, quantityList 전달
 * - ordersResponse 로 받아서 ordersResponse.order_pk 를 order_pk 로 선언
 * - /order/{order_pk} 로 리다이렉트
 * @param props
 * @returns
 */
const Order = async (props: {
  
}) => {
  const {user} = await loginCheck(false)
  return (
    <></>
  )
}

export default Order