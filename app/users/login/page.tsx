import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {GeneralPagination} from "@/app/reviews/reviews"

const Login = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <h1 className="flex justify-center">
        <strong>로그인</strong>
      </h1>
      <p className="flex justify-center">카카오로 1초만에 로그인해보세요</p>
      <button>카카오 로그인</button>
      <GeneralPagination />
    </MainLayout>
  )
}

export default Login
