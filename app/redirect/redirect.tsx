"use client"
import { redirect } from "next/navigation"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface ErrorProps {
    title: string
    text: string
    errorCode: string
    icon: "success" | "error" | "warning" | "info" | "question"
}

const RedirectErrorPage = ({title, text, errorCode, icon}: ErrorProps  ) => {
    
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: <p className="text-xl">{title}</p>,
        text: `${text} [에러코드] : ${errorCode}`,
        icon: icon || "info",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonText: "확인"
    })

    return (
        <>
            
        </>
    )

}

export default RedirectErrorPage