function showMovies() {
  const api_key = "13b14dad7e58423573b90a27c47ebfbf";
  const urlSearch = new URLSearchParams(location.search);
  const movieId = urlSearch.get("id");

  if (!movieId) {
    console.error("영화 ID를 찾을 수 없습니다.");
    //영화 id 없을 시 메인화면으로 이동
    alert('영화 id를 찾을 수 없습니다. 메인 화면으로 이동합니다.');
    location.replace('/');
    return;
  }

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=ko-KR`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movie = data;
      displayMoviesInfo([movie]); // -> 객체(유사배열객체인가?)s
    })
    .catch((error) => {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    });
}

function generateMoviesInfo(movie) {
  // console.log(movie);
  const html = `
        <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="${movie.title} 포스터" />
        <div class="movie-info">
          <div class="top-info">
            <p class="star">⭐ ${movie.vote_average.toFixed(2)}</p>
            <p class="release-date">${movie.release_date}</p>
            <p class="runtime">${movie.runtime}분</p>
            <p class="genres">${movie.genres[0].name}</p>
          </div>
          <p class="overview">${movie.overview}</p>
          <p class="title gowun-batang-regular ">${movie.title}</p>
        </div>
        `;

  const movie_info = document.createElement("div");
  movie_info.classList.add("movie-detail-on-image");
  movie_info.innerHTML = html;

  return movie_info;
}

function displayMoviesInfo(moviesInfoList) {
  const image_container = document.querySelector(".image-container");

  moviesInfoList.forEach((moviesInfo) => {
    const movie_info = generateMoviesInfo(moviesInfo);
    image_container.appendChild(movie_info);
  });
}

showMovies();
