import React, {useState} from "react"
import Divider from "@mui/material/Divider"
import {ProductDetail, ProductsDetailContent, ShipDetail, NavDetail} from "../products"
import MainLayout from "@/app/main-layout"
import {usersServices} from "@/services/usersServices"

const Products = async () => {
  const user = await usersServices.loginCheck(false)
  return (
    <MainLayout user={user}>
      <ProductsDetailContent />
      <Divider id="divider" className="my-3" />
      <NavDetail />
      {/* 상품 상세 정보 */}
      <div id="detail"><ProductDetail /></div>
      {/* 리뷰 */}
      <div id="review" style={{backgroundColor: "#f0f1f1", height: "500px"}}>리뷰</div>
      {/* 문의 */}
      <div id="qna" style={{backgroundColor: "#f0f0a0", height: "500px"}}>문의</div>
      {/* 주문정보 */}
      <div id="ship"><ShipDetail /></div>
    </MainLayout>
  )
}

export default Products
