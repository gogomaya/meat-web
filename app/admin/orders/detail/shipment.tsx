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
  const [editMode, setEditMode] = useState(false)  // 수정 모드 상태
  const router = useRouter()

  // 송장번호가 변경될 때 editMode 상태 업데이트
  useEffect(() => {
    setTrackingNo(initialTrackingNo)
    setEditMode(true)
  }, [initialTrackingNo])

  const handleShipmentTrackingNoUpdate = async () => {
    // 입력 값이 비어 있는지 확인 => 잘못입력했을 경우 수정용으로 빈값도 입력가능하게 함
    if (trackingNo === "") {
      MySwal.fire({
        title: <p className="text-xl">배송지 수정 확인</p>,
        text: "송장번호를 입력해 주세요.",
        icon: "warning",
        confirmButtonText: "확인"
      })
      return
    }

    // 업데이트할 송장 정보 설정
    const updatedShipmentTrackingNo: Omit<Shipment, "created_at"> = {
      shipment_pk: shipment_pk,
      address_pk: address_pk,
      tracking_no: trackingNo,
      ship_company: "",
      status: "start"
    }

    try {
      // 송장번호 업데이트 API 호출
      const trackingNoUpdateResult: ResponseApi = await shipmentsServices.shipmentUpdate(updatedShipmentTrackingNo)
      console.log(trackingNoUpdateResult)

      if (trackingNoUpdateResult.data.status === 200) {
        MySwal.fire({
          title: <p className="text-xl">송장번호 입력 완료</p>,
          text: "송장번호 입력을 완료하였습니다.",
          confirmButtonText: "확인"
        }).then(() => {
          setEditMode(true)
          // router.refresh()
        })
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
    <div className="flex gap-3 items-center">
      {editMode ? (
        <>
          <input
            type="text"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            placeholder="송장번호 입력"
            className="px-3 py-1 border rounded"
          />
          <button
            onClick={handleShipmentTrackingNoUpdate}
            className="px-2 py-1 bg-blue-600 text-white rounded"
          >
            수정
          </button>
          {/* <button
            onClick={() => setEditMode(false)}
            className="px-2 py-1 bg-gray-600 text-white rounded"
          >
            취소
          </button> */}
        </>
      ) : (
        <>
          <span><input
            type="text"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            placeholder="송장번호 입력"
            className="px-3 py-1 border rounded"
          /></span>
          <button
            onClick={() => {
              setEditMode(true)
              handleShipmentTrackingNoUpdate()
            }}
            className="px-2 py-1 bg-green-600 text-white rounded"
          >
            입력
          </button>
        </>
      )}
    </div>
  )
}

export default UpdateTrackingNo
