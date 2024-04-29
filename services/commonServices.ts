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
  categoriesMenu: (): {cow: string[], pork: string[], simple: string[]} => {
    return {
      cow: [
        "특수모듬",
        "육회/사시미",
        "국거리/구이",
        "불고기/대패",
        "차돌박이",
        "우삼겹",
        "스테이크",
        "LA갈비",
        "알꼬리"
      ],
      pork: [
        "한돈"
      ],
      simple: [
        "곰탕&머릿고기",
        "수육",
        "함박",
        "돈까스",
        "닭갈비&찜닭",
        "한돈껍데기",
        "멘보샤",
        "초벌장어",
        "한돈막창",
        "학센",
        "햄"
      ]
    }
  }
}
