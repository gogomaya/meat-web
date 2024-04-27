"use client"

const ErrorPage = ({
  error,
  message
}: {
  error?: Error & { digest?: string }
  message?: string
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      {message ? (
        <h2 className="text-2xl font-bold">{message}</h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold">서버 런타임 오류가 발생하였습니다.</h2>
          <p className="text-lg font-bold">오류 코드: {error?.digest}</p>
        </>
      )}
    </div>
  )
}

export default ErrorPage
