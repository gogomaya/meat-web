"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox, FormHelperText} from "@mui/material"
import {ResponseApi} from "@/types/commonTypes"
import {ProductCategory, Product} from "@/types/productsTypes"
import {commonServices} from "@/services/commonServices"
import {productsServices} from "@/services/productsServices"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {backdrop} from "@/components/common/Backdrop"
import {toastError, toastSuccess, toastWarning} from "@/components/common/Toast"
import {v4 as uuidv4} from "uuid"

let contentsEditor: any
const AdminProductsForm = ({
  product
}: {
  product: Product
}) => {
  const router = useRouter()
  const [uuid] = useState(uuidv4())
  const categoriesMenu = commonServices.categoriesMenu()
  const productForm = useForm<Product>({
    defaultValues: {
      ...product,
      price: product.price === 0 ? "" : product.price
    },
    resolver: yupResolver(yup.object().shape({
      product_pk: yup.number().required(),
      name: yup.string().required("상품명을 입력해 주세요.").min(3, "상품명은 최소 3자 이상입니다."),
      category: yup.mixed<ProductCategory>().required(),
      category_menu: yup.string().required("메뉴를 선택해 주세요."),
      price: yup.mixed<number | string>().required(),
      is_today: yup.boolean().default(product.is_today),
      is_best: yup.boolean().default(product.is_best),
      is_sold_out: yup.boolean().default(product.is_sold_out),
      contents: yup.string().default(product.contents)
    }))
  })
  const {register, formState: {errors}, control} = productForm
  const productFormSubmit = productForm.handleSubmit(() => {})
  const productsAction = async () => {
    const product = productForm.getValues()
    product.contents = contentsEditor.getData()
    productForm.clearErrors()
    await productFormSubmit()
    if (Object.keys(productForm.formState.errors).length) return
    if (product.image?.length === 0 && product.product_pk === 0) {
      toastWarning("메인 이미지를 선택해 주세요.")
      return
    }
    backdrop.open()
    const response: ResponseApi = await productsServices[
      product.product_pk === 0 ? "productsCreate" : "productsUpdate"
    ](product, uuid)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess(
        product.product_pk === 0 ? "상품이 등록 되었습니다." : "상품이 수정 되었습니다."
      )
      router.back()
      router.refresh()
    }
    backdrop.close()
  }
  const productsDelete = async () => {
    if (!window.confirm(`${product.name} 상품을 삭제 하시겠습니까?`)) return
    backdrop.open()
    const response: ResponseApi = await productsServices.productsDelete(product.product_pk)
    if (response.error) {
      toastError(response.error)
    } else {
      toastSuccess("상품이 삭제 되었습니다.")
      router.back()
      router.refresh()
    }
    backdrop.close()
  }
  useEffect(() => {
    const DecoupledEditor = require("@ckeditor/ckeditor5-build-decoupled-document")
    DecoupledEditor
      .create(document.querySelector("#editor"), {
        ckfinder: {
          uploadUrl: `/api/ckeditor5/upload-images?table=products&uuid=${uuid}`
        },
        mediaEmbed: {
          previewsInData: true
        }
      })
      .then((editor: any) => {
        const toolbarContainer: any = document.querySelector("#toolbar-container")
        toolbarContainer.appendChild(editor.ui.view.toolbar.element)
        contentsEditor = editor
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }, [uuid, product.product_pk])
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Paper className="p-4">
        <FormControl variant="standard" error={!!errors.category_menu}>
          <InputLabel shrink>메뉴</InputLabel>
          <Controller
            control={control}
            name="category_menu"
            render={({field}) => (
              <Select {...field}>
                {categoriesMenu[productForm.getValues("category")].map((menu, index) => (
                  <MenuItem key={index} value={menu}>{menu}</MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.category_menu && errors.category_menu.message && (
            <FormHelperText>{errors.category_menu.message}</FormHelperText>
          )}
        </FormControl>
        <TextField
          className="!mt-8"
          autoFocus
          label="* 이름"
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
          className="!mt-8"
          label="* 금액"
          placeholder="금액"
          fullWidth
          type="number"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price && errors.price.message}
        />
        <TextField
          className="!mt-8"
          label="간단한 설명"
          placeholder="간단한 설명"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("description")}
        />
        <TextField
          className="!mt-8"
          label="원산지"
          placeholder="원산지"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("origin")}
        />
        <TextField
          className="!mt-8"
          label="제품중량"
          placeholder="제품중량"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("weight")}
        />
        <TextField
          className="!mt-8"
          label="식품유형"
          placeholder="식품유형"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("type")}
        />
        <TextField
          className="!mt-8"
          label="부위"
          placeholder="부위"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("part")}
        />
        <TextField
          className="!mt-8"
          label="100g당"
          placeholder="100g당"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("per100g")}
        />
        <TextField
          className="!mt-8"
          label="등급"
          placeholder="등급"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("grade")}
        />
        <TextField
          className="!mt-8"
          label="포장방법"
          placeholder="포장방법"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          {...register("package")}
        />
        <TextField
          className="!mt-8"
          label="* 메인 이미지"
          type="file"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            accept: "image/*"
          }}
          {...register("image")}
        />
        <div className="mt-6 flex">
          <Controller
            control={control}
            name="is_today"
            render={({field}) => (
              <FormControlLabel control={
                <Checkbox {...field} checked={field.value} />
              } label="오늘의 메뉴" />
            )}
          />
          <Controller
            control={control}
            name="is_best"
            render={({field}) => (
              <FormControlLabel control={
                <Checkbox {...field} checked={field.value} />
              } label="메인 페이지 Best Menu" />
            )}
          />
          <Controller
            control={control}
            name="is_sold_out"
            render={({field}) => (
              <FormControlLabel control={
                <Checkbox {...field} checked={field.value} />
              } label="매진 유무" />
            )}
          />
        </div>
      </Paper>
      <Paper className="mt-4 p-4">
        <div id="toolbar-container"></div>
        <div
          id="editor"
          className="h-[800px] [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
          dangerouslySetInnerHTML={{__html: productForm.getValues("contents")}}
        ></div>
      </Paper>
      <div className="mt-4 flex justify-end">
        {product.product_pk === 0 ? (
          <Button
            className="!bg-[#1976d2] hover:!bg-[#1565c0]"
            variant="contained"
            onClick={() => productsAction()}
          >등록</Button>
        ) : (
          <>
            <Button
              className="!bg-[#d32f2f] hover:!bg-[#d32f2f]/[.4]"
              variant="contained"
              onClick={() => productsDelete()}
            >삭제</Button>
            <Button
              className="!ml-4 !bg-[#ed6c02] hover:!bg-[#e65100]"
              variant="contained"
              onClick={() => productsAction()}
            >수정</Button>
          </>
        )}
      </div>
    </form>
  )
}

export default AdminProductsForm
