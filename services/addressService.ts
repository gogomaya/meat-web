import {Address} from "@/types/addressTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const addressServices = {
  addressCreate: async (address: Omit<Address, "address_pk" | "created_at">): Promise<ResponseApi> => {
    const formData = new FormData()
    formData.append("recipient", address.recipient)
    formData.append("address", address.address)
    formData.append("address_detail", address.address_detail)
    formData.append("mobile", address.mobile)

    const response = await fetch("/api/address", {
      method: "POST",
      body: formData
    })

    const result = await commonServices.responseJson(response)
    return result
  },

  addressRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address?` + new URLSearchParams({
      ...searchParams
    }))
    return await response.json()
  },

  addressDetail: async (address_pk: number): Promise<ResponseApi> => {
    const response = await fetch(`/api/address/${address_pk}`)
    return await response.json()
  },

  addressUpdate: async (address: Address): Promise<ResponseApi> => {
    const response = await fetch("/api/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    })
    return await response.json()
  },

  addressDelete: async (address_pk: number): Promise<void> => {
    await fetch(`/api/address?address_pk=${address_pk}`, {
      method: "DELETE"
    })
  }
}
