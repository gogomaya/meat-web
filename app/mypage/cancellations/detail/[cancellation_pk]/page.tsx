import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../../../mypage"
import Image from "next/image"
import {myPageData} from "../../../mypageData"
import {Cancellation, CancellationSearchParams} from "@/types/cancellationsTypes"
import {ResponseApi} from "@/types/commonTypes"
import {cancellationsServices} from "@/services/cancellationsServices"
import ErrorPage from "@/app/error"
import {getCancellationStatusMeaning} from "@/app/mypage/orders/ordersUtils"

const CancellationDetail = async (props: {
  params: { cancellation_pk: number }
  searchParams: CancellationSearchParams
}) => {
  const {user} = await loginCheck(false)
  const {bookmarks, addressList, bookmarkCount,addressCount} = await myPageData(user)

  const cancellation_pk = props.params.cancellation_pk
  let cancellationResponse: ResponseApi = {}
  let cancellation : Cancellation = {
    total_discount_price: "",
    total_count: "",
    title: "",
    cancellation_pk: 0,
    order_pk: 0,
    type: "cancel",
    status: "pending",
    is_confirmed: false,
    is_refund: false,
    created_at: "",
    ordered_at: ""
  }
  try {
    cancellationResponse = await cancellationsServices.cancellationDetail(cancellation_pk)
    cancellation = cancellationResponse.data.cancellation
    console.log(":::::::::: 취소 상세 ::::::::::")
    console.log(cancellation)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }


  const formatDate = (isoString : string) => {
    const date = new Date(isoString)

    // 연도, 월, 일 추출
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0")

    // 원하는 형식으로 변환
    return `${year}.${month}.${day}`
  }


  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Withdraw Order / 취소/반품/환불" subTitle="상세내역" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 배송 조회 컨테이너 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                <span className="text-2xl">취소/반품/환불내역 상세</span>
                <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                  {/* 주문일자, 상세보기 */}
                  <div className="flex justify-between">
                    <div className="item">
                      <span>{ formatDate(cancellation.created_at) }</span> 주문
                    </div>
                    <div className="item">
                      <span>주문번호 : </span>
                      <span>{cancellation.order_pk}</span>
                    </div>
                  </div>
                  {/* 주문카드 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white rounded-md shadow-md p-2">
                    {/* 주문정보 */}
                    <div className="item flex-[2]">
                      {/* 타이틀 */}
                      <div className="w-full flex justify-between items-center px-4 py-2">
                        <div className="item">
                          <span className="text-[#A51C30] font-bold">진행상태 : <span>{getCancellationStatusMeaning(cancellation.status)}</span></span>
                        </div>
                      </div>
                      {/* 내용 */}
                      <div className="w-full flex flex-wrap justify-between items-center  px-4 py-2">
                        <div className="item flex-1">
                          <Image
                            src="/images/logo.png"
                            alt=""
                            width={32}
                            height={32}
                            sizes="100vw"
                            className="md:w-16"
                            priority
                          />
                        </div>
                        <div className="item flex-[3]">
                          <div className="flex flex-col items-between">
                            <div className="item"><span>{cancellation.title}</span></div>
                            <div className="item"><span>{cancellation.total_discount_price.toLocaleString()}</span>원</div>
                            <div className="item"><span>{cancellation.total_count}</span>개</div>
                          </div>
                        </div>
                        <div className="item flex-[2]">
                          <div className="flex flex-col items-between gap-3">
                            {/* 총 가격 */}
                            <div className="item text-center">
                              <p className="font-bold">
                                <span>{cancellation.total_discount_price.toLocaleString()}</span>원
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div className="item flex-1">
                      <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                        <span className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          진행상태
                        </span>
                        <span className="w-full px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] text-center text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          {getCancellationStatusMeaning(cancellation.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 상세 정보 박스 */}
                <div className="box py-4">
                  <p className="text-xl font-bold py-3">상세 정보</p>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">취소 번호</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3" id="cancelNo">{cancellation.cancellation_pk}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">취소 접수일</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{formatDate(cancellation.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">취소 완료일</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">
                          {
                            cancellation.completed_at
                              ?
                              formatDate(cancellation.completed_at)
                              :
                              ""
                          }

                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">취소 사유</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{cancellation.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CancellationDetail
