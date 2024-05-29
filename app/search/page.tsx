import {loginCheck} from "@/app/users/login/loginCheck"
import MainLayout from "@/app/main-layout"
import {SearchResult} from "./search"

const Search = async () => {
  const {user} = await loginCheck(false)
  return (
    <MainLayout user={user}>
      <div className="w-full">
        <div className="flex justify-center"><strong>검색결과</strong></div>
        <SearchResult searchResults={[]} />
      </div>
    </MainLayout>
  )
}

export default Search
