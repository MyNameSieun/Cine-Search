const movieId = 848326; //848326 임시 데이터, 이후에 영화 아이디 가져와서 넣어야함.
const $reviewTextarea = document.querySelector('.review-textarea');
const $reviewBtnBox = document.querySelector('.review-btn-box');
const $btnCancel = document.querySelector('.btn-cancel');
const $btnSend = document.querySelector('.btn-send');
const $writer = document.querySelector('#writer');
const $password = document.querySelector('#password');

const REVIEW_KEY = 'review';
let id = 0;

//폼 리셋 - 자주 사용할 것 같아서 함수로 분리
const resetForm = () => {
  $writer.value = '';
  $password.value = '';
  $reviewTextarea.value = '';
};

//리뷰 불러오기
const loadData = () => {
  let data = localStorage.getItem(REVIEW_KEY);
  return data;
}

//리뷰 등록 - localstolage
// const pushReviewData = () => {
//   localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewPushData));
// }

//리뷰 데이터 추가
const saveReview = (name, password, contents) => {
  let prevData = JSON.parse(loadData());
  let sendData = {};
  let reviewPushData = [];


  //이전에 등록한 리뷰 있으면 불러와서 데이터 넣기
  if(prevData[movieId]){
    // console.log(prevData);
    // console.log(prevData[movieId]);
    // sendData[movieId] = prevData
    
    reviewPushData = prevData[movieId];
    
    // sendData[movieId] = prevData;
  }
  
  const dataObj = {
    'writer' : name,
    'password' : password,
    'contents' : contents,
    'id' : id,
    // 'movieId' : movieId //임시 데이터
  }

  reviewPushData.push(dataObj);
  sendData[movieId] = reviewPushData;
  console.log(sendData);

  // debugger
  // function pushReviewData() {
  // localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewPushData));
  localStorage.setItem(REVIEW_KEY, JSON.stringify(sendData));
  // }
  
  // pushReviewData();
  id += 1;
}

//리뷰 수 체크
const countReview = () => {
  const $reviewCnt = document.querySelector('.review-cnt');
  const data = JSON.parse(loadData());
  let length = 0;
  if(data[movieId]){
    length = data[movieId].length;
  }
  console.log(data[movieId]);
  // const length = !data[movieId] || data[movieId] !== null ? data[movieId].length : 0; //data null 이 아니면 리뷰 수 구하기
  // const length = data[movieId] !== null ? data[movieId].length : 0; //data null 이 아니면 리뷰 수 구하기
  $reviewCnt.innerHTML = length;
}
countReview();

//작성폼 클릭 시 버튼 영역 활성화
$reviewTextarea.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'flex';
});

//취소 버튼 클릭시 버튼 영역 비활성화
$btnCancel.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'none';
  resetForm();
  $btnSend.setAttribute('disabled', true);
});

//등록 버튼 이벤트
$btnSend.addEventListener('click', () => {
  const writer = $writer.value;
  const password = $password.value;
  const comment = $reviewTextarea.value;

  if(!writer.trim()){
    alert('닉네임을 입력해주세요');
    $writer.focus();
    return;
  }

  if(!password.trim()){
    alert('비밀번호를 입력해주세요');
    $password.focus();
    return;
  }

  if(!comment.trim()){
    alert('리뷰를 입력해주세요');
    $reviewTextarea.focus();
    return;
  }

  saveReview(writer, password, comment);
  alert('리뷰 등록이 완료되었습니다.');
  countReview();
  resetForm();
});

//작성폼에 입력 시 등록 버튼 활성화
$reviewTextarea.addEventListener('keyup', () => {
  $btnSend.removeAttribute('disabled');
});