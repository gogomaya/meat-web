import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import FAQPage from "./faq"


const FAQ = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <FAQPage />
    </MainLayout>
  )
}

export default FAQ
