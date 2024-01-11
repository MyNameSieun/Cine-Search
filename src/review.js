const $reviewTextarea = document.querySelector('.review-textarea');
const $reviewBtnBox = document.querySelector('.review-btn-box');
const $btnCancel = document.querySelector('.btn-cancel');
const $btnSend = document.querySelector('.btn-send');

$reviewTextarea.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'flex';
});

$btnCancel.addEventListener('click', () => {
  $reviewBtnBox.style.display = 'none';
});