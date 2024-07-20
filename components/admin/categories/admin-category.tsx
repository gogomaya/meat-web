"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import {Button, TextField} from "@mui/material"
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp"
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown"
import {ResponseApi} from "@/types/commonTypes"
import {Category} from "@/types/categoryTypes"
import {categoriesServices} from "@/services/categoriesServices"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {backdrop} from "@/components/common/Backdrop"
import {toastError, toastSuccess} from "@/components/common/Toast"

const AdminCategories = (props: {categories: Category[]}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([...props.categories])
  const brandForm = useForm<Category>({
    resolver: yupResolver(yup.object().shape({
      category_pk: yup.number().required().default(0),
      name: yup.string().required("이름을 입력해 주세요.").min(3, "이름은 최소 3자 이상입니다."),
      id: yup.string().required("URL 영문주소를 입력해 주세요.").min(3, "URL 영문주소는 최소 3자 이상입니다.")
        .matches(/^[a-z\-]+$/, "URL 영문주소 소문자와 -문자만 가능합니다.")
    }))
  })
  const {register, formState: {errors}} = brandForm
  const categoryForm = useForm<Category>({
    resolver: yupResolver(yup.object().shape({
      category_pk: yup.number().required().default(0),
      name: yup.string().required("이름을 입력해 주세요.").min(3, "이름은 최소 3자 이상입니다."),
      id: yup.string().required("URL 영문주소를 입력해 주세요.").min(3, "URL 영문주소는 최소 3자 이상입니다.")
        .matches(/^[a-z\-]+$/, "URL 영문주소 소문자와 -문자만 가능합니다.")
    }))
  })
  const orderChange = (index: number, add: number) => {
    const currentCategory = categories.splice(index, 1)
    categories.splice(index + add, 0, categories[0])
  }
  const categoryFormSubmit = categoryForm.handleSubmit(() => {})
  const categoriesCreate = async () => {
    const category = categoryForm.getValues()
    categoryForm.clearErrors()
    await categoryFormSubmit()
    if (Object.keys(categoryForm.formState.errors).length) return
    backdrop.open()
    const response: ResponseApi = await categoriesServices.categoriesCreate(category)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess("브랜드가 추가 되었습니다.")
      setOpen(false)
      categoryForm.reset()
      router.refresh()
    }
    backdrop.close()
  }
  const categoriesDelete = async (category: Category) => {
    if (!window.confirm(`${category.name} 브랜드를 삭제 하시겠습니까?`)) return
    backdrop.open()
    const response: ResponseApi = await categoriesServices.categoriesDelete(category.category_pk)
    if (response.error) {
      toastError(response.error)
    } else {
      router.refresh()
    }
    backdrop.close()
  }
  const categoriesOrder = async () => {
    if (!window.confirm("브랜드 순서를 변경 하시겠습니까?")) return
    backdrop.open()
    const response: ResponseApi = await categoriesServices.categoriesOrder(categories)
    if (response.error) {
      toastError(response.error)
    } else {
      setOpen(false)
      categoryForm.reset()
      router.refresh()
    }
    backdrop.close()
  }
  useEffect(() => {
    setCategories(props.categories)
  }, [props])
  return (
    <>
      <span>상품 메뉴</span>
      <PlaylistAddIcon
        className="ml-2 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={(event) => {
          event.preventDefault()
          categoriesCreate()
        }}>
          <DialogTitle>메뉴 편집</DialogTitle>
          <DialogContent>
            <div>
              <Paper className="p-4 mb-4 flex justify-between">
                <TextField
                  autoFocus
                  label="이름"
                  placeholder="한글명"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true
                  }}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
                <TextField
                  className="!ml-4"
                  label="URL 영문주소"
                  placeholder="영문명"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true
                  }}
                  {...register("id")}
                  error={!!errors.id}
                  helperText={errors.id && errors.id.message}
                />
                <Button
                  className="!ml-4 !bg-[#1976d2] hover:!bg-[#1565c0]"
                  variant="contained"
                  type="submit"
                >등록</Button>
              </Paper>
              <Paper className="p-4">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>URL 영문주소</TableCell>
                        <TableCell>
                          <Button
                            className="!bg-[#ed6c02] hover:!bg-[#e65100]"
                            variant="contained"
                            onClick={categoriesOrder}
                          >순서 변경</Button>
                        </TableCell>
                        <TableCell>삭제</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories.map((category, index) => (
                        <TableRow key={category.category_pk}>
                          <TableCell>{category.name}</TableCell>
                          <TableCell>{category.id}</TableCell>
                          <TableCell>
                            <ArrowCircleUpIcon
                              className={`${index === 0 ? "text-black/20" : "cursor-pointer"}`}
                              onClick={() => {
                                if (index === 0) return
                                orderChange(index, -1)
                              }}
                            />
                            <ArrowCircleDownIcon
                              className={`ml-1 ${index === categories.length - 1 ? "text-black/20" : "cursor-pointer"}`}
                              onClick={() => {
                                if (index === categories.length - 1) return
                                orderChange(index, 1)
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              className="!bg-[#d32f2f] hover:!bg-[#d32f2f]/[.4]"
                              variant="contained"
                              onClick={() => categoriesDelete(category)}
                            >삭제</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>닫기</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AdminCategories
