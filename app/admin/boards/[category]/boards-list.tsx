"use client"
import {useEffect, useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import Link from "next/link"
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import {IconButton, InputBase, Button} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {EnhancedTabledHead, EnhancedTablePagination} from "@/components/common/Table"
import {SearchParams} from "@/types/commonTypes"
import {Board} from "@/types/boardsTypes"
import moment from "moment"

const AdminBoardsList = ({
  boards,
  total_rows,
  searchParams
}: {
  boards: Board[]
  total_rows: number
  searchParams: SearchParams
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.query)
  useEffect(() => {
    setQuery(searchParams.query)
  }, [searchParams.query])
  return (
    <div>
      <form
        className="mb-4 flex justify-between"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("?query=" + query)
        }}
      >
        <Paper className="flex-1 flex">
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
                {id: "board_pk", label: "No", sort: true},
                {id: "title", label: "제목", sort: true},
                {id: "created_at", label: "작성시간", sort: true}
              ]}
            />
            <TableBody>
              {boards.map((board) => (
                <TableRow key={board.board_pk}>
                  <TableCell>{board.board_pk}</TableCell>
                  <TableCell>
                    <Link href={`${pathname}/detail/${board.board_pk}`}>{board.title}</Link>
                  </TableCell>
                  <TableCell>{moment(board.created_at).format("YYYY-MM-DD")}</TableCell>
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
              {boards.map((board) => (
                <TableRow key={board.board_pk}>
                  <TableCell>
                    <Link href={`${pathname}/detail/${board.board_pk}`}>{board.title}</Link>
                    <small className="text-xs text-gray-400">
                      {moment(board.created_at).format("YYYY-MM-DD")}
                    </small>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EnhancedTablePagination total_rows={total_rows} searchParams={searchParams} />
        </TableContainer>
      </Paper>
      <div className="text-right">
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

export default AdminBoardsList
