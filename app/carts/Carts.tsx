"use client"

import {ChangeEvent, useState} from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {Divider, Typography} from "@mui/material"
import Image from "next/image"

export const CartsDetailContent = () => {
  const [selectedIds, setSelectedIds] = useState([])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, id: any) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
  }

  const handleDelete = (id: any) => {
    const updatedPosts = Posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
  }

  const handleEmptyCart = () => {
    setPosts([])
  }

  const PostTemplate = ({post}) => {
    const [quantity, setQuantity] = useState(post.quantity)
    const [calculatedPrice, setCalculatedPrice] = useState(post.price * post.quantity)

    const handleQuantityChange = (event: { target: { value: string; }; }) => {
      const newQuantity = parseInt(event.target.value)
      setQuantity(newQuantity)
      setCalculatedPrice(post.price * newQuantity)
    }

    return (
      <tr key={post.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            onChange={(event) => handleCheckboxChange(event, post.id)}
            checked={selectedIds.includes(post.id)}
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
          <Typography variant="body1" gutterBottom>{calculatedPrice}원</Typography>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
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
    )
  }

  const [Posts, setPosts] = useState([
    {id: 1, src: "12.jpg", title: "첫 번째 상품", price: 69000, quantity: 1},
    {id: 2, src: "12.jpg", title: "두 번째 상품", price: 39000, quantity: 1},
    {id: 3, src: "12.jpg", title: "세 번째 상품", price: 49000, quantity: 1}
  ])

  return (
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
                  <PostTemplate key={post.id} post={post} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Divider className="my-4" sx={{border: "1px solid secondary"}} />
      <div className="flex flex-col items-end space-y-4">
        <Typography variant="h5" gutterBottom>
          총금액: {Posts.reduce((acc, post) => acc + post.price * post.quantity, 0)}원
        </Typography>
      </div>
    </div>
  )
}