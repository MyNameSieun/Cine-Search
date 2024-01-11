function showMovies() {
  const api_key = "13b14dad7e58423573b90a27c47ebfbf";
  const id = "848326";
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=ko-KR`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movie = data;
      displayMoviesInfo([movie]); // 왜 이렇게 해야함?
      // const movies = data.results; //  API로부터 받아온 데이터를 movies 변수에 저장
      // displayMoviesInfo(movies);
    })
    .catch((error) => {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    });
}

function generateMoviesInfo(movie) {
  const html = `
        <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="${movie.title} 포스터" />
        <div class="movie-info">
          <div class="top-info">
            <p class="star">⭐ ${movie.vote_average.toFixed(2)}</p>
            <p class="release-date">${movie.release_date}</p>
            <p class="runtime">${movie.runtime}분</p>
            <p class="genres">SF</p>
          </div>
          <p class="overview">${movie.overview}</p>
          <p class="title">${movie.title}</p>
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
