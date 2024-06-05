import {Address} from "@/types/addressTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const addressServices = {
  addressCreate: async (address: Omit<Address, "address_pk" | "created_at">): Promise<ResponseApi> => {
    console.log(`user_pk : ${String(address.user_pk)}`)
    const formData = new FormData()
    formData.append("recipient", address.recipient)
    formData.append("user_pk", String(address.user_pk))
    formData.append("address", address.address)
    formData.append("address_detail", address.address_detail)
    formData.append("mobile", address.mobile)
    formData.append("is_primary", String(address.is_primary))

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address`, {
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
    const result = await commonServices.responseJson(response)
    return result
  },

  addressDetail: async (address_pk: number): Promise<ResponseApi> => {
    console.log(`address_pk : ${address_pk}`)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address/${address_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },

  addressUpdate: async (address: Omit<Address, "created_at">): Promise<ResponseApi> => {
    console.log(`address_pk : ${address.address_pk}`)
    console.log(`user_pk : ${address.user_pk}`)
    console.log(`is_primary : ${address.is_primary}`)
    const address_pk = address.address_pk
    const formData = new FormData()
    formData.append("address_pk", String(address.address_pk))
    formData.append("user_pk", String(address.user_pk))
    formData.append("recipient", address.recipient)
    formData.append("address", address.address)
    formData.append("address_detail", address.address_detail)
    formData.append("mobile", address.mobile)
    formData.append("is_primary", String(address.is_primary))
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address/${address_pk}`, {
      method: "PUT",
      body: formData
    })
    const result = await commonServices.responseJson(response)
    return result
  },

  addressDelete: async (address_pk: number): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address/${address_pk}`, {
      method: "DELETE"
    })
    const result = await commonServices.responseJson(response)
    return result
  }
}
