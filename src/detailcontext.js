function showMovies() {
  const api_key = "13b14dad7e58423573b90a27c47ebfbf";
  const urlSearch = new URLSearchParams(location.search);
  const movieId = urlSearch.get("id");

  if (!movieId) {
    console.error("영화 ID를 찾을 수 없습니다.");
    return;
  }

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=ko-KR`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movie = data;
      console.log(movie);
      movieProperty(movie);
    })
    .catch((error) => {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    });
}

const detailtitle = document.querySelector("#movieDetailInformation");
const commenttitle = document.querySelector("#movieComment");
const $trailer = document.querySelector("#trailer"); //예고편 탭

const detailcontainer = document.querySelector(".detailed-container");
const commentbox = document.querySelector(".review-container");
const trailerBox = document.querySelector(".trailer-container");

const box1up = document.querySelector("#detailSelectorBox");
const box2up = document.querySelector("#commentSelectorBox");
const box3up = document.querySelector("#trailerSelectorBox");

const movieProperty = (movie) => {
  const { title, tagline, overview, production_companies } = movie;
  document.querySelector(".movieTitle").textContent = title;
  document.querySelector(".movieTagLine").textContent = tagline;
  document.querySelector(".movieOverView").textContent = overview;
  if (movie.hasOwnProperty("production_companies") > 0 === true) {
    if (production_companies.length === 1) {
      document.querySelector(".movieMadeCompany").textContent = production_companies[0].name;
    } else {
      const otherCompany = production_companies.length - 1;
      document.querySelector(
        ".movieMadeCompany"
      ).textContent = `${production_companies[0].name} 외 ${otherCompany} 제작`;
    }
  }
};
//상세내용 넣기

detailtitle.addEventListener("click", (event) => {
  event.preventDefault();
  detailcontainer.style.display = "block";
  commentbox.style.display = "none";
  trailerBox.style.display = "none";

  box1up.style.visibility = "unset";
  box2up.style.visibility = "hidden";
  box3up.style.visibility = "hidden";
});

commenttitle.addEventListener("click", (event) => {
  event.preventDefault();
  commentbox.style.display = "block";
  detailcontainer.style.display = "none";
  trailerBox.style.display = "none";

  box1up.style.visibility = "hidden";
  box2up.style.visibility = "unset";
  box3up.style.visibility = "hidden";
});

showMovies();

$trailer.addEventListener("click", (event) => {
  event.preventDefault();
  trailerBox.style.display = "flex";
  detailcontainer.style.display = "none";
  commentbox.style.display = "none";

  box1up.style.visibility = "hidden";
  box2up.style.visibility = "hidden";
  box3up.style.visibility = "unset";
});
