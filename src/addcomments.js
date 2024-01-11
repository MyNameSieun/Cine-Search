const $commentList = document.getElementById('commentList');

import { loadData } from "./review.js";

const movieId = 848326; //848326 임시 데이터, 이후에 영화 아이디 가져와서 넣어야함.
const reviewData = JSON.parse(loadData()); //로컬 스토리지 값 받아오기

const reviewDataArr = reviewData[movieId];
console.log(reviewDataArr); 

reviewDataArr.forEach(reviewData => {
    console.log(reviewData)
    const writer = reviewData.writer;
    const password = reviewData.password;
    const contents = reviewData.contents;

    const addHTML = 
    `<div class="comment-wrap-box">
    <div class="thumb-name-comment">
      <div class="thumb-box-in-list"></div>
      <div class="comment-contents">
        <span class="writer-name">${writer}</span>
        <p class="writed-comment">${contents}</p>
      </div>
    </div>
    <span class="material-symbols-outlined">more_vert</span>
    </div>`;

    $commentList.innerHTML += addHTML;
});
  
