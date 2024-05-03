"use client"
import {useRouter} from "next/navigation"
import {TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from "@mui/material"
import {SearchParams} from "@/types/commonTypes"

interface HeadCell {
  id: string
  label: string
  sort: boolean
}

export const EnhancedTabledHead = ({
  searchParams,
  headCells
}: {
  searchParams: SearchParams
  headCells: HeadCell[]
}) => {
  const router = useRouter()
  const orderDirection = searchParams.orderDirection === "asc" ? "asc" : "desc"
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>
            {headCell.sort ? (
              <TableSortLabel
                active={searchParams.orderColumn === headCell.id}
                direction={searchParams.orderColumn === headCell.id ? orderDirection : "asc"}
                onClick={() => {
                  router.push("?" + new URLSearchParams({
                    ...searchParams,
                    orderColumn: headCell.id,
                    orderDirection: headCell.id && orderDirection === "asc" ? "desc" : "asc"
                  }))
                }}
              >{headCell.label}</TableSortLabel>
            ) : (
              <span>{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const EnhancedTablePagination = ({
  total_rows,
  searchParams
}: {
  total_rows: number
  searchParams: SearchParams
}) => {
  const router = useRouter()
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={total_rows}
      rowsPerPage={searchParams.rowsPerPage}
      page={searchParams.page}
      onPageChange={(_event, page) => {
        router.push("?" + new URLSearchParams({
          ...searchParams,
          page: String(page)
        }))
      }}
      onRowsPerPageChange={(event) => {
        router.push("?" + new URLSearchParams({
          ...searchParams,
          page: "0",
          rowsPerPage: event.target.value
        }))
      }}
    />
  )
}
