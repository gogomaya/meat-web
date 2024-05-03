"use client"
import {useState} from "react"
import {Backdrop as BackdropMui, CircularProgress} from "@mui/material"

export const backdrop = {
  setOpen: undefined as unknown as Function,
  open: () => {
    backdrop.setOpen(true)
  },
  close: () => {
    backdrop.setOpen(false)
  }
}

const Backdrop = () => {
  const [open, setOpen] = useState(false)
  backdrop.setOpen = setOpen
  return (
    <BackdropMui className="z-[2000]" open={open}>
      <CircularProgress />
    </BackdropMui>
  )
}

export default Backdrop
