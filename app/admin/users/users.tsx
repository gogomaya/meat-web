"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import {IconButton, InputBase, Button} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {EnhancedTabledHead, EnhancedTablePagination} from "@/components/common/Table"
import {User} from "@/types/usersTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {usersServices} from "@/services/usersServices"
import {backdrop} from "@/components/common/Backdrop"
import {toastError} from "@/components/common/Toast"
import moment from "moment"

const AdminUsersList = ({
  users,
  total_rows,
  searchParams
}: {
  users: User[]
  total_rows: number
  searchParams: SearchParams
}) => {
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.query)
  const usersDelete = async (user: User) => {
    if (!window.confirm(`${user.name} 회원을 삭제 하시겠습니까?`)) return
    backdrop.open()
    const response: ResponseApi = await usersServices.usersDelete(user.user_pk)
    if (response.error) {
      toastError(response.error)
    } else {
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
          <IconButton type="button" sx={{p: "10px"}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <Paper>
        <TableContainer>
          <Table>
            <EnhancedTabledHead
              searchParams={searchParams}
              headCells={[
                {id: "user_pk", label: "No", sort: true},
                {id: "name", label: "이름", sort: true},
                {id: "third_party", label: "서드 파티", sort: true},
                {id: "created_at", label: "가입일", sort: true},
                {id: "delete", label: "삭제", sort: false}
              ]}
            />
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_pk}>
                  <TableCell>{user.user_pk}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.third_party}</TableCell>
                  <TableCell>{moment(user.created_at).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>
                    <Button
                      className="!bg-[#d32f2f] hover:!bg-[#d32f2f]/[.4]"
                      variant="contained"
                      onClick={() => usersDelete(user)}
                    >삭제</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EnhancedTablePagination total_rows={total_rows} searchParams={searchParams} />
        </TableContainer>
      </Paper>
    </div>
  )
}

export default AdminUsersList
