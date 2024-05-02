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
  return (
    <div>
      <Link href="" onClick={() => setOpen(user && user.user_pk ? "logout" : "login")}>
        <PersonOutlineIcon className="md:w-8 md:h-8" />
      </Link>
      <Dialog open={open === "login"} onClose={() => setOpen("close")}>
        <DialogContent>
          <div className="flex flex-col">
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
        </DialogContent>
        <DialogActions className="border">
          <Button onClick={() => setOpen("close")}>닫기</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open === "logout"} onClose={() => setOpen("close")}>
        <DialogContent>
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
