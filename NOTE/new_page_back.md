import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {loginCheck} from '../users/login/loginCheck'
import {ordersServices} from '@/services/ordersServices'

/**
 * 주문서 준비
 * - productPks : string[]
 * - quantityList : number[]
 * - 위의 두 파라미터를 넘겨받고
 * - let ordersResponse: ResponseApi = {} 선언
 * - orderServices.orderCreate() 호출하면서 user_pk, guest_mobile, productPks, quantityList를 전달
 * - ordersResponse를 받아서 ordersResponse.order_pk를 order_pk로 선언
 * - /order/{order_pk}로 리다이렉트
 * @param props
 * @returns
 */
const Order = async (props: { productPks: number[], quantityList: number[] }): Promise<JSX.Element> => {
  // 로그인 상태 확인
  const {user} = await loginCheck(false)

  // 주문 아이디 상태 변수
  const [order_pk, setOrderPk] = useState<number | null>(null)
  const router = useRouter()

  // 주문 생성 함수
  useEffect(() => {
    const createOrder = async () => {
      try {
        // 주문 생성 요청
        const ordersResponse = await ordersServices.orderCreate(user?.user_pk, '', props.productPks, props.quantityList)
        const order_pk = ordersResponse.data.order_pk
        // 주문 생성 결과 확인
        if (!ordersResponse.error && order_pk) {
          // 주문 아이디 설정
          setOrderPk(order_pk)
          // 주문 페이지로 리다이렉트
          router.push(`/order/${order_pk}`)
        } else {
          console.error('Failed to create order:', ordersResponse.error)
        }
      } catch (error) {
        console.error('Error occurred while creating order:', error)
      }
    }
    // 주문 생성 함수 호출
    createOrder()
  }, [])

  return <></>
}

export default Order
