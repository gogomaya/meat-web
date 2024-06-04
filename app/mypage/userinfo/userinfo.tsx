"use client"

import {usersServices} from "@/services/usersServices"
import {ResponseApi} from "@/types/commonTypes"
import {User} from "@/types/usersTypes"
import Image from "next/image"
import {useState} from "react"
import {useRouter} from "next/navigation"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface UserInfoProps {
  userInfo: User
}

// 회원 정보 폼
export const UserInfoForm = ({userInfo}: UserInfoProps ) => {

  const [name, setName] = useState(userInfo.name || "")
  const [mobile, setMobile] = useState(userInfo.mobile || "")

  let social = ""
  switch (userInfo.third_party) {
  case "Kakao":
    social="카카오"
    break
  case "Naver":
    social="네이버"
    break
  }
  // userInfo.created_at 값을 변수에 저장합니다.
  const createdAt = userInfo.created_at
  // 2024.01.01 포맷으로 변환합니다.
  const joinDate = new Date(createdAt+ "").toISOString().slice(0, 10)

  const router = useRouter()

  // [수정하기] 클릭
  const handelUpdate = async () => {
    console.log("회원정보 수정하기 클릭")
    let updatedUser: User = {
      user_pk: userInfo.user_pk || 0,
      id: userInfo.id || "",
      name: name || "",
      nickname: userInfo.nickname || "",
      mobile: mobile || "",
      third_party: userInfo.third_party || "Naver"
    }

    if( name == "" || mobile == "" ) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">회원정보 수정 확인</p>,
        text: "이름과 전화번호를 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }
    const userUpdateResult: ResponseApi = await usersServices.usersUpdate(updatedUser)

    if(userUpdateResult.data.status == 200) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">회원정보 수정 완료</p>,
        text: "회원정보 수정을 완료하였습니다.",
        confirmButtonText: "확인"
      })
      router.refresh()
      router.push("/mypage/userinfo")
    }
  }
  // [회원탈퇴] 클릭
  const handelDelete = async () => {
    console.log("회원탈퇴 클릭")
    const user_pk = userInfo.user_pk

    if( user_pk ) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">회원 탈퇴 확인</p>,
        text: "회원 탈퇴 시, 저장된 회원 정보가 모두 사라집니다.",
        icon: "error",
        confirmButtonText: "회원 탈퇴",
        cancelButtonText: "취소",
        showCancelButton: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const userDeleteResult: ResponseApi = await usersServices.usersDelete(user_pk)
            console.log("##################################################")
            console.log(userDeleteResult.error)
            if(!userDeleteResult.error || userDeleteResult.error.status != 500) {
              const MySwal = withReactContent(Swal)
              MySwal.fire({
                title: <p className="text-xl">회원탈퇴 완료</p>,
                text: "그동안 이용해주셔서 감사합니다.",
                confirmButtonText: "확인"
              }).then(async (end) => {
                await usersServices.usersLogout()
                router.refresh()
                router.push("/")
              })
            } else if(userDeleteResult.error.message.includes("관리자")) {
              const MySwal = withReactContent(Swal)
              MySwal.fire({
                title: <p className="text-xl">관리자 회원</p>,
                text: userDeleteResult.error.message,
                confirmButtonText: "확인"
              })
              return
            }

          } catch (error) {
            alert(error)
          }
        } else if (result.isDismissed) {
          Swal.fire("회원탈퇴 취소", "계속 한솔축산을 이용해주셔서 감사합니다. ^^", "info")
        }
      })
    }
    else {
      return
    }

  }
  return (
    <div className="container mx-auto bg-white p-4 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="py-16">
        <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
          <div>
            <h1 className="text-3xl font-extrabold">회원정보 수정</h1>
            <p className="text-sm text-gray-400 mt-3"></p>
            <div className="mt-12">
              <div className="text-lg font-extrabold">소셜 계정</div>
              <ul className="mt-3">
                <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    {
                      userInfo.third_party == "Kakao"
                        ?
                        <Image
                          src="/images/kakao.png"
                          alt=""
                          width={40}
                          height={40}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                        :
                        <Image
                          src="/images/naver.png"
                          alt=""
                          width={40}
                          height={40}
                          sizes="100vw"
                          className="md:w-16"
                          priority
                        />
                    }
                  </div>
                  <div className="text-[#A51C3] text-sm ml-3">
                    {/* 카카오 or 네이버 */}
                    <small className="block">{social}</small>
                    <strong>{userInfo.nickname}</strong>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <div className="text-lg font-extrabold">가입일자</div>
              <span>{joinDate}</span>
            </div>
          </div>
          <form className="ml-auo space-y-4">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="전화번호 (010-0000-0000)" className="w-full rounded-md py-2.5 px-4 border outline-[#007bff]" />
            <button type="button" onClick={() => handelUpdate()} className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-full">
              <span className="text-lg font-normal">수정하기</span>
            </button>
            <button type="button" onClick={() => handelDelete()} style={{border : "2px solid #A51C30 !important"}} className="w-full px-4 py-2 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
              회원탈퇴
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
