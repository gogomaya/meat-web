import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {MyPageBanner, Side, SideButton} from "../../../mypage"
import {DeliveryStatusLink, ShipNoCopyButton} from "../shipments"

/**
 * 마이페이지>주문목록>배송조회
 * ✅ TODO
 * - shipments 데이터 조회
 * - 배송 상태에 따른 안내 메시지 처리
 * @returns
 */
const Home = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <MyPageBanner title="My Page / 주문내역" subTitle="배송조회" />
        <div className="flex">
          <Side bookmarkCount={bookmarkCount} addressCount={addressCount} />
          <div className="container py-16">
            <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
              {/* 배송 조회 컨테이너 */}
              <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                <span className="text-2xl">배송 조회</span>
                {/* 배송 상태 박스 */}
                <div className="w-full flex flex-col gap-6 max-w-4xl bg-white shadow-md p-6">
                  <div className="text-center">
                    <p className="text-xl font-bold p-4">배송완료</p> {/* TODO: 배송 상태 state 로 변경 */}
                    <p className="text-lg">고객님이 주문하신 상품이 배송완료 되었습니다.</p> {/* TODO: 배송 상태메시지 state 로 변경 */}
                  </div>
                </div>
                {/* 배송 상태 확인 박스 */}
                <div className="box flex flex-col gap-3">
                  <DeliveryStatusLink />
                  <ShipNoCopyButton />
                </div>
                {/* 상세 정보 박스 */}
                <div className="box py-4">
                  <p className="text-xl font-bold py-3">상세 정보</p>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">운송장 번호</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3" id="shipNo">121650564531</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">받는 사람</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">김한솔</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">전화 번호</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">010-1234-1234</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">받는 주소</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">대전광역시 서구 둔산3동 1862번지</span>
                        <span className="px-3">103동 1801호</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">요청 사항</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">문앞 현관 비밀번호 1234종</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 라인 */}
                  <div className="w-full flex flex-wrap flex-col md:flex-row justify-between bg-white border border-solid border-gray-200 my-4">
                    <div className="item flex-1 bg-gray-200 text-center">
                      <div className="inner p-1">
                        <span className="font-bold">수령 방법</span>
                      </div>
                    </div>
                    <div className="item flex-[3]">
                      <div className="inner p-1">
                        <span className="px-3">문앞</span>
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
