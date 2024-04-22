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

const Users = ({user}: {user: User}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <div>
      <Link href="" onClick={() => setOpen(true)}>
        <PersonOutlineIcon className="md:w-8 md:h-8" />
      </Link>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          {user && user.user_pk ? (
            <Button
              variant="outlined"
              onClick={async () => {
                await fetch("/api/users/logout")
                setOpen(false)
                router.refresh()
              }}
            >로그아웃</Button>
          ) : (
            <Button
              onClick={() => {
                setOpen(false)
                window.open(`https://nid.naver.com/oauth2.0/authorize?client_id=zlbKaCf1nrFkWFYK4rOE&response_type=code&redirect_uri=${document.location.origin}/api/users/naver-login&state=${uuidv4()}`, "_blank")
              }}
            >
              <Image
                src="/images/naver-login-btn.png"
                alt="naver-login-btn"
                width={325}
                height={100}
                sizes="100vw"
                priority
              />
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Users
