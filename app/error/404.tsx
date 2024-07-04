"use client"

const Section404 = ({
  error,
  message
}: {
  error?: Error & { digest?: string }
  message?: string
}) => {
  return (
    <div
      className="container py-12 w-full flex flex-col justify-center items-center"
    >
      {message ? (
        <div className="text-2xl font-bold text-center">{message}</div>
      ) : (
        <>
          <div className="container py-8 text-2xl font-bold text-center">404 Page Not Found</div>
          <p className="text-lg font-bold text-center mt-2">
            오류 코드: {error?.digest}
          </p>
        </>
      )}
    </div>
  )
}

export default Section404