import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../../../mypage"
import Image from "next/image"
import Link from "next/link"
import {ResponseApi} from "@/types/commonTypes"
import {ordersServices} from "@/services/ordersServices"
import {OrderSearchParams, Order} from "@/types/ordersTypes"
import ErrorPage from "@/app/error"
import moment from "moment"
import {getOrderStatusMeaning} from "../../ordersUtils"

const Home = async (props: {
  params: { order_pk: number }
  searchParams: OrderSearchParams
  order: Order
}) => {
  const {user} = await loginCheck(false)
  let ordersResponse: ResponseApi = {}
  let order_pk = props.params.order_pk
  let order = props.order
  try {
    ordersResponse = await ordersServices.ordersDetail(order_pk)
    order = ordersResponse.data.order
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  console.log(ordersResponse)
  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString()
    return formattedNumber
  }
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="Orders / 주문내역" subTitle="주문상세" />
        <div className="flex">
          <Side />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 배송 조회 컨테이너 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                <span className="text-2xl">주문 상세</span>
                {/* 상세 정보 박스 */}
                <div className="box py-4">
                  <p className="text-xl font-bold py-3">주문 정보</p>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">주문 번호</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3" id="orderPk">
                          {order.order_pk}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">주문 일자</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{moment(order.created_at).format("YYYY/MM/DD")}</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">총 금액</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">₩ {formatNumber(order.total_price || 0)} 원</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">주문 상태</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">{getOrderStatusMeaning( order.status )}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xl font-bold py-3">상세 정보</p>
                {/* 주문카드 */}
                <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white">
                    {/* 주문정보 */}
                    <div className="item flex-[2]">
                      {/* 타이틀 */}
                      <div className="w-full flex justify-between items-center">
                        <div className="item"><span className="text-[#A51C30] font-bold">한우 특수부위모둠</span></div>
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
                            <div className="item"><span>219,000</span>원</div>
                            <div className="item"><span>3</span>개</div>
                          </div>
                        </div>
                        <div className="item flex-[2]">
                          <div className="flex flex-col items-between gap-3">
                            {/* 총 가격 */}
                            <div className="item text-center">
                              <p className="font-bold">
                                <span>657,000</span>원
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div className="item flex-1">
                      <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                        <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          장바구니 담기
                        </Link>
                        <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          주문하기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white">
                    {/* 주문정보 */}
                    <div className="item flex-[2]">
                      {/* 타이틀 */}
                      <div className="w-full flex justify-between items-center">
                        <div className="item"><span className="text-[#A51C30] font-bold">한우 특수부위모둠</span></div>
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
                            <div className="item"><span>219,000</span>원</div>
                            <div className="item"><span>3</span>개</div>
                          </div>
                        </div>
                        <div className="item flex-[2]">
                          <div className="flex flex-col items-between gap-3">
                            {/* 총 가격 */}
                            <div className="item text-center">
                              <p className="font-bold">
                                <span>657,000</span>원
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div className="item flex-1">
                      <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                        <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          장바구니 담기
                        </Link>
                        <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          주문하기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 주문카드 */}
                <div className="w-full flex flex-col gap-6 max-w-4xl bg-white rounded-lg shadow-md p-6">
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white">
                    {/* 주문정보 */}
                    <div className="item flex-[2]">
                      {/* 타이틀 */}
                      <div className="w-full flex justify-between items-center">
                        <div className="item"><span className="text-[#A51C30] font-bold">한우 특수부위모둠</span></div>
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
                            <div className="item"><span>219,000</span>원</div>
                            <div className="item"><span>3</span>개</div>
                          </div>
                        </div>
                        <div className="item flex-[2]">
                          <div className="flex flex-col items-between gap-3">
                            {/* 총 가격 */}
                            <div className="item text-center">
                              <p className="font-bold">
                                <span>657,000</span>원
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div className="item flex-1">
                      <div className="flex flex-col flex-wrap items-center gap-4 px-8 py-2">
                        <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          장바구니 담기
                        </Link>
                        <Link href={""} className="w-full text-center px-4 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                          주문하기
                        </Link>
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

export default Home