const $reviewTextarea = document.querySelector('.review-textarea');
const $reviewBtnBox = document.querySelector('.review-btn-box');
const $btnCancel = document.querySelector('.btn-cancel');
const $btnSend = document.querySelector('.btn-send');

//작성폼 클릭 시 버튼 영역 활성화
$reviewTextarea.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'flex';
});

//취소 버튼 클릭시 버튼 영역 비활성화
$btnCancel.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'none';
  $reviewTextarea.value = '';
});

//작성폼에 입력 시 등록 버튼 활성화
$reviewTextarea.addEventListener('keyup', () => {
  $btnSend.removeAttribute('disabled');
});