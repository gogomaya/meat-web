import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ProductsSearchList} from "./search"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {productsServices} from "@/services/productsServices"

const Search = async (props: {searchParams: SearchParams}) => {
  const {user} = await loginCheck(false)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 10,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "product_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || ""
  } as SearchParams
  const response: ResponseApi = await productsServices.productsRead(searchParams)
  return (
    <MainLayout user={user}>
      <div className="pb-16">
        <div className="flex justify-center text-black py-16"
          style={{
            backgroundImage: "url('/images/Bg_3.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "cover",
            backgroundPositionX: "20%",
            backgroundPositionY: "0%",
            textAlign: "center",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            color: "#333"
          }}>
          <div style={{
            fontSize: "48px",
            marginBottom: "20px"
          }}>
            검색결과
          </div>
        </div>
        <div className="container flex flex-col py-8">
          <div style={{
            padding: "20px",
            borderRadius: "10px",
            marginTop: "30px",
            marginBottom: "20px",
            lineHeight: "1.5",
            fontSize: "16px",
            textAlign: "center",
            border: "2px solid #FACC15",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backgroundImage: "url('/images/Bg_3.png')",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "650px",
            width: "95%",
            margin: "0 auto"
          }}>
            <strong className="py-3 text-black" style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "18px"
            }}>📌 구매 시 참고사항</strong>
            <p className="text-black" style={{marginBottom: "10px"}}>
              🍽️ 식당에서 제공되는 1인분의 양은 일반적으로 150g이며, 서울의 경우 최근에는 120g 정도입니다.
            </p>
            <p className="text-black" style={{marginBottom: "10px"}}>
              🥩 특상 제품은 오마카세에서 제공되는 고기 품질입니다.
            </p>
            <p className="text-black" style={{marginBottom: "10px"}}>
              🍖 일반 제품은 고급 한우 식당에서 제공되는 고기 품질입니다.
            </p>
          </div>
          <ProductsSearchList
            products={response.data.products}
            total_rows={response.data.total_rows}
            searchParams={searchParams}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Search
