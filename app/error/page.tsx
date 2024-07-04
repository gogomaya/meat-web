import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import Section404 from "./404"


const Page404 = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <Section404 />
    </MainLayout>
  )
}

export default Page404
