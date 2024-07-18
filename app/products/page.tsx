import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {ProductsList, ProductsPagination, ProductsSearch} from "./products"
import {productsServices} from "@/services/productsServices"
import {ResponseApi} from "@/types/commonTypes"
import ErrorPage from "@/app/error"
import {ProductCategory, ProductsSearchParams} from "@/types/productsTypes"

const Products = async (props: {
  searchParams: ProductsSearchParams
}) => {
  const {user} = await loginCheck(false)
  const searchParams = {
    rowsPerPage: Number(props.searchParams.rowsPerPage) || 16,
    page: Number(props.searchParams.page) || 0,
    orderColumn: props.searchParams.orderColumn || "product_pk",
    orderDirection: props.searchParams.orderDirection || "desc",
    query: props.searchParams.query || "",
    category: props.searchParams.category || "",
    category_menu: props.searchParams.category_menu || "",
    is_today: String(props.searchParams.is_today) === "true"
  } as ProductsSearchParams
  let productsResponse: ResponseApi = {}
  try {
    productsResponse = await productsServices.productsRead(searchParams)
  } catch (error) {
    console.error(error)
    return <ErrorPage />
  }
  const {products, total_rows} = productsResponse.data
  const titleName = () => {
    const categoryName = {
      giftSet: "선물세트",
      cow: "소고기",
      pork: "돼지고기",
      imported: "수입육",
      simple: "간편식"
    }
    if (searchParams.is_today) {
      return "오늘의 메뉴"
    } else if (searchParams.category_menu) {
      return searchParams.category_menu
    } else if (searchParams.category) {
      return categoryName[searchParams.category as ProductCategory]
    }
    return "상품 목록"
  }
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
            {titleName()}
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
        <div className="container">
          <ProductsList products={products} />
          {total_rows ? (
            <ProductsPagination searchParams={searchParams} total_rows={total_rows} />
          ) : null}
        </div>
      </div>
    </MainLayout>
  )
}

export default Products
