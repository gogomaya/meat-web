import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side} from "./mypage"
import Link from "next/link"
import {myPageData} from "./mypageData"

const Mypage = async () => {
  const {user} = await loginCheck(true)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="" subTitle="" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-wrap justify-center items-center gap-4 py-10">
                  {/* 메뉴 카드 */}
                  <Link href={"/mypage/orders"} className="item " style={{display: "inline-block", width: "128px"}}>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-4xl bg-white rounded-lg shadow-md px-3 py-6 border border-white hover:border-[#A51C30]">
                      <div
                        className="flex flex-col justify-center items-center text-[#A51C30]"
                      >
                        <svg className="w-[48px] h-[48px] text-[#A51C30] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm">주문 목록</span>
                      </div>
                    </div>
                  </Link>
                  {/* 메뉴 카드 */}
                  <Link href={"/mypage/bookmarks"} className="item " style={{display: "inline-block", width: "128px"}}>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-4xl bg-white rounded-lg shadow-md px-3 py-6 border border-white hover:border-[#A51C30]">
                      <div
                        className="flex flex-col justify-center items-center text-[#A51C30]"
                      >
                        <svg className="w-[48px] h-[48px] text-[#A51C30] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                        </svg>
                        <span className="text-sm">찜 리스트</span>
                      </div>
                    </div>
                  </Link>
                  {/* 메뉴 카드 */}
                  <Link href={"/mypage/address"} className="item " style={{display: "inline-block", width: "128px"}}>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-4xl bg-white rounded-lg shadow-md px-3 py-6 border border-white hover:border-[#A51C30]">
                      <div
                        className="flex flex-col justify-center items-center text-[#A51C30]"
                      >
                        <svg className="w-[48px] h-[48px] text-[#A51C30] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm">배송지 관리</span>
                      </div>
                    </div>
                  </Link>
                  {/* 메뉴 카드 */}
                  <Link href={"/mypage/cancellations"} className="item " style={{display: "inline-block", width: "128px"}}>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-4xl bg-white rounded-lg shadow-md px-3 py-6 border border-white hover:border-[#A51C30]">
                      <div
                        className="flex flex-col justify-center items-center text-[#A51C30]"
                      >
                        <svg className="w-[48px] h-[48px] text-[#A51C30] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                          <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z"/>
                        </svg>
                        <span className="text-xs">취소/반품/환불</span>
                      </div>
                    </div>
                  </Link>
                  {/* 메뉴 카드 */}
                  <Link href={"/mypage/userinfo"} className="item " style={{display: "inline-block", width: "128px"}}>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-4xl bg-white rounded-lg shadow-md px-3 py-6 border border-white hover:border-[#A51C30]">
                      <div
                        className="flex flex-col justify-center items-center text-[#A51C30]"
                      >
                        <svg className="w-[48px] h-[48px] text-[#A51C30] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-xs">회원정보 수정</span>
                      </div>
                    </div>
                  </Link>
                  {/* 메뉴 카드 */}
                  <Link href={"/mypage/reviews"} className="item " style={{display: "inline-block", width: "128px"}}>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-4xl bg-white rounded-lg shadow-md px-3 py-6 border border-white hover:border-[#A51C30]">
                      <div
                        className="flex flex-col justify-center items-center text-[#A51C30]"
                      >
                        <svg className="w-[48px] h-[48px] text-[#A51C30] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                        </svg>
                        <span className="text-sm">리뷰 관리</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 주문목록 */}
        {/* <OrderList /> */}
        {/* 취소/반품/환불 내역 */}
        {/* 영수증 조회/출력 */}
      </div>
    </MainLayout>
  )
}

export default Mypage
