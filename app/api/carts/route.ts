import {NextApiRequest, NextApiResponse} from "next"

export default function addCart(req: NextApiRequest) {

  if (req.method === "POST") {
    try {
      const {item} = req.body

      if (item) {
        let cartItems: any[] = []
        const storedCartItems = localStorage.getItem("cartItems")
        if (storedCartItems !== null) {
          cartItems = JSON.parse(storedCartItems)
        }        cartItems.push(item)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
      }

    } catch (error) {
      console.log("업로드 실패")
    }
  } else {
    console.log("허용되지 않은 오류입니다")
  }
}
