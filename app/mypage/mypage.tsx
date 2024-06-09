"use client"
import {useState} from "react"

interface MyPageBannerProps {
  title: string, subTitle: string
}

// 마이 페이지 배너
export const MyPageBanner: React.FC<MyPageBannerProps> = ({title,subTitle}) => {
  return (
    <div className="flex justify-center py-8"
      style={{
        backgroundImage: "url('/images/Bg.png')",
        backgroundPosition: "center calc(10% - 620px)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        textAlign: "center",
        minHeight: "200px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <div className="text-red-100">마이 페이지</div>
      { title != ""
        ?
        <p>
          <span className="text-white">{title}</span> / <span style={{color:"#A51C30",textDecoration:"underline"}}>{subTitle}</span>
        </p>
        :
        <></>
      }
    </div>
  )
}

// 마이 페이지 타이틀
// SideButton 컴포넌트 정의
interface SideButtonProps {
  toggleSidebar: () => void
}

export const SideButton: React.FC<SideButtonProps> = ({toggleSidebar}) => {
  return (
    <div className="fixed bottom-[30%] right-[8%]">
      <button onClick={toggleSidebar} data-drawer-target="mypage-sidebar" data-drawer-toggle="mypage-sidebar" aria-controls="mypage-sidebar" type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 bg-gray-50 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
        마이메뉴
      </button>
    </div>
  )
}


interface MypageProps {
  // ${domain}: Bookmark[]
  // addressList: Address[]
  bookmarkCount: number
  addressCount: number
}

// 마이 페이지 사이드 바
export const Side: React.FC<MypageProps> = ({bookmarkCount, addressCount}) => {

  const [isDropdownHidden, setIsDropdownHidden] = useState(true)
  const toggleDropdown = () => {
    setIsDropdownHidden(!isDropdownHidden)
  }
  // 사이드바 토버튼
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <SideButton toggleSidebar={toggleSidebar} />
      <aside id="mypage-sidebar" className={`sm:block z-40 w-64 h-screen transition-transform 
      ${isOpen ? "fixed top-0 left-0 translate-x-0" : "hidden -translate-x-full"} sm:translate-x-0`}
      aria-label="Sidebar" style={{zIndex: 10}}
      >
        {isOpen ? <div className="h-[150px] bg-gray-50 dark:bg-gray-800"></div> : <></> }
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/mypage/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                <span className="ms-3 text-base">주문 목록</span>
              </a>
            </li>
            <li>
              <a href="/mypage/bookmarks" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-base">찜 리스트</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {bookmarkCount}
                </span>
              </a>
            </li>
            <li>
              <a href="/mypage/address" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-base">배송지 관리</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {addressCount}
                </span>
              </a>
            </li>
            <li>
              <a href="/mypage/cancellations" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z"/>
                </svg>
                <span className="ms-3 text-base">취소/반품/환불</span>
              </a>
            </li>
            <li>
              <a href="/mypage/userinfo" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                </svg>
                <span className="ms-3 text-base">회원정보 수정</span>
              </a>
            </li>
            <li>
              <a href="/mypage/reviews" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                </svg>
                <span className="ms-3 text-base">리뷰 관리</span>
              </a>
            </li>
            {/* <li>
              <button onClick={toggleDropdown} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-posts" data-collapse-toggle="dropdown-posts">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd"/>
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">글관리</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <ul id="dropdown-posts" className={`py-2 space-y-2 ${isDropdownHidden?"hidden":""}`}>
                <li>
                  <a href="#" className="text-sm flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    게시글 관리
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    댓글 관리
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  )
}


/**
 * 조회 내역 없을 때
 * @returns
 */
export const ListEmpty = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
        <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
          <p className="text-center p-4">조회된 내역이 없습니다.</p>
        </div>
      </div>
    </>
  )
}


interface MyPaginationProps {
  domain: string, page: number, prev: number, next: number, lastPage: number
}

export const MyPagination: React.FC<MyPaginationProps> = ({domain, page, prev, next, lastPage}) => {
  console.log("::: MyPagination :::")
  console.log(`${page}, ${prev}, ${next}, ${lastPage}`)

  return (
    <>
      {/* 페이지네이션 */}
      <div className="flex justify-center gap-6 my-4">
        {lastPage == 0 ?
          <a href={"/products"} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" >
            <span className="mr-2">쇼핑하러 가기</span>
          </a>
          :
          <></>
        }
        {prev == lastPage ? <></> : (
          <a href={`/mypage/${domain}?page=${prev}`} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
            </svg>
            <span className="mr-2">이전</span>
          </a>
        )}
        {page+1 > lastPage ? <></> : (
          <a href={`/mypage/${domain}?page=${next}`} className="flex items-center px-10 py-4 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
            <span className="ml-2">다음</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </>
  )
}