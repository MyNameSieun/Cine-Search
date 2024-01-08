// Fetch API를 사용하여 데이터 가져오기
const flip = document.querySelector(".flip");

const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

let allMovies = []; // 초기에 모든 영화를 저장하기 위한 배열

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allMovies = data.results;

    displayMovies(allMovies); // 초기에 모든 영화 표시

    const searchForm = document.querySelector("form");

    searchForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 방지

      const searchInput = document.querySelector("input[type=search]");
      const keyword = searchInput.value.trim().toLowerCase();

      // 검색 결과에 따라 영화 카드를 표시하거나 숨김
      const filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword)
      );

      displayMovies(filteredMovies);
    });
  })
  .catch((error) => {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  });

// 영화 카드 표시 함수
function displayMovies(movies) {
  flip.innerHTML = ""; // 기존 카드 삭제

  movies.forEach((movie) => {
    // card_container  생성 및 표시
    const card_container = document.createElement("div"); // 엘리먼트를 생성
    card_container.classList.add("card-container"); // "card_container" 클래스를 추가

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
      `; // 요소 내부의 HTML을 설정

    flip.appendChild(card_container);

    // 버튼 클릭시 id 출력 기능 -> document 사용시 버튼 안눌림
    // 왜 card_container를 사용해야하나? document를 사용하면 안되나?

    // document.querySelector(); => 1개 or 여러개? DOM 요소 1개 (배열 x)
    // document.querySelectorAll(); => 여러개? DOM 요소 배열!!!
    // 즉, document를 사용할거면 'movieIdBtn' => array이므로 forEach를 사용해야함.

    // querySelectorAll 사용시 코드
    const movieIdBtnList = card_container.querySelectorAll(".btn");
    movieIdBtnList.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const movieId = movie.id;
        alert(`영화 id : ${movieId}`);
      });
    });
    // querySelector 사용시 코드
    // const movieIdBtn = card_container.querySelector(".btn");
    // movieIdBtn.addEventListener("click", function () {
    //   const movieId = movie.id;
    //   alert(`영화 id : ${movieId}`);
    // });
  });
}
