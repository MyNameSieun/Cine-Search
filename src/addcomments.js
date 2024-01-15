import { loadData } from "./review.js";

const $commentList = document.getElementById("commentList");

const urlSearch = new URLSearchParams(location.search);
const movieId = urlSearch.get("id");
const reviewData = JSON.parse(loadData()); //로컬 스토리지 값 받아오기
console.log(reviewData, "reviewData");

// const reviewDataArr = reviewData[movieId];
let reviewDataArr = [];
if (reviewData && reviewData[movieId]) {
  //reviewData 데이터가 있고, movieId로 된 리뷰가 있을 때
  reviewDataArr = reviewData[movieId];
}
console.log(reviewDataArr, "reviewDataArr");

const addComments = () => {
  reviewDataArr.forEach((reviewData) => {
    const writer = reviewData.writer;
    const password = reviewData.password;
    let contents = reviewData.contents;

    //사용자가 엔터로 줄바꿈하였을 시 댓글에도 줄바꾸어 출력
    console.log(contents);
    if (contents.includes("\n")) {
      contents = contents.replace(/\n/g, "<br>"); // /n이 담긴 문자열(/ \n /)을 모두 가져와서(g) br로 변환해라
    }

    const addHTML = `<div class="comment-wrap-box">
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

  if (reviewDataArr.length === 0) {
    const noReviewsHTML = `
    <span class="no-reviews">작성된 리뷰가 없습니다.</span>`;

    const $noReviewsEl = document.createElement("div");
    $noReviewsEl.classList.add("comment-wrap-box");
    $noReviewsEl.innerHTML = noReviewsHTML;
    $commentList.appendChild($noReviewsEl);
  }
};

addComments();
