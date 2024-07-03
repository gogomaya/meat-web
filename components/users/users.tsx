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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <Link id="btn-user" className="text-black" href="" onClick={() => setOpen(user && user.user_pk ? "logout" : "login")}>
        <AccountCircleIcon style={{width: "32px", height: "32px", cursor: "pointer"}}/>
      </Link>
      <Dialog open={open === "login"} onClose={() => setOpen("close")} maxWidth="sm" fullWidth>
        <DialogContent
          style={{backgroundImage: "url('/images/Bg_3.png')",
            //  backgroundColor: "rgba(255, 255, 255)",
            backgroundBlendMode: "overlay"}}>
          <div className="container">
            <DialogActions style={{justifyContent: "flex-end", position: "relative"}}>
              <Button
                onClick={() => setOpen("close")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  minWidth: "auto",
                  border: "none",
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#FEE601",
                  backgroundColor: "transparent",
                  padding: "0",
                  position: "relative",
                  outline: "none"
                }}
              >
                &times;
                {isHovered && (
                  <div
                    style={{
                      content: "\"\"",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "40px",
                      height: "40px",
                      border: "2px solid #FEE601",
                      borderRadius: "50%",
                      pointerEvents: "none"
                    }}
                  />
                )}
              </Button>
            </DialogActions>
            {/* <div className="text-center mb-4 py-4"><strong>로그인</strong></div> */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{marginBottom: "20px", display: "flex", justifyContent: "center"}}>
                <button
                  style={{
                    fontWeight: activeTab === "member" ? "bold" : "normal",
                    padding: "15px 10px",
                    border: "1px solid #271A11",
                    cursor: "pointer",
                    backgroundColor: activeTab === "member" ? "#271A11" : "#FFFFFF",
                    color: activeTab === "member" ? "#FFFFFF" : "#271A11",
                    transition: "color 0.3s ease, background-color 0.3s ease",
                    minWidth: "150px",
                    textAlign: "center"
                  }}
                  onClick={() => handleTabClick("member")}
                >
                  회원 로그인
                </button>
                <button
                  style={{
                    fontWeight: activeTab === "nonMember" ? "bold" : "normal",
                    padding: "15px 10px",
                    border: "1px solid #271A11",
                    cursor: "pointer",
                    backgroundColor: activeTab === "nonMember" ? "#271A11" : "#FFFFFF",
                    color: activeTab === "nonMember" ? "#FFFFFF" : "#271A11",
                    transition: "color 0.3s ease, background-color 0.3s ease",
                    minWidth: "140px",
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
                      width={240}
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
                      width={240}
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
                        width: "200px"
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
                        width: "200px"
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
                  style={{color: "#FF1E27", cursor: "pointer", transition: "color 0.3s ease"}}
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
                  카카오톡 1초 회원가입으로 {" "}
                </span>
                입력없이 <br />간편하게 로그인 하세요.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "logout"} onClose={() => setOpen("close")} maxWidth="xs" fullWidth >
        <DialogContent style={{backgroundImage: "url('/images/Bg_3.png')"}}>
          <DialogActions style={{justifyContent: "flex-end", position: "relative"}}>
            <Button
              onClick={() => setOpen("close")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                minWidth: "auto",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#FEE601",
                backgroundColor: "transparent",
                padding: "0",
                position: "relative",
                outline: "none"
              }}
            >
              &times;
              {isHovered && (
                <div
                  style={{
                    content: "\"\"",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40px",
                    height: "40px",
                    border: "2px solid #FEE601",
                    borderRadius: "50%",
                    pointerEvents: "none"
                  }}
                />
              )}
            </Button>
          </DialogActions>
          <div>
            <div className="flex flex-col justify-center item-center">
              <div className="flex items-center gap-3 justify-center">
                <Image
                  src="/images/cow.png"
                  alt="Logo"
                  width={45}
                  height={45}
                  sizes="100vw"
                  className="md:w-16"
                  priority
                />
              </div>
              <div className="flex items-center justify-center text-red-700 py-4">
                <strong>{user.name || user.nickname || "고객"}</strong><span className="text-black">님, 안녕하세요 :)</span>
              </div>
              <button type="button"
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                onClick={() => {
                  router.push("/mypage")
                }}
                style={{padding: "15px 30px"}}
              >
                마이페이지
              </button>
            </div>
            <div className="flex flex-col justify-center item-center">
              <button type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={async () => {
                  await usersServices.usersLogout()
                  router.push("/")
                  setOpen("close")
                }}
                style={{marginBottom: "20px", padding: "15px 30px"}}
              >
                로그아웃
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Users
