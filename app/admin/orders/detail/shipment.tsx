"use client"
import React, {useState, useEffect} from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {useRouter} from "next/navigation"
import {shipmentsServices} from "@/services/shipmentsServices"
import {ResponseApi} from "@/types/commonTypes"
import {Shipment} from "@/types/shipmentsTypes"

const MySwal = withReactContent(Swal)

// 송장번호 업데이트 함수

interface UpdateTrackingNoProps {
  address_pk: number
  shipment_pk: number
  initialTrackingNo: string  // 기존 송장번호를 props로 받아옴
}

const UpdateTrackingNo: React.FC<UpdateTrackingNoProps> = ({address_pk, shipment_pk, initialTrackingNo}) => {
  const [trackingNo, setTrackingNo] = useState(initialTrackingNo)
  const [newTrackingNo, setNewTrackingNo] = useState(trackingNo)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setNewTrackingNo(trackingNo)
  }

  // 송장번호가 변경될 때 editMode 상태 업데이트
  // useEffect(() => {
  //   setTrackingNo(initialTrackingNo)
  //   setIsEditing(false)
  // }, [initialTrackingNo])

  const handleShipmentTrackingNoUpdate = async () => {
    if (newTrackingNo === "") {
      MySwal.fire({
        title: <p className="text-xl">송장번호 확인</p>,
        text: "송장번호를 입력해 주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }

    // 업데이트할 송장 정보 설정
    let updatedShipmentTrackingNo: Omit<Shipment, "created_at"> = {
      shipment_pk: shipment_pk,
      address_pk: address_pk,
      tracking_no: newTrackingNo,
      ship_company: "",
      status: "shipping"
    }

    try {
      // 송장번호 업데이트 API 호출
      const trackingNoUpdateResult: ResponseApi = await shipmentsServices.shipmentUpdate(updatedShipmentTrackingNo)
      if (trackingNoUpdateResult.data.status === 200) {
        MySwal.fire({
          title: <p className="text-xl">송장번호 입력 완료</p>,
          text: "송장번호 입력을 완료하였습니다.",
          confirmButtonText: "확인"
        }).then(() => {
          window.location.reload()
        })
        return
      } else {
        MySwal.fire({
          title: <p className="text-xl">오류 발생</p>,
          text: "송장번호 입력에 실패하였습니다.",
          icon: "error",
          confirmButtonText: "확인"
        })
      }
    } catch (error) {
      MySwal.fire({
        title: <p className="text-xl">서버 오류</p>,
        text: "서버와의 통신 중 오류가 발생하였습니다.",
        icon: "error",
        confirmButtonText: "확인"
      })
    }
  }

  return (
    <div className="flex items-center justify-between py-2 gap-4">
      {isEditing ? (
        <input
          type="text"
          id="trackingNo"
          value={newTrackingNo}
          onChange={(e) => setNewTrackingNo(e.target.value)}
          placeholder="송장번호를 바르게 입력해주세요.)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      ) : (
        <span>{initialTrackingNo}</span>
      )}
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={() => { handleShipmentTrackingNoUpdate(); handleSaveClick() }}
            className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
          >
            <span className="text-lg font-normal">저장</span>
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
          >
            <span className="text-lg font-normal">취소</span>
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={handleEditClick}
          className="text-white bg-[#A51C30] hover:bg-[#8B0A1D] font-semibold rounded-md text-sm px-4 py-2.5 w-1/6"
        >
          <span className="text-lg font-normal">수정</span>
        </button>
      )}
    </div>
    // <div className="flex gap-3 items-center">
    //   {editMode ? (
    //     <>
    //       <input
    //         type="text"
    //         value={trackingNo}
    //         onChange={(e) => setTrackingNo(e.target.value)}
    //         placeholder="송장번호 입력"
    //         className="px-3 py-1 border rounded"
    //       />
    //       <button
    //         onClick={handleShipmentTrackingNoUpdate}
    //         className="px-2 py-1 bg-blue-600 text-white rounded"
    //       >
    //         입력
    //       </button>
    //       <button
    //         onClick={() => setEditMode(false)}
    //         className="px-2 py-1 bg-gray-600 text-white rounded"
    //       >
    //         취소
    //       </button>
    //     </>
    //   ) : (
    //     <>
    //       <span><input
    //         type="text"
    //         value={trackingNo}
    //         onChange={(e) => setTrackingNo(e.target.value)}
    //         placeholder="송장번호 입력"
    //         className="px-3 py-1 border rounded"
    //       /></span>
    //       <button
    //         onClick={() => {
    //           setEditMode(true)
    //           handleShipmentTrackingNoUpdate()
    //         }}
    //         className="px-2 py-1 bg-green-600 text-white rounded"
    //       >
    //         수정
    //       </button>
    //     </>
    //   )}
    // </div>
  )
}

export default UpdateTrackingNo
