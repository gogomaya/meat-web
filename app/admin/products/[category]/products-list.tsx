"use client"
import {useEffect, useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import {IconButton, InputBase, Button} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {EnhancedTabledHead, EnhancedTablePagination} from "@/components/common/Table"
import {ProductCategory, Product, ProductsSearchParams} from "@/types/productsTypes"
import {commonServices} from "@/services/commonServices"
import moment from "moment"
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp"
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown"
import {backdrop} from "@/components/common/Backdrop"
import {toastError} from "@/components/common/Toast"
import {ResponseApi} from "@/types/commonTypes"
import {productsServices} from "@/services/productsServices"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

const AdminProductsList = ({
  products,
  total_rows,
  category,
  searchParams
}: {
  products: Product[]
  total_rows: number
  category: ProductCategory
  searchParams: ProductsSearchParams
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [category_menu, set_category_menu] = useState(searchParams.category_menu)
  const [query, setQuery] = useState(searchParams.query)
  const categoriesMenu = commonServices.categoriesMenu()
  const [newproducts, setNewProducts] = useState(products)
  const [open, setOpen] = useState(false)

  // 상품순서 화살표 변경 : product_pk 에다 index add를 해야함
  // const orderChange = (index: number, add: number) => {
  //   const currentProduct = newproducts.splice(index, 1)
  //   newproducts.splice(index + add, 0, currentProduct[0])
  //   setNewProducts([...newproducts])
  // }
  const orderChange = (index: number, add: number) => {
    const currentProduct = newproducts.splice(index, 1)
    // 1. product_order = product_pk
    // newproducts에서 product_order 꺼내서 index와 매치
    newproducts.splice(index + add, 0, currentProduct[0])
    setNewProducts([...newproducts])
  }
  // 상품순서 최종확인
  const productsOrder = async () => {
    if (!window.confirm("상품 순서를 변경 하시겠습니까?")) return
    backdrop.open()
    const sortedProductPKs = newproducts.map((product) => product.product_pk).sort((a, b) => b - a)
    // newproducts 내 product_pk에 따라 product_order를 설정
    const productsOrder = newproducts.map((product, i) => ({
      product_pk: product.product_pk,
      product_order: sortedProductPKs[i]
    }))
    const response: ResponseApi = await productsServices.productsOrder(productsOrder)

    if (response.error) {
      toastError(response.error)
    } else {
      setOpen(false)
      router.refresh()
    }
    backdrop.close()
  }
  useEffect(() => {
    setQuery(searchParams.query)
  }, [searchParams.query])
  return (
    <div>
      <form
        className="mb-4 flex justify-between gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(`?query=${query}&category_menu=${category_menu}`)
        }}
      >
        <Paper className="p-1">
          <FormControl variant="standard">
            <Select
              displayEmpty
              value={category_menu}
              onChange={(event) => set_category_menu(event.target.value)}
            >
              <MenuItem value="">전체</MenuItem>
              {categoriesMenu[category]?.map((menu, index) => (
                <MenuItem key={index} value={menu}>{menu}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper className="ml-2 flex flex-1">
          <InputBase
            sx={{ml: 1, flex: 1}}
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <IconButton type="submit" sx={{p: "10px"}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          sx={{
            backgroundColor: "#f57c00",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#e64a19"
            },
            padding: "8px 16px",
            borderRadius: "4px",
            textTransform: "none"
          }}
          variant="contained"
          onClick={productsOrder}
        >
          순서변경
        </Button>
      </form>
      <Paper className="hidden md:block">
        <TableContainer>
          <Table>
            <EnhancedTabledHead
              searchParams={searchParams}
              headCells={[
                {id: "product_pk", label: "No", sort: true},
                {id: "name", label: "이름", sort: true},
                {id: "category_menu", label: "메뉴", sort: false},
                {id: "price", label: "금액", sort: true},
                {id: "created_at", label: "작성시간", sort: true},
                {id: "order", label: "노출순서", sort: true}
              ]}
            />
            <TableBody>
              {newproducts.map((product, index) => (
                <TableRow key={product.product_pk}>
                  <TableCell>{product.product_pk}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Link href={`${pathname}/detail/${product.product_pk}`}>
                        <Image
                          src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(product.image_file_name))}`}
                          alt={product.name}
                          width={0}
                          height={0}
                          priority
                          sizes="100vw"
                          className="w-[64px]"
                        />
                      </Link>
                      <Link className="ml-4" href={`${pathname}/detail/${product.product_pk}`}>{product.name}</Link>
                    </div>
                  </TableCell>
                  <TableCell>{product.category_menu}</TableCell>
                  <TableCell>{(product.price).toLocaleString()}원</TableCell>
                  <TableCell>{moment(product.created_at).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>
                    <ArrowCircleUpIcon
                      className={`${index === 0 ? "text-black/20" : "cursor-pointer"}`}
                      onClick={() => {
                        if (index === 0) return
                        orderChange(index, -1)
                      }}
                    />
                    <ArrowCircleDownIcon
                      className={`ml-1 ${index === newproducts.length - 1 ? "text-black/20" : "cursor-pointer"}`}
                      onClick={() => {
                        if (index === newproducts.length - 1) return
                        orderChange(index, 1)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EnhancedTablePagination total_rows={total_rows} searchParams={searchParams} />
        </TableContainer>
      </Paper>
      <Paper className="md:hidden">
        <TableContainer>
          <Table>
            <TableBody>
              {newproducts.filter((product) => product !== undefined).map((product, index) => (
                <TableRow key={product.product_pk}>
                  <TableCell>{product.product_pk}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Link href={`${pathname}/detail/${product.product_pk}`}>
                        <Image
                          src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(product.image_file_name))}`}
                          alt={product.name}
                          width={0}
                          height={0}
                          priority
                          sizes="100vw"
                          className="w-[64px]"
                        />
                      </Link>
                      <Link className="ml-4" href={`${pathname}/detail/${product.product_pk}`}>{product.name}</Link>
                    </div>
                  </TableCell>
                  <TableCell>{product.category_menu}</TableCell>
                  <TableCell>{(product.price).toLocaleString()}원</TableCell>
                  <TableCell>{moment(product.created_at).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>
                    <ArrowCircleUpIcon
                      className={`${index === 0 ? "text-black/20" : "cursor-pointer"}`}
                      onClick={() => {
                        if (index === 0) return
                        orderChange(product.product_pk, -1)
                      }}
                    />
                    <ArrowCircleDownIcon
                      className={`ml-1 ${index === newproducts.length - 1 ? "text-black/20" : "cursor-pointer"}`}
                      onClick={() => {
                        if (index === newproducts.length - 1) return
                        orderChange(product.product_pk, 1)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EnhancedTablePagination total_rows={total_rows} searchParams={searchParams} />
        </TableContainer>
      </Paper>
      <div className="text-left">
        <Button
          className="!mt-4 !bg-[#1976d2] hover:!bg-[#1565c0]"
          variant="contained"
          type="button"
          onClick={() => router.push(`${pathname}/create`)}
        >등록</Button>
      </div>
    </div>
  )
}

export default AdminProductsList
