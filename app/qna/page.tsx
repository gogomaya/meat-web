import {loginCheck} from "../users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {QnaBoard} from "./qna"


const Qna = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <QnaBoard />
    </MainLayout>
  )
}

export default Qna
