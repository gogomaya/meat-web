import {bookmarksServices} from "@/services/bookmarksServices"
import {AddressSearchParams} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {MyPageData} from "@/types/myPageTypes"
import {User} from "@/types/usersTypes"
import {addressServices} from "@/services/addressServices"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {orderItemsService} from "@/services/orderItemsServices"



export const myPageData = async (user: User): Promise<MyPageData> => {

  let myPageData = {
    bookmarks: [],
    addressList: [],
    bookmarkCount: 0,
    addressCount: 0
  } as MyPageData

  // 찜 리스트 개수
  const searchParams = {
    user_pk: user.user_pk
  } as AddressSearchParams

  let bookmarksResponse: ResponseApi = {}
  let bookmarkCount = 0
  try {
    bookmarksResponse = await bookmarksServices.bookmarksRead(searchParams)
    myPageData.bookmarks = bookmarksResponse.data.bookmarks
    bookmarkCount = bookmarksResponse.data.total_rows
  } catch (error) {
    console.error(error)
  }
  console.log(`bookmarkCount: ${bookmarkCount}`)
  myPageData.bookmarkCount = bookmarkCount

  // 배송지 개수
  let addressResponse: ResponseApi = {}
  let addressCount = 0
  try {
    addressResponse = await addressServices.addressRead(searchParams)
    myPageData.bookmarks = addressResponse.data.addressList
    addressCount = addressResponse.data.total_rows
  } catch (error) {
    console.error(error)
  }
  console.log(`addressCount: ${addressCount}`)
  myPageData.addressCount = addressCount

  return myPageData
}



