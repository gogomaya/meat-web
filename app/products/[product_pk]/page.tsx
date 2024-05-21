import React, {useState} from "react"
import {loginCheck} from "@/app/admin/page"
import Divider from "@mui/material/Divider"
import {ProductDetail, ProductsDetailContent, ShipDetail, NavDetail} from "../products"
import {productsServices} from "@/services/productsServices"
import MainLayout from "@/app/main-layout"
import {GeneralReview} from "@/app/reviews/reviews"
import {ResponseApi} from "@/types/commonTypes"
import {BoardsList} from "@/app/boards/boards"
// import Boards from "@/app/boards/page"

const Products = async (props: {
  params: {product_pk: number}
}) => {
  const {user} = await loginCheck(false)
  const productResponse: ResponseApi = await productsServices.productsDetail(props.params.product_pk)
  const {product} = productResponse.data
  return (
    <MainLayout user={user}>
      <div className="py-6"></div>
      <div className="py-8">
        <ProductsDetailContent product={product} />
        <Divider id="divider" className="my-3" />
        <NavDetail />
        {/* 상품 상세 정보 */}
        <div id="detail"><ProductDetail product={product} /></div>
        {/* 리뷰 */}
        <div id="review2">
          {/* <GeneralReview {{title, content, likes, rating}}/> */}
          <GeneralReview title="" content="" likes={0} rating={0} />
        </div>
        {/* 문의 */}
        <div id="qna">
          <BoardsList />
        </div>
        {/* 주문정보 */}
        <div id="ship"><ShipDetail /></div>
      </div>
    </MainLayout>
  )
}

export default Products
