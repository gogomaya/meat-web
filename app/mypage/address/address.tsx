"use client"
import {addressServices} from "@/services/addressService"
import {Address} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {User} from "@/types/usersTypes"
import {useRouter} from "next/navigation"
import {useState} from "react"


/**
 * 주소 등록 폼
 * @returns
 */
interface AddressProps {
  user: User
}

export const AddressForm = ({user}: AddressProps ) => {

  const [recipient, setRecipient] = useState("")
  const [address, setAddress] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [mobile, setMobile] = useState("")

  const router = useRouter()

  const handelRegister = async () => {
    console.log("주소 등록하기 클릭")
    const newAddress: Omit<Address, "address_pk" | "created_at"> = {
      user_pk: user.user_pk,
      recipient,
      address,
      address_detail: addressDetail,
      mobile,
      is_primary: false
    }
    const addressCreateResult: ResponseApi = await addressServices.addressCreate(newAddress)

    // 여기가 응답 왔을 때 콜백으로 수정
    if(addressCreateResult.data.status == 200) {
      alert("주소 등록 완료")
      router.push("/mypage/address")
    }
  }
  return (
    <>
      <form className="ml-auo space-y-4">
        <input className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          type="text" id="recipient" placeholder="받는 사람"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          type="text" id="address" placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          type="text" id="address_detail" placeholder="상세 주소"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
        />
        <input className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          value={mobile}
          type="text" id="mobile" placeholder="전화번호 (010-0000-0000)"
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="button" onClick={() => handelRegister()} className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-full">등록하기</button>
      </form>
    </>
  )
}