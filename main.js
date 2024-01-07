// Fetch API를 사용하여 데이터 가져오기
const movieContainer = document.querySelector("#movieContainer");

const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

let allMovies = []; // 초기에 모든 영화를 저장하기 위한 배열

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allMovies = data.results;

    // 초기에 모든 영화 표시
    displayMovies(allMovies);

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
  movieContainer.innerHTML = ""; // 기존 카드 삭제

  movies.forEach((movie) => {
    // card-front 생성 및 표시
    const card_front = document.createElement("div");
    card_front.classList.add("card-front");

    card_front.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title} 포스터" />
      <div class="card-body">
        <div class="card-info">
          <h5 class="card-title">${movie.title}</h5>
          <p class="star">⭐ ${movie.vote_average}</p>
        </div>
      </div>
    `;

    movieContainer.appendChild(card_front);

    // card-back 생성 및 표시
    const card_back = document.createElement("div");
    card_back.classList.add("card-back");

    card_back.innerHTML = `
      <div class="card-body">
        <div class="card-info">
          <h5 class="card-title">${movie.title}</h5>
          <p class="star">⭐ ${movie.vote_average}</p>
        </div>
        <hr class="hr-top" />
        <p class="card-text">
          ${movie.overview}
        </p>
        <hr class="hr-bottom" />

        <a class="btn btn-primary">영화 id</a>
      </div>
    `;

    movieContainer.appendChild(card_back);
  });
}
