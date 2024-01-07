// API 가져와 데이터 띄우기
const movieContainer = document.querySelector("#movieContainer");

const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;

    movies.forEach((movie) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card-front");

      cardDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title} 포스터" />
        <div class="card-body">
          <div class="card-info">
            <h5 class="card-title">${movie.title}</h5>
            <p class="star">⭐ ${movie.vote_average}</p>
          </div>
        </div>
      `;

      movieContainer.appendChild(cardDiv);
    });
  })
  .catch((error) => {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  });
