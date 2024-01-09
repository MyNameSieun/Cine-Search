// 영화 정보를 받아서 카드 HTML을 생성하는 함수
function generateCardHtml(movie) {
  const overview = movie.overview || "영화 정보가 없습니다.";
  return `
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

     <a class="btn btn-primary">영화 id</a>
   </div>
 </div>
 `;
}

// 영화 목록을 받아서 각 영화 카드를 화면에 표시하는 함수
function displayMovies(movieList) {
  movieList.forEach((movie) => {
    const flip = document.querySelector(".flip"); // (1) 나중에 생성된 영화 카드를 추가할 위치를 참조하는 역할

    const card_container = document.createElement("div"); // (2)새로운 <div> 요소를 생성
    card_container.classList.add("card-container"); // (3) 생성한 <div> 요소에 "card-container" 클래스를 추가

    // (4) 생성한 <div> 요소의 내부 HTML을 설정
    card_container.innerHTML = generateCardHtml(movie);

    // (5) 설정한 내부 HTML을 가진 card_container를 flip 요소의 자식 요소로 추가
    flip.appendChild(card_container);

    // 버튼 클릭시 영화 id 출력
    const movieIdBtnList = card_container.querySelectorAll(".btn");
    movieIdBtnList.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const movieId = movie.id;
        alert(`영화 id : ${movieId}`);
      });
    });
  });
}

export { generateCardHtml, displayMovies };
