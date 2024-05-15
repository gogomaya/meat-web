"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import {Button} from "@mui/material"
import {Dialog, DialogContent, DialogActions} from "@mui/material"
import {v4 as uuidv4} from "uuid"
import {User} from "@/types/usersTypes"
import {usersServices} from "@/services/usersServices"

const Users = ({user}: {user: User}) => {
  const router = useRouter()
  const [open, setOpen] = useState("close")

  const [activeTab, setActiveTab] = useState("member")
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }
  return (
    <div>
      <Link href="" onClick={() => setOpen(user && user.user_pk ? "logout" : "login")}>
        <PersonOutlineIcon className="md:w-8 md:h-8" />
      </Link>
      <Dialog open={open === "login"} onClose={() => setOpen("close")} maxWidth="md" fullWidth>
        <DialogContent>
          <h2 className="flex justify-center"><strong>로그인</strong></h2>
          <div className="flex flex-col">
            <button style={{backgroundColor: "#4a5568", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease"}}>비회원 주문하기</button>
            <div className="flex py-3">
              <div style={{display: "flex", marginBottom: "20px"}}>
                <button
                  style={{
                    marginRight: "10px",
                    fontWeight: activeTab === "member" ? "bold" : "normal",
                    padding: "8px 16px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "4px 4px 0 0",
                    cursor: "pointer",
                    backgroundColor: activeTab === "member" ? "#fff" : "#EDF2F7",
                    color: activeTab === "member" ? "#000" : "#4A5568",
                    transition: "color 0.3s ease, background-color 0.3s ease"
                  }}
                  onClick={() => handleTabClick("member")}
                >
                  회원
                </button>
                <button
                  style={{
                    fontWeight: activeTab === "nonMember" ? "bold" : "normal",
                    padding: "8px 16px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "4px 4px 0 0",
                    cursor: "pointer",
                    backgroundColor: activeTab === "nonMember" ? "#fff" : "#EDF2F7",
                    color: activeTab === "nonMember" ? "#000" : "#4A5568",
                    transition: "color 0.3s ease, background-color 0.3s ease"
                  }}
                  onClick={() => handleTabClick("nonMember")}
                >
                  비회원 주문조회
                </button>
              </div>
              {activeTab === "member" && (
                <div>
                  <Button
                    onClick={() => {
                      let url = "https://nid.naver.com/oauth2.0/authorize"
                      url += `?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`
                      url += "&response_type=code"
                      url += `&redirect_uri=${document.location.origin}${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`
                      url += `&state=${uuidv4()}`
                      window.open(url, "_blank")
                      setOpen("close")
                    }}
                  >
                    <Image
                      src="/images/naver-login-btn.png"
                      alt="naver-login-btn"
                      width={200}
                      height={100}
                      sizes="100vw"
                      priority
                    />
                  </Button>
                  <br />
                  <Button
                    onClick={() => {
                      let url = "https://kauth.kakao.com/oauth/authorize"
                      url += `?client_id=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}`
                      url += "&response_type=code"
                      url += `&redirect_uri=${document.location.origin}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`
                      url += `&state=${uuidv4()}`
                      // url += `&scope=name,phone_number`
                      window.open(url, "_blank")
                      setOpen("close")
                    }}
                  >
                    <Image
                      src="/images/kakao-login-btn.png"
                      alt="naver-login-btn"
                      width={200}
                      height={100}
                      sizes="100vw"
                      priority
                    />
                  </Button>
                </div>
              )}
              {activeTab === "nonMember" && (
                <div style={{display: "flex", flexDirection: "column"}}>
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{
                      border: "1px solid #cbd5e0",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      marginBottom: "10px",
                      height: "40px"
                    }}
                    placeholder="주문번호"
                  />
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{
                      border: "1px solid #cbd5e0",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      marginBottom: "10px",
                      height: "40px"
                    }}
                    placeholder="전화번호"
                  />
                  <button style={{height: "40px"}}>조회</button>
                </div>
              )}
            </div>
            <div style={{textAlign: "center"}}>
              처음이신가요? <br />
              카카오로 <span style={{color: "#e53e3e", cursor: "pointer", transition: "color 0.3s ease"}}>1초만에 로그인/회원가입</span>해보세요
            </div>
          </div>
        </DialogContent>
        <DialogActions className="border">
          <Button onClick={() => setOpen("close")}>닫기</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open === "logout"} onClose={() => setOpen("close")} maxWidth="xs" fullWidth>
        <DialogContent className="flex justify-center item-center">
          <Button
            variant="outlined"
            onClick={async () => {
              await usersServices.usersLogout()
              router.refresh()
              setOpen("close")
            }}
          >로그아웃</Button>
        </DialogContent>
        <DialogActions className="border">
          <Button onClick={() => setOpen("close")}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Users
