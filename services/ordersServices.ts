import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"
import {OrderSearchParams} from "@/types/ordersTypes"
import {Product} from "@/types/productsTypes"
import {productsServices} from "./productsServices"
import {orderItemsService} from "./orderItemsServices"

export const ordersServices = {
  orderCreate: async (user_pk: number, guest_mobile: string, productPks: number[], quantityList: number[]): Promise<ResponseApi> => {
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
          if( i == 0 ) {
            title = `${product.name} 외 ${productPks.length} 건`
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
      formData.append("user_pk", user_pk.toString())
      formData.append("guest_mobile", guest_mobile)
      formData.append("title", title)
      formData.append("total_price", total_price.toString())
      formData.append("total_quantity", total_quantity.toString())
      formData.append("total_count", total_count.toString())
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
  }
}