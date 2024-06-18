import {NextRequest, NextResponse} from "next/server"

export const commonServices = {
  responseJson: async (response: any) => {
    if (response.status !== 200) {
      try {
        const error = await response.json()
        response.message = error.message
        throw {}
      } catch (error) {
        throw {
          status: response.status,
          message: response.message || response.statusText
        }
      }
    }
    const data = await response.json()
    return {data}
  },
  responseOpener: ({openerReload, windowClose}: {openerReload: boolean, windowClose: boolean}) => {
    return new NextResponse(`
      <script>
        ${openerReload ? "opener.location.reload()" : ""}
        ${windowClose ? "window.close()" : ""}
      </script>
    `, {
      headers: {"content-type": "text/html"}
    })
  },
  ssrCsr: () => {
    return typeof window === "undefined" ? process.env.NEXT_PUBLIC_URL : ""
  },
  categoriesMenu: (): {cow: string[], imported: string[] , pork: string[], simple: string[]} => {
    return {
      cow: [
        "구이",
        "국거리/불고기",
        "육회/사시미",
        "스테이크",
        "장조림",
        "뼈"
      ],
      pork: [
        // "돼지고기"
        "구이",
        "수육",
        "찌개"
        // "불고기",
        // "찜"
      ],
      imported: [
        "수입육"
      ],
      simple: [
        "간편식",
        "양념육"
      ]
    }
  }
}
