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
    const id = reviewData.id;

    console.log(contents);
    if (contents.includes('\n')){
      contents = contents.replace(/\n/g, "<br>");
    }

    const addHTML = `<div class="comment-wrap-box">
    <div class="thumb-name-comment">
      <div class="thumb-box-in-list"></div>
      <div class="comment-contents">
        <span class="writer-name">${writer}</span>
        <p class="writed-comment">${contents}</p>
      </div>
    </div>
    <div>
      <!-- <span class="material-symbols-outlined">more_vert</span> -->
      <button type="button" class="btn-review-remove"><i class="xi-trash-o"></i></button>
      <input type="hidden" value="${id}" class="comment-id" />
    </div>
    </div>`;

    $commentList.innerHTML += addHTML;

    
  });

  


  if (reviewDataArr.length === 0) {
    const noReviewsHTML = `
    <span class="no-reviews">작성된 리뷰가 없습니다.</span>`;

    const noReviewsEl = document.createElement("div");
    noReviewsEl.classList.add("comment-wrap-box");
    noReviewsEl.innerHTML = noReviewsHTML;
    $commentList.appendChild(noReviewsEl);
  }
};

addComments();