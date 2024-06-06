

⭕ 결제 성공 redirect URL
- orderId       : 주문번호
- amount        : 결제금액
- paymentKey    : 결제 식별키
- paymentType   : 결제 유형을 나타내는 값 (NORMAL, BRANDPAY)
http://localhost:3000/order/success?orderPk=1&addressPk=5&paymentType=NORMAL&orderId=41bc4d31-2316-11ef-9835-f2961abc63ba&paymentKey=tgen_20240605173344Fdgx7&amount=121212

## 배송 등록
1. shipments - INSERT
  - shipment_pk

## 주문 업데이트
2. order - UPDATE
  - address_pk  
  - shipment_pk  
  - status : paid

## 결제 등록
3. payments - INSERT
  - 















---
## 결제 수단 확인
```
  paymentWidget.requestPayment({
    amount: 15000,
    orderId: '_Qi64BlATZ7hGJARR9Q_Y',
    orderName: '토스 티셔츠 외 2건',
    successUrl: 'http://localhost:8080/success',
    failUrl: 'http://localhost:8080/fail',
  })
  .then(result => {
    const paymentType = result.paymentType; // NORMAL, BRANDPAY, KEYIN 중 하나
    console.log(paymentType);
  })
  .catch(error => {
    console.error(error);
  });
```

