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

console.log($trailerContainer);

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     const trailerKey = data.results[0].key;
//     console.log(trailerKey, "예고편 유튜브 키");
//     return trailerKey; //  API로부터 받아온 데이터를 movies 변수에 저장 // -> 배열
//   })
//   .catch((error) => {
//     console.error("데이터를 가져오는 중 오류 발생:", error);
//   });
