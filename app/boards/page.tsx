"use client"

import MainLayout from "@/app/main-layout"
import {GeneralPagination} from "../reviews/reviews"

import {useState} from "react"


const Posts = [
  {id: 1, title: "첫 번째 게시물", content: "첫번째 배송문의입니다.", writer: "작성자1", date: "2024-04-04"},
  {id: 2, title: "두 번째 게시물", content: "두번째 배송문의입니다.", writer: "작성자2", date: "2024-04-04"},
  {id: 3, title: "세 번째 게시물", content: "세번째 배송문의입니다.", writer: "작성자3", date: "2024-04-04"}
]

const Boards = () => {
  const [posts] = useState(Posts)

  return (
    <MainLayout>
      <div className="flex flex-col py-1">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-1">
          <div className="py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    번호
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    답변 여부
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성자
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성 일자
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{post.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">완료</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.writer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <GeneralPagination />
    </MainLayout>
  )
}

export default Boards
