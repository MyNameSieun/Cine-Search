/* 예고편 유튜브에서 가져오기 */
const api_key = "13b14dad7e58423573b90a27c47ebfbf";
const urlSearch = new URLSearchParams(location.search);
const movieId = urlSearch.get("id");
const $trailerContainer = document.querySelector(".trailer-container");

const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}`;

const loadMovieVideoData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data.results;
    }
  } catch (error) {
    throw new HttpError(response);
  }
};

const renderTrailer = async () => {
  const movieVideoData = await loadMovieVideoData(url);
  console.log(movieVideoData);
  const onlyTrailers = movieVideoData.filter((videos) => videos.type === "Trailer"); //type "Trailer" 부분만 가져오기
  const trailerKey = onlyTrailers[0].key;
  //   console.log(trailerKey);
  $trailerContainer.innerHTML = `<iframe
  src="https://www.youtube.com/embed/${trailerKey}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
    ></iframe>;`;
};

renderTrailer();
