import {notFound} from "next/navigation"
import {NextRequest} from "next/server"
import {Table} from "@/app/api/ckeditor5/upload-images/route"
import fs from "fs"

export const GET = async (_: NextRequest,
  context: {params: {table: string, fileName: string}}
) => {
  try {
    const table = context.params.table === "products" ? "products" : "boards" as Table
    const fileName = context.params.fileName
    const headers = new Headers()
    headers.append("Content-Disposition", `filename=${encodeURIComponent(fileName)}`)
    headers.append("Content-Type", `image/${fileName.split(".").pop()}`)
    let buffer
    if (fs.existsSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/${table}/${fileName}`)) {
      buffer = fs.readFileSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/${table}/${fileName}`)
    } else {
      buffer = fs.readFileSync(`./public/images/${fileName}`)
    }
    return new Response(buffer, {
      headers
    })
  } catch (error) {
    notFound()
  }
}
