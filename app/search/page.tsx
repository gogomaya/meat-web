import {loginCheck} from "@/app/admin/page"
import MainLayout from "@/app/main-layout"
import {SearchResult} from "./search"

const Search = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <h2 className="flex justify-center"><strong>검색결과</strong></h2>
        <SearchResult searchResults={[]} />
      </div>
    </MainLayout>
  )
}

export default Search
