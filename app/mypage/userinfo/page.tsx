import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "../mypage"
import {UserInfoForm} from "./userinfo"
import {ResponseApi} from "@/types/commonTypes"
import ErrorPage from "@/app/error"
import {usersServices} from "@/services/usersServices"
import {User} from "@/types/usersTypes"
import {myPageData} from "../mypageData"

const MypageUserInfo = async () => {
  const {user} = await loginCheck(true)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)
  console.dir(user)
  const user_pk = user.user_pk
  let userResponse: ResponseApi = {}
  let userInfo: User = {
    user_pk: 0,
    id: "",
    name: "",
    nickname: "",
    mobile: "",
    third_party: "Naver"
  }
  try {
    userResponse = await usersServices.usersDetail(user_pk)
    console.dir(userResponse)
    userInfo = userResponse.data.user
    console.log(userInfo)
    console.dir(userInfo)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="User Information" subTitle="회원정보 수정" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <UserInfoForm userInfo={userInfo}/>
        </div>
      </div>
    </MainLayout>
  )
}

export default MypageUserInfo
