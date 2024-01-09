// 사용자 검색 기능
export function searchMovies() {
  const searchForm = document.querySelector(".form-control");

  // 사용자가 입력을 할 때마다 이벤트가 실행
  searchForm.addEventListener("input", function () {
    // this는 searchForm 요소를 참조
    // toLowerCase: 입력된 텍스트를 소문자로 변환
    const searchKeyword = this.value.toLowerCase();

    // movieCards의 각 요소에 대해 함수를 실행
    const movieCards = document.querySelectorAll(".card-container");
    movieCards.forEach((card) => {
      // 카드의 제목을 소문자로 변환하여 title 변수에 할당
      const title = card.querySelector(".card-title").textContent.toLowerCase();

      // title이 searchKeyword를 포함한다면 cardDisplay는 "block", 그렇지 않다면 "none"
      const cardDisplay = title.includes(searchKeyword) ? "block" : "none";
      card.style.display = cardDisplay;

      // 아래와 같은 코드
      //   if (title.includes(searchKeyword)) {
      //     card.style.display = "block";
      //   } else {
      //     card.style.display = "none";
      //   }
    });
  });
}
