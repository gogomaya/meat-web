"use client"

import {useEffect} from "react"
import RedirectErrorPage from "./redirect"

/**
 * 에러 리다이렉트
 * @param props
 * @returns
 */

const ErrorRedirect = (props: {
  searchParams: {
    title?: string;
    text?: string;
    errorCode?: string;
    redirectUrl?: string;
    icon?: "success" | "error" | "warning" | "info" | "question";
  };
}) => {
  const {title = "", text = "에러 발생", errorCode = "500", redirectUrl = "/", icon = "info"} = props.searchParams

  useEffect(() => {
    console.log(`text : ${text}`)
    console.log(`errorCode : ${errorCode}`)
    console.log(`redirectUrl : ${redirectUrl}`)
    console.log(`icon : ${icon}`)

    const timeout = setTimeout(() => {
      console.log("3초")
      window.location.href = redirectUrl
    }, 3000)

    return () => clearTimeout(timeout) // Clean up the timeout if the component unmounts
  }, [errorCode, text, redirectUrl, icon])

  return (
    <>
      <RedirectErrorPage title={title} text={text} errorCode={errorCode} icon={icon} />
    </>
  )
}

export default ErrorRedirect
