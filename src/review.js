const urlSearch = new URLSearchParams(location.search);
const movieId = urlSearch.get("id");
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
export const loadData = () => {
  let data = localStorage.getItem(REVIEW_KEY);
  return data;
}

//리뷰 데이터 추가
const saveReview = (name, password, contents) => {
  let prevData = JSON.parse(loadData());
  let sendData = {};
  let reviewPushData = [];

  //이전에 등록한 리뷰 있으면 불러와서 데이터 넣기
  if(prevData){
    sendData = prevData;
    if(prevData[movieId]){
      //해당 영화에 리뷰가 여러개 일 경우 리뷰 배열에서 마지막 리뷰의 id 값 + 1
      let idx = prevData[movieId].at(-1).id;
      id = idx + 1;
      reviewPushData = prevData[movieId];
    }
  }
  
  const dataObj = {
    'writer' : name,
    'password' : password,
    'contents' : contents,
    'id' : id,
  }

  reviewPushData.push(dataObj);
  sendData[movieId] = reviewPushData;
  console.log(sendData);

  localStorage.setItem(REVIEW_KEY, JSON.stringify(sendData));
  
  id += 1;
}

//리뷰 수 체크
const countReview = () => {
  const $reviewCnt = document.querySelector('.review-cnt');
  const data = JSON.parse(loadData());
  let length = 0;
  if(data && data[movieId]){
    length = data[movieId].length;
  }
  $reviewCnt.innerHTML = length;
}
countReview();

//작성폼 클릭 시 버튼 영역 활성화
$reviewTextarea.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'flex';
});

$reviewTextarea.addEventListener('keyup', (event) => {
  let text = $reviewTextarea.value;
  let rowCnt = text.split(/\r\n|\r|\n/).length;
  $reviewBtnBox.style.display = 'flex';
  if(event.key === 'Enter'){
    console.log('엔터입니당');
    $reviewTextarea.setAttribute('rows', rowCnt);
  }else if(event.key === 'Backspace'){
    if(rowCnt >= 1){
      $reviewTextarea.setAttribute('rows', rowCnt);
    }
  }
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