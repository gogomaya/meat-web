import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import TermsAndPolicyTabs from "./policy"


const TermsandPolicy = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <TermsAndPolicyTabs />
    </MainLayout>
  )
}

export default TermsandPolicy
