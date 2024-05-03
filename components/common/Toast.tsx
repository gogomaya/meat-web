"use client"
import {useState} from "react"
import {Alert, AlertColor, IconButton, Snackbar} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface ToastState {
  message: string
  severity: AlertColor
  open: boolean
}

export const toast = {
  setToast: undefined as unknown as Function,
  open: (state: {message: string; severity: string}) => {
    toast.setToast({
      ...state,
      open: true
    } as ToastState)
  }
}

export const toastError = (error: {status: number; message: string}) => {
  toast.open({
    severity: "error",
    message: `${error.status}: ${error.message}`
  })
}

export const toastWarning = (message: string) => {
  toast.open({
    severity: "warning",
    message
  })
}

export const toastSuccess = (message: string) => {
  toast.open({
    severity: "success",
    message
  })
}

const Toast = () => {
  const [t, setT] = useState({
    message: "",
    severity: "error",
    open: false
  } as ToastState)
  toast.setToast = setT
  const close = () => {
    setT({
      ...t,
      open: false
    })
  }
  return (
    <Snackbar
      open={t.open}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      autoHideDuration={4000}
      onClose={close}
    >
      <Alert
        severity={t.severity}
        action={
          <IconButton size="small" onClick={close}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <pre>{t.message}</pre>
      </Alert>
    </Snackbar>
  )
}

export default Toast
