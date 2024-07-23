import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {FaqSection} from "./faq"


const FAQ = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <FaqSection />
    </MainLayout>
  )
}

export default FAQ
