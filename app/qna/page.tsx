import {loginCheck} from "../users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {QnaBoards} from "./qna"


const Qna = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      {/* <QnaBoards /> */}
      <div></div>
    </MainLayout>
  )
}

export default Qna
