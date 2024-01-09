import { searchMovies } from "./search.js";
import { displayMovies } from "./displayMovies.js";
import { config } from "./apikey.js";

const API_KEY = config.apikey;

const url = `${API_KEY}`;

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
