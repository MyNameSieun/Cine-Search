const $reviewTextarea = document.querySelector('.review-textarea');
const $reviewBtnBox = document.querySelector('.review-btn-box');
const $btnCancel = document.querySelector('.btn-cancel');
const $btnSend = document.querySelector('.btn-send');
const $writer = document.querySelector('#writer');
const $password = document.querySelector('#password');

const REVIEW_KEY = 'review';
let reviewData = [];
let id = 0;

//리뷰 등록 - localstolage
// const pushReviewData = () => {
//   localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewPushData));
// }

//리뷰 데이터 추가
const saveReview = (name, password, contents) => {
  let loadData1 = JSON.parse(loadData());
  let reviewPushData = [];
  // let reviewPushData = loadData1 !== null ? [] : loadData1;
  // let maxId = 0;
  // console.log(loadData1);  
  // if(loadData1 !== null){
  //   for(let i of Object.values(loadData1)){
  //     if(maxId < i[id]){
  //       maxId = i[id];
  //     }
  //     id = maxId;
  //   }
  // }
  
  
  const dataObj = {
    'writer' : name,
    'password' : password,
    'contents' : contents,
    'id' : id
  }
  reviewPushData.push(dataObj);

  function pushReviewData() {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewPushData));
  }
  
  pushReviewData();
  id += 1;
}

//리뷰 불러오기
const loadData = () => {
  return localStorage.getItem(REVIEW_KEY);
}

//작성폼 클릭 시 버튼 영역 활성화
$reviewTextarea.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'flex';
});

//취소 버튼 클릭시 버튼 영역 비활성화
$btnCancel.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'none';
  $reviewTextarea.value = '';
  $btnSend.setAttribute('disabled', true);
});

$btnSend.addEventListener('click', () => {
  const writer = $writer.value;
  console.log('ddd');
  saveReview(writer, 1, 1);
  console.log('ddd');
});

//작성폼에 입력 시 등록 버튼 활성화
$reviewTextarea.addEventListener('keyup', () => {
  $btnSend.removeAttribute('disabled');
});


console.log(reviewData);