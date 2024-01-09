import { searchMovies } from "./search.js";
import { displayMovies } from "./displayMovies.js";

const url = "https://api.themoviedb.org/3/movie/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

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

// form 태그 reload 현상 방지
document.querySelector("#inputForm").addEventListener("submit", function (event) {
  event.preventDefault();
});
