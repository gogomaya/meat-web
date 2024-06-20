import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import TermsAndPolicyTabs from "./policy"


const TermsandPolicy = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="container">
        <div className="p-8 flex justify-center text-4xl"><strong>한솔 정책</strong></div>
        <TermsAndPolicyTabs />
      </div>
    </MainLayout>
  )
}

export default TermsandPolicy
