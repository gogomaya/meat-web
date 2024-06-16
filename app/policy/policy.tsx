"use client"

import React, {useState} from "react"

const TermsOfService: React.FC = () => {
  return (
    <div style={{textAlign: "center", marginTop: "20px"}}>
      <div className="flex justify-center"><strong>한솔 정책</strong></div>
      <div style={{textAlign: "left", marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", width: "100%"}}>
        <p style={{fontSize: "16px", lineHeight: "1.6", color: "#333"}}>
          <strong style={{color: "#008CBA"}}>제 1 조 (목적)</strong><br />
                이 규칙은 본 사이트의 회원가입에 대한 조건 및 절차와 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
        <p style={{fontSize: "16px", lineHeight: "1.6", color: "#333"}}>
          <strong style={{color: "#4CAF50"}}>제 2 조 (규칙의 효력 및 변경)</strong><br />
                ① 이 규칙의 내용은 회원가입시 동의와 공지에 의해서 효력을 발생합니다.<br />
                ② 본 사이트 운영위가 필요하다고 인정되는 경우 이 규칙의 내용을 개정(변경, 삭제 또는 추가) 할 수 있으며, 개정된 규칙은 상기 제①항과 같은 방법으로 효력을 발생합니다.
        </p>
        <p style={{fontSize: "16px", lineHeight: "1.6", color: "#333"}}>
          <strong style={{color: "#FF9800"}}>제 3 조 (규칙외 준칙)</strong><br />
                이 규칙에 명시되지 않은 사항은 전기통신기본법, 전기 통신사업법 및 기타 관련법령의 규정에 의합니다.
        </p>
      </div>
    </div>
  )
}

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{textAlign: "center", marginTop: "20px"}}>
      <div style={{textAlign: "center", marginTop: "20px"}}>
        <div style={{textAlign: "left", marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", width: "100%"}}>
          <p style={{fontSize: "16px", lineHeight: "1.6", color: "#333"}}>
            <strong style={{color: "#008CBA"}}>제 1 조 (목적)</strong><br />
                이 규칙은 본 사이트의 회원가입에 대한 조건 및 절차와 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
          <p style={{fontSize: "16px", lineHeight: "1.6", color: "#333"}}>
            <strong style={{color: "#4CAF50"}}>제 2 조 (규칙의 효력 및 변경)</strong><br />
                ① 이 규칙의 내용은 회원가입시 동의와 공지에 의해서 효력을 발생합니다.<br />
                ② 본 사이트 운영위가 필요하다고 인정되는 경우 이 규칙의 내용을 개정(변경, 삭제 또는 추가) 할 수 있으며, 개정된 규칙은 상기 제①항과 같은 방법으로 효력을 발생합니다.
          </p>
          <p style={{fontSize: "16px", lineHeight: "1.6", color: "#333"}}>
            <strong style={{color: "#FF9800"}}>제 3 조 (규칙외 준칙)</strong><br />
                이 규칙에 명시되지 않은 사항은 전기통신기본법, 전기 통신사업법 및 기타 관련법령의 규정에 의합니다.
          </p>
        </div>
      </div>
    </div>
  )
}

const TermsAndPolicyTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("terms")

  return (
    <div className="p-8" style={{display: "flex", alignItems: "center"}}>
      <div>
        <button
          style={{
            backgroundColor: selectedTab === "terms" ? "black" : "yellow",
            color: selectedTab === "terms" ? "white" : "black",
            padding: "10px 20px",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            border: "none"
          }}
          onClick={() => setSelectedTab("terms")}
        >
          이용약관
        </button>
        <button
          style={{
            backgroundColor: selectedTab === "privacy" ? "black" : "yellow",
            color: selectedTab === "privacy" ? "white" : "black",
            padding: "10px 20px",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            border: "none"
          }}
          onClick={() => setSelectedTab("privacy")}
        >
          개인정보처리방침
        </button>
      </div>
      {selectedTab === "terms" && <TermsOfService />}
      {selectedTab === "privacy" && <PrivacyPolicy />}
    </div>
  )
}

export default TermsAndPolicyTabs
