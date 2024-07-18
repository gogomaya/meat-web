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
  useEffect(() => {
    setQuery(searchParams.query)
  }, [searchParams.query])
  return (
    <div>
      <form
        className="mb-4 flex justify-between"
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
              {categoriesMenu[category].map((menu, index) => (
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
                {id: "order", label: "순서변경", sort: true}
              ]}
            />
            <TableBody>
              {products.map((product) => (
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
                    <ArrowCircleUpIcon/>
                    <ArrowCircleDownIcon/>
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
              {products.map((product) => (
                <TableRow key={product.product_pk}>
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
                  <TableCell>{(product.price).toLocaleString()}원</TableCell>
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
