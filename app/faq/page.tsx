import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import FAQPage, {FaqSection} from "./faq"


const FAQ = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      {/* <FAQPage /> */}
      <FaqSection />
    </MainLayout>
  )
}

export default FAQ
