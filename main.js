const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results; //  API로부터 받아온 데이터를 movies 변수에 저장
    displayMovies(movies);
    searchMovies();
  })
  .catch((error) => {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  });

const flip = document.querySelector(".flip"); // (1) 나중에 생성된 영화 카드를 추가할 위치를 참조하는 역할

function displayMovies(movieList) {
  movieList.forEach((movie) => {
    const card_container = document.createElement("div"); // (2)새로운 <div> 요소를 생성
    card_container.classList.add("card-container"); // (3) 생성한 <div> 요소에 "card-container" 클래스를 추가

    // (4) 생성한 <div> 요소의 내부 HTML을 설정
    // (5) 이때, 각 영화의 정보(제목, 포스터 이미지 경로, 평점, 줄거리 등)를 템플릿 리터럴을 활용하여 동적으로 삽입
    card_container.innerHTML = `
     <div class="card-front">
        <img src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" class="card-img-top" alt="${movie.title} 포스터" />
        <div class="card-body">
          <div class="card-info">
            <h5 class="card-title">${movie.title}</h5>
            <p class="star">⭐ ${movie.vote_average.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div class="card-back">
        <div class="card-body">
        <div class="card-info">
          <h5 class="card-title">${movie.title}</h5>
          <p class="star">⭐ ${movie.vote_average.toFixed(2)}</p>
        </div>
        <hr class="hr-top" />
        <p class="card-text">
          ${movie.overview}
        </p>
        <hr class="hr-bottom" />

        <a class="btn btn-primary">영화 id</a>
      </div>
    </div>
      `;

    // (6) 설정한 내부 HTML을 가진 card_container를 flip 요소의 자식 요소로 추가
    flip.appendChild(card_container);

    // 버튼 클릭시 영화 id 출력
    //  querySelectorAll 사용시
    const movieIdBtnList = card_container.querySelectorAll(".btn");
    movieIdBtnList.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const movieId = movie.id;
        alert(`영화 id : ${movieId}`);
      });
    });
    // querySelector 사용시
    // const movieIdBtn = card_container.querySelector(".btn");
    // movieIdBtn.addEventListener("click", function () {
    //   const movieId = movie.id;
    //   alert(`영화 id : ${movieId}`);
    // });
  });
}

// 사용자 검색 기능
function searchMovies() {
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
