import React, {useState} from "react"
import {loginCheck} from "@/app/admin/page"
import Divider from "@mui/material/Divider"
import {ProductDetail, ProductsDetailContent, ShipDetail, NavDetail} from "../products"
import {productsServices} from "@/services/productsServices"
import MainLayout from "@/app/main-layout"
import {GeneralReview, PhotoReview} from "@/app/reviews/reviews"
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
        <NavDetail />
        {/* 상품 상세 정보 */}
        <div id="detail" className="mx-16 px-2"><ProductDetail product={product} /></div>
        {/* 리뷰 */}
        <div id="review2" className="mx-16 px-2">
          {/* <GeneralReview {{title, content, likes, rating}}/> */}
          <PhotoReview />
          {/* <GeneralReview title="" content="" likes={0} rating={0} /> */}
        </div>
        <Divider className="mx-16 px-2" style={{backgroundColor: "#4A4A4A", height: "3px", marginBottom: "1rem"}} />
        {/* 문의 */}
        <div id="qna" className="mx-16 px-2">
          <BoardsList />
        </div>
        {/* 주문정보 */}
        <div id="ship" className="mx-16 p-2"><ShipDetail /></div>
      </div>
    </MainLayout>
  )
}

export default Products
