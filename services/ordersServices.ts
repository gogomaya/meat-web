import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"
import {Order, OrderSearchParams} from "@/types/ordersTypes"
import {Product} from "@/types/productsTypes"
import {productsServices} from "./productsServices"
import {orderItemsService} from "./orderItemsServices"

export const ordersServices = {
  ordersCreate: async (user_pk: number, guest_mobile: string, productPks: number[], quantityList: number[]): Promise<ResponseApi> => {
    console.log(":::::::::: ordersServices.orderCreate() ::::::::::")
    console.log("productPks : " + productPks)
    console.log("quantityList : " + quantityList)
    try {
      // 주문항목에 담을 상품목록 조회
      const productList: Product[] = []

      // total_price, total_quantity, total_count 계산
      let total_price : number = 0
      let total_quantity : number = 0
      let total_count : number = productPks.length
      let title = `주문 상품 외 ${productPks.length}건`

      for (let i = 0; i < productPks.length; i++) {
        const product_pk = productPks[i]
        let amount = 0
        const productResponse: ResponseApi = await productsServices.productsDetail(product_pk)
        if (!productResponse.error && productResponse.data) {
          const product: Product = productResponse.data.product
          productList.push(product)
          if( i == 0 && productPks.length > 1 ) {
            title = `${product.name} 외 ${productPks.length} 건`
          } else if ( i == 0 && productPks.length == 1 ) {
            title = product.name
          }
          amount = Number(product.price) * quantityList[i]
          total_price = total_price + amount
          total_quantity = total_quantity + quantityList[i]
        }
      }
      console.log("total_price : " + total_price)
      console.log("total_quantity : " + total_quantity)
      console.log("total_count : " + total_count)
      // 상품목록 확인
      console.log("::::::::::: 전달받은 productPks 로 조회된 상품정보 리스트 ::::::::::")
      console.log(productList)
      console.log("-----------------------------------------------------------------")
      // 주문 데이터 등록
      console.log("order - [INSERT] - 주문 데이터 등록")
      const formData = new FormData()
      formData.append("user_pk", String(user_pk))
      formData.append("guest_mobile", guest_mobile)
      formData.append("title", title)
      formData.append("total_price", String(total_price))
      formData.append("total_quantity", String(total_quantity))
      formData.append("total_count", String(total_count))
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
        method: "POST",
        body: formData
      })
      const result = await commonServices.responseJson(response)
      const order_pk = result.data.order_pk

      for (let i = 0; i < productList.length; i++) {
        const product_pk = productList[i].product_pk
        const quantity = quantityList[i]
        const itemResult = orderItemsService.orderItemsCreate(product_pk, order_pk, quantity)
      }
      return result
    } catch (error) {
      throw error
    }
  },
  ordersRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders?` + new URLSearchParams({
        ...searchParams
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  ordersDetail: async (order_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${order_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  ordersUpdate: async (updatedOrderData: Order): Promise<ResponseApi> => {
    console.log(":::::::::: ordersServices.orderUpdate() ::::::::::")
    const order_pk = updatedOrderData.order_pk
    console.log("order_pk : " + order_pk)
    try {
      const formData = new FormData()
      if (updatedOrderData.user_pk !== undefined) formData.append("user_pk", String(updatedOrderData.user_pk))
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
      throw error
    }
  },
  ordersDelete: async (order_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${order_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  }
}