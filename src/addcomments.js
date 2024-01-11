// 1. 일단 데이터를 불러와.
// 2. 불러온 데이터에는 review라는 객체 안에는 이렇게.
//  {writer: "지원", password: "123", contents: "영화굿", id: 0}
// 3. 저장한 내용으로 foreach 돌면서 각 정보에 접근해서 html그려.

import { loadData } from "./review.js";

const reviews = loadData(); //로컬 스토리지 값 받아오기
console.log(reviews); //{writer: "지원", password: "123", contents: "영화굿", id: 0}

reviews.forEach((review) => {
  let nickname = localStorage.getItem("writer");
  let password = localStorage.getItem("password");
  let contents = localStorage.getItem("contents");
});
