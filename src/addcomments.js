// 1. 일단 데이터를 불러와.
// 2. 불러온 데이터에는 review라는 객체 안에는 이렇게.
//  {writer: "지원", password: "123", contents: "영화굿", id: 0}
// 3. 저장한 내용으로 foreach 돌면서 각 정보에 접근해서 html그려.

import { loadData } from "./review.js";

const jsonReviewData = loadData(); //로컬 스토리지 값 받아오기
console.log(jsonReviewData); //{"848326":[{"writer":"지원3","password":"1234","contents":"안녕","id":2}]}

const reviewKeyData = JSON.parse(jsonReviewData); //json문자열을 객체로 파싱
// console.log(reviewKeyData) //{848326: Array(1)}
// console.log(reviewKeyData['848326'][0]); //848326은 추후에 아이디값으로
 const a = reviewKeyData[0];

 console.log(jsonReviewData.length)

 for (let i = 0; i<jsonReviewData.length; i++){

 }


  
