"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import {Button} from "@mui/material"
import {Dialog, DialogContent, DialogActions} from "@mui/material"
import {v4 as uuidv4} from "uuid"
import {User} from "@/types/usersTypes"
import {usersServices} from "@/services/usersServices"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const Users = ({user}: {user: User}) => {
  const router = useRouter()
  const [open, setOpen] = useState("close")

  const [activeTab, setActiveTab] = useState("member")
  const handleTabClick = (tab: any) => {
    setActiveTab(tab)
  }
  useEffect(() => {
    const onMessage = (event: MessageEvent<any>) => {
      if (event.data.loginPopup) {
        setOpen("login")
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <Link id="btn-user" className="text-white" href="" onClick={() => setOpen(user && user.user_pk ? "logout" : "login")}>
        <AccountCircleIcon style={{width: "32px", height: "32px", cursor: "pointer"}}/>
      </Link>
      <Dialog open={open === "login"} onClose={() => setOpen("close")} maxWidth="sm" fullWidth>
        <DialogContent>
          <div className="container">
            <div style={{textAlign: "center", marginBottom: "20px"}}><strong>로그인</strong></div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{marginBottom: "20px", display: "flex", justifyContent: "center"}}>
                <button
                  style={{
                    fontWeight: activeTab === "member" ? "bold" : "normal",
                    padding: "15px 30px",
                    border: "1px solid #271A11",
                    cursor: "pointer",
                    backgroundColor: activeTab === "member" ? "#271A11" : "#FFFFFF",
                    color: activeTab === "member" ? "#FFFFFF" : "#271A11",
                    transition: "color 0.3s ease, background-color 0.3s ease",
                    minWidth: "200px",
                    textAlign: "center"
                  }}
                  onClick={() => handleTabClick("member")}
                >
                회원 로그인
                </button>
                <button
                  style={{
                    fontWeight: activeTab === "nonMember" ? "bold" : "normal",
                    padding: "15px 30px",
                    border: "1px solid #271A11",
                    cursor: "pointer",
                    backgroundColor: activeTab === "nonMember" ? "#271A11" : "#FFFFFF",
                    color: activeTab === "nonMember" ? "#FFFFFF" : "#271A11",
                    transition: "color 0.3s ease, background-color 0.3s ease",
                    minWidth: "190px",
                    textAlign: "center"
                  }}
                  onClick={() => handleTabClick("nonMember")}
                >
                비회원 주문조회
                </button>
              </div>
              {activeTab === "member" && (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Button
                    style={{marginBottom: "10px"}}
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
                      width={260}
                      height={100}
                      sizes="100vw"
                      priority
                    />
                  </Button>
                  <Button
                    style={{marginBottom: "10px"}}
                    onClick={() => {
                      let url = "https://kauth.kakao.com/oauth/authorize"
                      url += `?client_id=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}`
                      url += "&response_type=code"
                      url += `&redirect_uri=${document.location.origin}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`
                      url += `&state=${uuidv4()}`
                      window.open(url, "_blank")
                      setOpen("close")
                    }}
                  >
                    <Image
                      src="/images/kakao-login-btn.png"
                      alt="naver-login-btn"
                      width={260}
                      height={100}
                      sizes="100vw"
                      priority
                    />
                  </Button>
                </div>
              )}
              {activeTab === "nonMember" && (
                <div style={{display: "flex", alignItems: "center"}}>
                  <div style={{display: "flex", flexDirection: "column", marginRight: "10px"}}>
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{
                        border: "1px solid #CBD5E0",
                        borderRadius: "4px",
                        padding: "12px 20px",
                        marginBottom: "10px",
                        height: "48px",
                        width: "100%"
                      }}
                      placeholder="주문번호"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{
                        border: "1px solid #CBD5E0",
                        borderRadius: "4px",
                        padding: "12px 20px",
                        marginBottom: "10px",
                        height: "48px",
                        width: "100%"
                      }}
                      placeholder="전화번호"
                    />
                  </div>
                  <button style={{backgroundColor: "#271A11", color: "#FFFFFF", border: "none", padding: "15px 30px", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease", height: "110px"}}>조회</button>
                </div>
              )}
              <div className="container" style={{textAlign: "center", marginTop: "20px"}}>
                <strong>처음이신가요?</strong><br />
                {" "}
                <span
                  style={{color: "#e53e3e", cursor: "pointer", transition: "color 0.3s ease"}}
                  onClick={() => {
                    let url = "https://kauth.kakao.com/oauth/authorize"
                    url += `?client_id=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}`
                    url += "&response_type=code"
                    url += `&redirect_uri=${document.location.origin}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`
                    url += `&state=${uuidv4()}`
                    window.open(url, "_blank")
                    setOpen("close")
                  }}
                >
                  1초 회원가입으로 {" "}
                </span>
                입력없이 <br />간편하게 로그인 하세요.
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="border" style={{justifyContent: "center"}}>
          <Button onClick={() => setOpen("close")}>닫기</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open === "logout"} onClose={() => setOpen("close")} maxWidth="xs" fullWidth>
        <DialogContent>
          <div>
            <div className="flex flex-col justify-center item-center">
              <Button
                variant="outlined"
                onClick={async () => {
                  await usersServices.usersLogout()
                  router.refresh()
                  setOpen("close")
                }}
                style={{marginBottom: "20px", padding: "15px 30px"}}
              >
                로그아웃
              </Button>
            </div>
            <div className="flex flex-col justify-center item-center">
              <Button
                variant="outlined"
                onClick={() => {
                  router.push("/mypage")
                }}
                style={{padding: "15px 30px"}}
              >
                마이페이지
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="border" style={{justifyContent: "center"}}>
          <Button onClick={() => setOpen("close")}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Users
