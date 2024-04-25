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
  }
}
