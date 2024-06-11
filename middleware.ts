import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export function middleware(request: NextRequest) {
  if (
    process.env.NEXT_PUBLIC_HOST === "hansolmeat.shop" &&
    request.nextUrl.protocol === "http:"
  ) {
    const url = new URL(request.url)
    url.protocol = "https"
    return NextResponse.redirect(url)
  }
}

export const config = {
  // static 경로는 http에서 https로 이동하지 방지
  matcher: "/((?!images|_next/static|_next/image|favicon.ico).*)"
}
