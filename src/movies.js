const url = "https://api.themoviedb.org/3/movie/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

function showMovies() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results; //  API로부터 받아온 데이터를 movies 변수에 저장
      displayMovies(movies);
    })
    .catch((error) => {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    });
}

// 영화 정보를 받아서 카드 HTML을 생성하는 함수
function generateCardHtml(movie) {
  const overview = movie.overview || "영화 정보가 없습니다.";
  const html = `
  <div class="card-front">
     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title} 포스터" />
     <div class="card-body">
       <div class="card-info">
         <h5 class="card-title">${movie.title}</h5>
         <p class="star">⭐ ${movie.vote_average.toFixed(2)}</p>
       </div>
     </div>
   </div>
   <div class="card-back">
     <div class="card-body">
     <div class="card-info">
       <h5 class="card-title">${movie.title}</h5>
       <p class="star">⭐ ${movie.vote_average.toFixed(2)}</p>
     </div>
     <hr class="hr-top" />
     <p class="card-text">
       ${overview}
     </p>
     <hr class="hr-bottom" />

     <a class="btn btn-primary" href="details.html">상세 정보</a>
   </div>
 </div>
 `;

  // 새로운 <div> 요소를 생성
  const el = document.createElement("div");
  // 생성한 <div> 요소에 "card-container" 클래스를 추가
  el.classList.add("card-container");
  // 생성한 <div> 요소의 내부 HTML을 설정
  el.innerHTML = html;

  return el;
}

// 영화 목록을 받아서 각 영화 카드를 화면에 표시하는 함수
function displayMovies(movieList) {
  // 설정한 내부 HTML을 가진 card_container를 flip 요소의 자식 요소로 추가

  //  나중에 생성된 영화 카드를 추가할 위치를 참조하는 역할
  const flip = document.querySelector(".flip");

  movieList.forEach((movie) => {
    const el = generateCardHtml(movie);
    flip.appendChild(el);
  });
}

export { showMovies, generateCardHtml, displayMovies };
