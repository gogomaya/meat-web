## 토스 페이먼츠 SDK 설치
```
    npm install @tosspayments/payment-widget-sdk
```


## 주문 하기
- [주문하기], [구매하기] 버튼 클릭
- 아래와 같이 경로 이동
http://localhost:3000/order?productPks=1,2,3&quantityList=5,5,5
- 주문 등록 처리
- ➡ redirect:/order/{order_pk}

### 단일 주문의 경우
```
    <Link href={`/order?productPks=${product_pk}&quantityList=1`}>주문하기</Link>
```