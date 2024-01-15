const urlSearch = new URLSearchParams(location.search);
const movieId = urlSearch.get("id");
const $reviewTextarea = document.querySelector(".review-textarea");
const $reviewBtnBox = document.querySelector(".review-btn-box");
const $btnCancel = document.querySelector(".btn-cancel");
const $btnSend = document.querySelector(".btn-send");
const $writer = document.querySelector("#writer");
const $password = document.querySelector("#password");
const $commentList = document.querySelector("#commentList");
const $modal = document.querySelector(".modal-wrap");
const $checkPassword = document.querySelector("#checkPassword");
const $btnModalClose = document.querySelector(".btn-modal-close");
const $btnCheckCancel = document.querySelector("#btnCheckCancel");
const $btnCheckConfirm = document.querySelector("#btnCheckConfirm");

const REVIEW_KEY = "review";
let id = 0;
let deleteTargetId = null; //삭제할 리뷰의 id

//폼 리셋 - 자주 사용할 것 같아서 함수로 분리
const resetForm = () => {
  $writer.value = "";
  $password.value = "";
  $reviewTextarea.value = "";
};

//리뷰 불러오기
export const loadData = () => {
  let data = localStorage.getItem(REVIEW_KEY);
  return data;
};

//리뷰 데이터 추가
const saveReview = (name, password, contents) => {
  let prevData = JSON.parse(loadData());
  let sendData = {};
  let reviewPushData = [];

  //이전에 등록한 리뷰 있으면 불러와서 데이터 넣기
  if (prevData) {
    sendData = prevData;
    if (prevData[movieId] && prevData[movieId].length > 0) {
      //해당 영화에 리뷰가 여러개 일 경우 리뷰 배열에서 마지막 리뷰의 id 값 + 1
      let idx = prevData[movieId].at(-1).id;
      id = idx + 1;
      reviewPushData = prevData[movieId];
    }
  }

  const dataObj = {
    writer: name,
    password: password,
    contents: contents,
    id: id
  };

  reviewPushData.push(dataObj);
  sendData[movieId] = reviewPushData;
  localStorage.setItem(REVIEW_KEY, JSON.stringify(sendData));
  addComment(name, contents, id);
  id += 1;
};

//리뷰 수 체크
const countReview = () => {
  const $reviewCnt = document.querySelector(".review-cnt");
  const data = JSON.parse(loadData());
  let length = 0;
  if (data && data[movieId]) {
    length = data[movieId].length;
  }
  $reviewCnt.innerHTML = length;
};
countReview();

//비밀번호 확인 모달 노출
const confirmPasswordModal = () => {
  $modal.style.display = "flex";
  $checkPassword.focus();
};

//리뷰 삭제 기능
const deleteReview = (targetId) => {
  let prevData = JSON.parse(loadData());
  console.log(prevData);
  let removeId = null;
  let targetPassword = null;
  const checkPassword = $checkPassword.value;
  console.log(checkPassword);
  // 유효성 검사
  if (!checkPassword) {
    alert("비밀번호를 입력해주세요.");
    $checkPassword.focus();
    return;
  }
  if (targetId === null) {
    alert("삭제할 리뷰의 id 값이 없습니다. 다시 시도해주세요.");
    return;
  }
  //forEach 돌면서 같은 id를 가진 배열 찾기
  prevData[movieId].forEach((el, idx) => {
    if (el["id"] === targetId) {
      removeId = idx;
      targetPassword = el["password"];
    }
  });
  if (targetPassword !== checkPassword) {
    alert("비밀번호가 다릅니다. 비밀번호 확인 후 다시 시도해주세요.");
    console.log(targetId);
    console.log(targetPassword);
    $checkPassword.value = "";
    $checkPassword.focus();
    return;
  }
  //splice로 삭제
  prevData[movieId].splice(removeId, 1);
  localStorage.setItem(REVIEW_KEY, JSON.stringify(prevData));
  console.log(targetId);
  console.log(targetPassword);
  alert("삭제가 완료되었습니다.");
  deleteReviewHtml(deleteTargetId);
  closeModal();
  countReview();
  // location.reload();
};

//비밀번호 확인 모달 닫기 기능
const closeModal = () => {
  $modal.style.display = "none";
  deleteTargetId = null; //리뷰삭제 취소하여 타겟 아이디 삭제.
  $checkPassword.value = "";
};

//리뷰 삭제 시 html 삭제
function deleteReviewHtml(deleteTargetId){
  let reviewEl = document.querySelectorAll('.comment-wrap-box');
  //리뷰 리스트에서 forEach 돌면서 삭제할 리뷰 id 와 같은 id 를 가지고 있는 리뷰 삭제
  reviewEl.forEach((el, idx) => {
    if(el.id !== 'noReview'){
      const target = el.querySelector('.comment-id').value;
      if(deleteTargetId === target){
        el.remove();
      }
    }
  })
}

//추가 버튼 눌렀을 때 리뷰 바로 추가
function addComment(name, contents, id) {
  const $noReviewsEl = document.querySelector("#noReview");
  if ($noReviewsEl !== null) {
    $noReviewsEl.style.display = "none";
  }

  const nowWriter = name;
  let nowContents = contents;

  if (nowContents.includes("\n")) {
    nowContents = nowContents.replace(/\n/g, "<br>"); // /n이 담긴 문자열(/ \n /)을 모두 가져와서(g) br로 변환해라
  }

  const addHTML = `<div class="comment-wrap-box">
  <div class="thumb-name-comment">
    <div class="thumb-box-in-list"></div>
    <div class="comment-contents">
      <span class="writer-name">${nowWriter}</span>
      <p class="writed-comment">${nowContents}</p>
    </div>
  </div>
  <div>
    <!-- <span class="material-symbols-outlined">more_vert</span> -->
    <button type="button" class="btn-review-remove"><i class="xi-trash-o"></i></button>
    <input type="hidden" value="${id}" class="comment-id" />
  </div>
  </div>`;

  $commentList.innerHTML += addHTML;
}
// 이벤트 영역 시작 ============

//작성폼 클릭 시 버튼 영역 활성화
$reviewTextarea.addEventListener("click", () => {
  $reviewBtnBox.style.display = "flex";
});

//입력 내용에 따른 textarea 높이 변경
$reviewTextarea.addEventListener("keyup", (event) => {
  let text = $reviewTextarea.value;
  let rowCnt = text.split(/\r\n|\r|\n/).length;
  $reviewBtnBox.style.display = "flex";
  if (event.key === "Enter") {
    $reviewTextarea.setAttribute("rows", rowCnt);
  } else if (event.key === "Backspace") {
    if (rowCnt >= 1) {
      $reviewTextarea.setAttribute("rows", rowCnt);
    }
  }
});

//취소 버튼 클릭시 버튼 영역 비활성화
$btnCancel.addEventListener("click", () => {
  $reviewBtnBox.style.display = "none";
  resetForm();
  $btnSend.setAttribute("disabled", true);
});

//등록 버튼 이벤트
$btnSend.addEventListener("click", () => {
  const writer = $writer.value;
  const password = $password.value;
  const comment = $reviewTextarea.value;

  if (!writer.trim()) {
    alert("닉네임을 입력해주세요");
    $writer.focus();
    return;
  }

  if (!password.trim()) {
    alert("비밀번호를 입력해주세요");
    $password.focus();
    return;
  }

  if (!comment.trim()) {
    alert("리뷰를 입력해주세요");
    $reviewTextarea.focus();
    return;
  }

  saveReview(writer, password, comment);
  alert("리뷰 등록이 완료되었습니다.");

  countReview();
  resetForm();
  // location.reload();
});

//작성폼에 입력 시 등록 버튼 활성화
$reviewTextarea.addEventListener("keyup", () => {
  $btnSend.removeAttribute("disabled");
});

//리뷰 삭제 이벤트
$commentList.addEventListener("click", (event) => {
  if (event.target.className === "btn-review-remove") {
    deleteTargetId = event.target.parentElement.querySelector(".comment-id").value;
    confirmPasswordModal();
  } else if (event.target.tagName === "I") {
    //아이콘 변경 가능성이 있어서 className -> tagName 으로 변경
    deleteTargetId = event.target.parentElement.parentElement.querySelector(".comment-id").value;
    confirmPasswordModal();
  }
});

//리뷰 비밀번호 확인 모달 닫기 버튼 이벤트
$btnModalClose.addEventListener("click", () => {
  closeModal();
});

//리뷰 삭제 확인 버튼 이벤트
$btnCheckConfirm.addEventListener("click", () => {
  deleteReview(Number(deleteTargetId));
});

//리뷰 삭제 취소 버튼 이벤트
$btnCheckCancel.addEventListener("click", () => {
  closeModal();
});

//리뷰 삭제 모달의 뒷 배경 클릭 시 - 모달 닫기 이벤트
$modal.addEventListener("click", (event) => {
  if (event.target.className === "modal-wrap") {
    closeModal();
  }
});
