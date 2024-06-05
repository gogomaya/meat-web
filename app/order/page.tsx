import {loginCheck} from "@/app/users/login/loginCheck"
import {OrderParams} from "@/types/ordersTypes"
import {orderCheckout} from "./orderCheckout"
import {redirect} from "next/navigation"

/**
 * 주문서 준비
 * - productPks : string[]
 * - quantityList : number[]
 * - 위의 두 파라미터 넘겨받고
 * - let ordersResponse: ResponseApi = {} 선언
 * - orderServices.orderCreate() 호출하면서 user_pk, guest_mobile, productPks, quantityList 전달
 * - ordersResponse 로 받아서 ordersResponse.order_pk 를 order_pk 로 선언
 * - /order?productPks=1,2,3&quantityList=1,1,1
 * - /order/{order_pk} 로 리다이렉트
 * @param props
 * @returns
 */
const Order = async (props: {
  searchParams: { productPks: string; quantityList: string };
}) => {
  const {user} = await loginCheck(false)

  console.log("::::::::::: productPks :::::::::::")
  let productPks = props.searchParams.productPks
  console.log(productPks)
  console.log("::::::::::: quantityList :::::::::::")
  let quantityList = props.searchParams.quantityList
  console.log(quantityList)
  console.log("::::::::::: user_pk :::::::::::")
  const user_pk = user.user_pk
  console.log(user_pk)

  const pks = productPks.split(",").map(Number)
  const list = quantityList.split(",").map(Number)

  const params = {
    user_pk: user_pk,
    pks: pks,
    list: list
  } as OrderParams

  const orderResult = await orderCheckout(params)

  if( orderResult.result ) {
    console.log(`result : ${orderResult.result}`)
    console.log(`order_pk : ${orderResult.order_pk}`)
    redirect(`/order/${orderResult.order_pk}`)
  }

  // try {
  //   const orderCreateResult: ResponseApi = await ordersServices.ordersCreate(
  //     user_pk,
  //     "",
  //     pks,
  //     list
  //   );
  //   console.log("❤❤❤❤❤❤❤❤❤❤❤❤");
  //   console.log(orderCreateResult);

  //   const order_pk = orderCreateResult.data.order_pk;
  //   const responseStatus = orderCreateResult.data.status;

  //   if (responseStatus == 200) {
  //     console.log("주문 등록 성공!!");
  //     // redirect(`/order/${order_pk}`);
  //   }
  // } catch (error) {
  //   console.error("주문 생성 중 오류 발생:", error);
  // }
  return (
    <>
      <h3>로딩중</h3>
    </>
  )
}

export default Order