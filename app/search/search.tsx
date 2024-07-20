"use client"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, Typography} from "@mui/material"
import * as React from "react"
import {CartProduct, Product} from "@/types/productsTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import _ from "lodash"
import {EnhancedTablePagination} from "@/components/common/Table"



export const ProductsPagination = ({searchParams, total_rows}: {searchParams: SearchParams, total_rows: number}) => {
  const router = useRouter()
  return (
    <Pagination
      variant="outlined"
      color="primary"
      showFirstButton
      showLastButton
      shape="rounded"
      count={Math.ceil(total_rows / searchParams.rowsPerPage)}
      page={searchParams.page + 1}
      className="flex justify-center py-8"
      onChange={(_, value) => {
        router.push("?" + new URLSearchParams({
          ...searchParams,
          page: String(value - 1)
        }))
      }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black"
              }
            }
          }}
        />
      )}
    />
  )
}

export const ProductsSearchList = ({
  products,
  total_rows,
  searchParams
}: {
  products: Product[]
  total_rows: number
  searchParams: SearchParams

}) => {
  React.useEffect(() => {
    const items = document.querySelectorAll(".product-item") as NodeListOf<HTMLElement>
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 100)
    })
  }, [products])

  return (
    <><section className="flex justify-between items-center py-4 rounded-lg">
      <div className="container text-lg font-semibold">
        상품이 모두 <strong>{products.length}</strong>개 있습니다.
      </div>
    </section>
    <ol className="product-list-mobile" style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
      {products.length > 0 ? (
        products.map((product) => (
          <li
            key={product.product_pk}
            className="product-item"
            style={{
              padding: "10px",
              width: "calc(25% - 25px)",
              borderRadius: "5px",
              border: "2px solid #271A11",
              transition: "transform 0.3s, opacity 0.3s",
              transform: "translateY(20px)"
            }}
          >
            <Link
              href={`/products/${product.product_pk}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
            >
              <Image
                src={`/upload-images/products/${product.image_file_name}`}
                alt={product.name}
                width={0}
                height={0}
                priority
                sizes="100vw"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "10px",
                  transform: "scale(1)",
                  transition: "transform 0.3s",
                  opacity: product.is_sold_out ? 0.3 : 1
                }} />
              {product.is_sold_out ? (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#ff0000"
                  }}
                >
                  Sold out
                </span>
              ) : null}
            </Link>
            <p className="py-4" style={{textAlign: "left", margin: "10px 0", fontSize: "1rem"}}>
              <Link href={`/products/${product.product_pk}`} style={{color: "#333", textDecoration: "none"}}>
                {product.name}
              </Link>
              <br />
              <strong style={{color: "#000", fontSize: "1.1rem"}}>{product.discounted_price.toLocaleString()}원</strong>
            </p>
            <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
              {product.etc && (
                <button
                  className="product-button hidden md:block"
                  style={{
                    padding: "5px 8px",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "0.8rem"
                  }}
                >
                  {product.etc}
                </button>
              )}
              <button
                className="product-button hidden md:block"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#A51C30",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
                진공포장
              </button>
              <button
                className="product-button hidden md:block"
                style={{
                  padding: "5px 8px",
                  backgroundColor: "#FACC15",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.8rem"
                }}
              >
                택배배송
              </button>
            </div>
          </li>
        ))
      ) : (
        <div style={{width: "100%", textAlign: "center", padding: "20px"}}>
          상품을 준비중입니다.
        </div>
      )}
    </ol>
    <ProductsPagination total_rows={total_rows} searchParams={searchParams} /></>
  )
}

