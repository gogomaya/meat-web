import React, {useState} from "react"
import {loginCheck} from "@/app/admin/page"
import Divider from "@mui/material/Divider"
import {ProductDetail, ProductsDetailContent, ShipDetail, NavDetail} from "../products"
import MainLayout from "@/app/main-layout"
import {GeneralReview} from "@/app/reviews/reviews"
// import Boards from "@/app/boards/page"

const Products = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <ProductsDetailContent />
      <Divider id="divider" className="my-3" />
      <NavDetail />
      {/* 상품 상세 정보 */}
      <div id="detail"><ProductDetail /></div>
      {/* 리뷰 */}
      <div id="review2">
        <GeneralReview />
      </div>
      {/* 문의 */}
      <div id="qna">
        {/* <Boards /> */}
      </div>
      {/* 주문정보 */}
      <div id="ship"><ShipDetail /></div>
    </MainLayout>
  )
}

export default Products
