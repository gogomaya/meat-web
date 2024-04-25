"use client"

const Error = ({
  error
}: {
  error: Error & { digest?: string }
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">서버 오류가 발생하였습니다.</h2>
      <p className="text-lg font-bold">오류 코드: {error.digest}</p>
    </div>
  )
}

export default Error
