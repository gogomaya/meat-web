"use client"
import {addressServices} from "@/services/addressService"
import {Address} from "@/types/addressTypes"
import {ResponseApi} from "@/types/commonTypes"
import {User} from "@/types/usersTypes"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"



/**
 * 주소 등록 폼
 * @returns
 */
interface AddressProps {
  user: User
  addressInfo: Address
  firstAddress: boolean
}

export const AddressForm = ({user, addressInfo, firstAddress}: AddressProps ) => {

  const [recipient, setRecipient] = useState("")
  const [address, setAddress] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [mobile, setMobile] = useState("")
  const [first, setFirstAddress] = useState(firstAddress)
  const router = useRouter()

  // [등록하기] 클릭
  const handelCreate = async () => {
    console.log("주소 등록하기 클릭")
    const newAddress: Omit<Address, "address_pk" | "created_at"> = {
      user_pk: user.user_pk,
      recipient,
      address,
      address_detail: addressDetail,
      mobile,
      is_primary: firstAddress ? 1 : 0
    }
    console.log(`is_primary : ${newAddress.is_primary}`)
    if( recipient == "" || address == "" || addressDetail == "" || mobile == "" ) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">배송지 등록 확인</p>,
        text: "배송지 관련 모든 정보를 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }

    const addressCreateResult: ResponseApi = await addressServices.addressCreate(newAddress)

    if(addressCreateResult.data.status == 200) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">주소 등록 완료</p>,
        text: "새 배송지 등록을 완료하였습니다.",
        confirmButtonText: "확인"
      })
      router.refresh()
      router.push("/mypage/address")
    }
  }

  if(first) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <span>새 배송지를 등록합니다.</span>,
      text: "등록된 배송지 가 없어 새 배송지를 등록합니다.",
      icon: "warning",
      confirmButtonText: "확인"
    })
    setFirstAddress(false)
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
        <button type="button" onClick={() => handelCreate()} className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-full">
          등록하기
        </button>
      </form>
    </>
  )
}


export const AddressUpdateForm = ({user, addressInfo}: AddressProps ) => {
  console.log(`addressInfo.is_primary : ${addressInfo.is_primary}`)
  const [recipient, setRecipient] = useState(addressInfo.recipient || "")
  const [address, setAddress] = useState(addressInfo.address || "")
  const [addressDetail, setAddressDetail] = useState(addressInfo.address_detail || "")
  const [mobile, setMobile] = useState(addressInfo.mobile || "")
  const [isPrimary, setPrimary] = useState(addressInfo.is_primary || 0)
  const router = useRouter()

  useEffect(() => {
    console.log(`기본배송지 여부 : ${isPrimary}`)
  }, [isPrimary])

  // [수정하기] 클릭
  const handelUpdate = async () => {
    console.log("주소 수정하기 클릭")
    console.log(`기본배송지 여부 : ${isPrimary}`)
    let updatedAddress: Omit<Address, "created_at"> = {
      address_pk: addressInfo.address_pk,
      user_pk: user.user_pk,
      recipient,
      address,
      address_detail: addressDetail,
      mobile,
      is_primary: isPrimary
    }
    console.dir("pdatedAddress.is_primary : " + updatedAddress.is_primary)

    if( recipient == "" || address == "" || addressDetail == "" || mobile == "" ) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">배송지 수정 확인</p>,
        text: "배송지 관련 모든 정보를 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }
    const addressCreateResult: ResponseApi = await addressServices.addressUpdate(updatedAddress)
    if(addressCreateResult.data.status == 200) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p className="text-xl">주소 수정 완료</p>,
        text: "배송지 수정을 완료하였습니다.",
        confirmButtonText: "확인"
      })
      router.refresh()
      router.push("/mypage/address")
    }
  }

  // 기본 배송지 체크
  const handleCheckboxChange = () => {
    setPrimary((prev) => (prev === 1 ? 0 : 1))
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
        { addressInfo.is_primary == 1 ?
          <></> :
          <label htmlFor="is-primary" className="w-full flex justify-center items-center p-2 border border-solid" style={{userSelect: "none", cursor: "pointer"}}>
            <input
              id="is-primary"
              type="checkbox"
              checked={isPrimary === 1}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="px-3" style={{userSelect: "none", cursor: "pointer"}}>
              기본 배송지
            </span>
          </label>
        }
        <button type="button" onClick={() => handelUpdate()} className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-full">
          수정하기
        </button>
      </form>
    </>
  )
}



interface AddressListProps {
  addressList: Address[]
}

export const AddressList = ({addressList}: AddressListProps) => {

  const MySwal = withReactContent(Swal)
  const handleDelete = async (address_pk : number) => {
    console.log(`address_pk : ${address_pk}`)
    MySwal.fire({
      title: <p>정말로 삭제하시겠습니까?</p>,
      text: "배송지가 삭제되면, 되돌릴 수 없습니다.",
      icon: "warning",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: <p>배송지가 삭제되었습니다.</p>,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        // TODO: 배송 삭제 요청
        let addressResponse: ResponseApi = {}
        addressResponse = await addressServices.addressDelete(address_pk)

        location.reload()
      }
    })
  }

  const handleCheck = async () => {
    MySwal.fire({
      title: <p className="text-xl">기본 배송지는 삭제할 수 없습니다.</p>,
      text: "먼저 다른 배송지로 기본 배송지를 변경해주세요.",
      confirmButtonText: "확인"
    })
  }
  return (
    <div className="flex flex-col items-center gap-10 my-2 mx-4 md:mx-0">
      {addressList.map((address) => (
        <div key={address.address_pk} className="w-full flex flex-col gap-2 max-w-4xl bg-white rounded-lg shadow-md p-6">
          <div className="item">
            <div className="flex justify-between items-center">
              <div className="item">
                <span className="text-2xl font-bold">{address.recipient}</span>
              </div>
              <div className="item">
                {
                  address.is_primary
                    ?
                    <div className="flex gap-2 items-center px-10 py-1 rounded-lg text-white font-medium bg-[#A51C30]">
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                      <span className="">기본 배송지</span>
                    </div>
                    :
                    <></>
                }
              </div>
            </div>
          </div>
          <div className="item">
            <div className="flex flex-col gap-1">
              <p>{address.address}</p>
              <p>{address.address_detail}</p>
              <p>{address.mobile}</p>
            </div>
          </div>
          <div className="item">
            <div className="flex justify-between items-center">
              {
                address.is_primary == 1
                  ?
                  <button
                    onClick={()=>handleCheck()}
                    className="px-16 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                    삭제하기
                  </button>
                  :
                  <button
                    onClick={()=>handleDelete(address.address_pk)}
                    className="px-16 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                    삭제하기
                  </button>
              }
              <Link
                href={`/mypage/address/update/${address.address_pk}`}
                className="px-16 py-1 bg-transparent outline-none border-2 border-solid border-[#A51C30] rounded-lg text-[#A51C30] font-medium active:scale-95 hover:bg-[#A51C30] hover:text-white hover:border-transparent focus:bg-[#A51C30] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#A51C30] focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
              >
              수정하기
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}