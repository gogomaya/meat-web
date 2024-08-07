import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"
import {Order, OrderSearchParams} from "@/types/ordersTypes"
import {Product} from "@/types/productsTypes"
import {productsServices} from "./productsServices"
import {orderItemsService} from "./orderItemsServices"
import {dir} from "console"
import {NextResponse} from "next/server"

export const ordersServices = {
  ordersCreate: async (user_pk: number, guest_mobile: string, productPks: number[], quantityList: number[]): Promise<ResponseApi> => {
    console.log(":::::::::: ordersServices.orderCreate() ::::::::::")
    console.log("productPks : " + productPks)
    console.log("quantityList : " + quantityList)
    console.log("guest_mobile : " + guest_mobile)
    try {
      // 주문항목에 담을 상품목록 조회
      const productList: Product[] = []

      // total_discount_price(총 할인가), total_price(총 정가), total_quantity, total_count, discount(할인된 가격[정가-할인가]) 계산
      let total_discount_price : number = 0
      let total_price : number = 0
      let total_quantity : number = 0
      let total_count : number = productPks.length
      let title = `주문 상품 외 ${productPks.length - 1}건`
      let shipfee = 5000      // 기본 배송비 5000원

      for (let i = 0; i < productPks.length; i++) {
        const product_pk = productPks[i]
        let amount = 0
        let discount_amount = 0
        const productResponse: ResponseApi = await productsServices.productsDetail(product_pk)
        if (!productResponse.error && productResponse.data) {
          const product: Product = productResponse.data.product
          productList.push(product)
          if( i == 0 && productPks.length > 1 ) {
            title = `${product.name} 외 ${productPks.length - 1} 건`
          } else if ( i == 0 && productPks.length == 1 ) {
            title = product.name
          }

          amount = Number(product.price) * quantityList[i]
          discount_amount = Number(product.discounted_price) * quantityList[i]
          total_price = total_price + amount
          total_discount_price = total_discount_price + discount_amount
          total_quantity = total_quantity + quantityList[i]
        }
      }

      const discount = total_price - total_discount_price
      console.log("total_price : " + total_price)
      console.log("total_discount_price : " + total_discount_price)
      console.log("total_quantity : " + total_quantity)
      console.log("total_count : " + total_count)
      console.log("discount : " + discount)

      // 상품목록 확인
      // console.log("::::::::::: 전달받은 productPks 로 조회된 상품정보 리스트 ::::::::::")
      // console.log(productList)
      // console.log("-----------------------------------------------------------------")
      // 주문 데이터 등록
      console.log("order - [INSERT] - 주문 데이터 등록")
      const formData = new FormData()
      formData.append("user_pk", String(user_pk))
      formData.append("guest_mobile", guest_mobile)
      formData.append("title", title)
      formData.append("total_price", String(total_price))
      formData.append("total_discount_price", String(total_discount_price))
      formData.append("total_quantity", String(total_quantity))
      formData.append("total_count", String(total_count))
      formData.append("discount", String(discount))
      // ⭐(할인가 기준) 5만원이상 무료배송, 건당 5,000원
      if( total_discount_price >= 50000 ) shipfee = 0
      formData.append("shipfee", String(shipfee))


      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
        method: "POST",
        body: formData
      })

      // const orderPkResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/max`, {})
      // 캐싱되는 시간의 MAX값 가져와서 오류난 듯
      // const data = await orderPkResponse.json()
      const result = await commonServices.responseJson(response)
      const order_pk = await result.data.order_pk

      console.log(`::::::::::::::::: 주문 항목 등록 - order_pk : ${order_pk} :::::::::::::::::`)

      for (let i = 0; i < productList.length; i++) {
        const product_pk = productList[i].product_pk
        const quantity = quantityList[i]
        console.log(`등록 상품 번호 : ${product_pk}, 수량 : ${quantity}`)

        const itemResult = await orderItemsService.orderItemsCreate(product_pk, order_pk, quantity)
        console.log(`itemResult : ${itemResult}`)

      }
      return result
    } catch (error) {
      console.log("주문서 등록 프로세스 중 에러 : orderCreate")
      return {error}
    }
  },
  ordersRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders?` + new URLSearchParams({
        ...searchParams
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  ordersDetail: async (order_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${order_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  ordersUpdate: async (updatedOrderData: Order): Promise<ResponseApi> => {
    console.log(":::::::::: ordersServices.orderUpdate() ::::::::::")
    const order_pk = updatedOrderData.order_pk
    console.log("order_pk : " + order_pk)
    try {
      const formData = new FormData()
      if (updatedOrderData.user_pk !== undefined) formData.append("user_pk", String(updatedOrderData.user_pk))
      if (updatedOrderData.guest_name !== undefined) formData.append("guest_name", updatedOrderData.guest_name)
      if (updatedOrderData.guest_mobile !== undefined) formData.append("guest_mobile", updatedOrderData.guest_mobile)
      if (updatedOrderData.address_pk !== undefined) formData.append("address_pk", String(updatedOrderData.address_pk))
      if (updatedOrderData.shipment_pk !== undefined) formData.append("shipment_pk", String(updatedOrderData.shipment_pk))
      if (updatedOrderData.title !== undefined) formData.append("title", updatedOrderData.title)
      if (updatedOrderData.total_price !== undefined) formData.append("total_price", String(updatedOrderData.total_price))
      if (updatedOrderData.total_quantity !== undefined) formData.append("total_quantity", String(updatedOrderData.total_quantity))
      if (updatedOrderData.total_count !== undefined) formData.append("total_count", String(updatedOrderData.total_count))
      if (updatedOrderData.status !== undefined) formData.append("status", updatedOrderData.status)

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${order_pk}`, {
        method: "PUT",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  ordersDelete: async (order_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${order_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}