import { searchMovies } from "./search.js";
import { showMovies } from "./movies.js";
showMovies();
searchMovies();

// form 태그 reload 현상 방지
document.querySelector("#inputForm").addEventListener("submit", function (event) {
  event.preventDefault();
});
