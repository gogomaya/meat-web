"use client"

// 마이 페이지 배너
export const UserInfoForm = () => {
  return (
    <div className="container mx-auto bg-white p-4 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="py-16">
        <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
          <div>
            <h1 className="text-3xl font-extrabold">회원정보 수정</h1>
            <p className="text-sm text-gray-400 mt-3"></p>
            <div className="mt-12">
              <div className="text-lg font-extrabold">소셜 계정</div>
              <ul className="mt-3">
                <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff"
                      viewBox="0 0 479.058 479.058">
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000" />
                    </svg>
                  </div>
                  <a target="blank" href="#" className="text-[#A51C3] text-sm ml-3">
                    <small className="block">카카오</small>
                    <strong>닉네임</strong>
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <div className="text-lg font-extrabold">가입일자</div>
              <span>2024.01.01</span>
            </div>
          </div>
          <form className="ml-auo space-y-4">
            <input type="text" placeholder="이름" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
            <input type="text" placeholder="전화번호 (010-0000-0000)" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
            <button type="button" className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-full">수정하기</button>
          </form>
        </div>
      </div>
    </div>
  )
}
