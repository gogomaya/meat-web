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
        }}>검색결과
        </div>
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          lineHeight: "1.5",
          fontSize: "16px",
          maxWidth: "600px"
        }}>
          <strong>구매 시 참고사항</strong>
          <p>식당에서 제공되는 1인분의 양은 일반적으로 150g이며, 서울의 경우 최근에는 120g 정도입니다.</p>
          <p>특상 제품은 오마카세에서 제공되는 고기 품질입니다.</p>
          <p>일반 제품은 고급 한우 식당에서 제공되는 고기 품질입니다.</p>
        </div>
      </div>
      <ProductsSearchList
        products={response.data.products}
        total_rows={response.data.total_rows}
        searchParams={searchParams} />
    </MainLayout>
  )
}

export default Search
