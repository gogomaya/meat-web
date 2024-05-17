"use client"

import {Button, Checkbox, Divider, IconButton, Typography, Dialog, DialogTitle, DialogActions} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Image from "next/image"
import {useState, useEffect} from "react"

export const CartsDetailContent = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [Posts, setPosts] = useState([
    {id: 1, src: "12.jpg", title: "첫 번째 상품", price: 69000, quantity: 1},
    {id: 2, src: "12.jpg", title: "두 번째 상품", price: 39000, quantity: 1},
    {id: 3, src: "12.jpg", title: "세 번째 상품", price: 49000, quantity: 1}
  ])
  const [totalAmount, setTotalAmount] = useState(calculateTotalAmount(Posts))
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const allIds = Posts.map((post) => post.id)
    setSelectedIds(allIds)
    calculateTotalAmount(Posts)
  }, [Posts])

  useEffect(() => {
    const selectedProductsData = Posts.filter((post) => selectedIds.includes(post.id))
    setSelectedProducts(selectedProductsData)
  }, [selectedIds, Posts])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
    updateTotalAmount(id, isChecked)
  }

  const updateTotalAmount = (id: number, isChecked: boolean) => {
    const post = Posts.find((post) => post.id === id)
    if (post) {
      const price = isChecked ? post.price : -post.price
      setTotalAmount(totalAmount + price)
    }
  }

  const handleDelete = (id: any) => {
    const updatedPosts = Posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    setTotalAmount(calculateTotalAmount(updatedPosts))
    updateTotalAmount(id, false)
  }

  const handleEmptyCart = () => {
    setPosts([])
    setTotalAmount(0)
    setOpen(false)
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newQuantity = parseInt(event.target.value)
    const updatedPosts = Posts.map((post) => ({
      ...post,
      quantity: post.id === id ? newQuantity : post.quantity
    }))
    setPosts(updatedPosts)
    setTotalAmount(calculateTotalAmount(updatedPosts))
  }

  function calculateTotalAmount(posts: any[]) {
    return posts.reduce((acc, post) => acc + post.price * post.quantity, 0)
  }

  return (
    <>
      <div className="flex flex-col py-4">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-4">
          <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      선택
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상품명
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가격
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      수량
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      삭제
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          onChange={(event) => handleCheckboxChange(event, post.id)}
                          checked={selectedIds.includes(post.id)}
                          style={{width: "20px", height: "20px"}}
                          className="rounded border-gray-300 focus:ring-indigo-500 h-4 w-4 text-indigo-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{post.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image
                              src={`/images/${post.src}`}
                              alt="상품 이미지"
                              width={48}
                              height={48}
                              className="rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <Typography variant="body1" gutterBottom>{post.title}</Typography>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Typography variant="body1" gutterBottom>{(post.price * post.quantity).toLocaleString()}원</Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={post.quantity}
                            onChange={(event) => handleQuantityChange(event, post.id)}
                            className="w-16 p-1 border border-gray-300 rounded-md text-center"
                            min="1"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <IconButton onClick={() => handleDelete(post.id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Divider className="my-4" sx={{border: "1px solid secondary"}} />
        <div className="flex flex-col items-end space-y-4">
          <Typography variant="h5" gutterBottom>
            총금액: {totalAmount.toLocaleString()}원
          </Typography>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
        <Button
          variant="contained"
          color="secondary"
          className="btn"
          onClick={() => {
            console.log(selectedProducts)
          }}
        >
          선택상품만 결제하기
        </Button>
        <div>
          <Button variant="contained" color="secondary" className="btn" onClick={handleOpenDialog}>
            장바구니 비우기
          </Button>
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"정말 장바구니를 비우시겠습니까?"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                아니오
              </Button>
              <Button onClick={handleEmptyCart} color="secondary" autoFocus>
                네
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-4 py-3">
        <Button variant="contained" color="primary" className="btn">
          바로구매
        </Button>
      </div>
    </>
  )
}