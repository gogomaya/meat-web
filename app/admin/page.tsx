import {loginCheck} from "@/app/users/login/loginCheck"
import {redirect} from "next/navigation"
import ErrorPage from "@/app/error"

const Admin = async () => {
  const {user} = await loginCheck(false)
  if (user.is_admin) {
    redirect("/admin/users")
  } else {
    return <ErrorPage message="관리자만 접근 가능합니다." />
  }
}

export default Admin
