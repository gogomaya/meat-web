import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"

const BoardsCreate = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="mx-4">
        <h2>게시판 글쓰기</h2>
      </div>
    </MainLayout>
  )
}

export default BoardsCreate
