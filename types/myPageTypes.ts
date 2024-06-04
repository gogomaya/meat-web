import {Address} from "./addressTypes"
import {Bookmark} from "./bookmarksTypes"

export interface MyPageData {
  bookmarks: Bookmark[]
  addressList: Address[]
  bookmarkCount: number
  addressCount: number
}

