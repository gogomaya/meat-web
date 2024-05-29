import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"

const BoardsCreate = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="mx-4">
        <div>게시판 글쓰기</div>
      </div>
    </MainLayout>
  )
}

export default BoardsCreate
