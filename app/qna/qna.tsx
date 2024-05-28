"use client"
import {useState} from "react"

const Posts = [
  {id: 1, title: "첫 번째 문의", content: "첫번째 문의입니다.", writer: "작성자1", date: "2024-04-04", complete: "Y"},
  {id: 2, title: "두 번째 문의", content: "두번째 문의입니다.", writer: "작성자2", date: "2024-04-04", complete: "Y"},
  {id: 3, title: "세 번째 문의", content: "세번째 문의입니다.", writer: "작성자3", date: "2024-04-04", complete: "N"}
]

export const QnaBoard = () => {
  const [posts] = useState(Posts)
  return (
    <div className="flex flex-col py-4 mx-8 py-6">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  py-4">
        <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead style={{backgroundColor: "#271A11"}} className="text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    번호
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    제목
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    답변 여부
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    작성자
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    작성 일자
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="transition-all hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.complete === "Y" ? "bg-gray-900" : "bg-yellow-500"} text-white`}>
                        {post.complete === "Y" ? "완료" : "대기"}
                      </span>
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
  )
}
