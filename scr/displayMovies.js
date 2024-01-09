export function displayMovies(movieList) {
  movieList.forEach((movie) => {
    const flip = document.querySelector(".flip"); // (1) 나중에 생성된 영화 카드를 추가할 위치를 참조하는 역할

    const card_container = document.createElement("div"); // (2)새로운 <div> 요소를 생성
    card_container.classList.add("card-container"); // (3) 생성한 <div> 요소에 "card-container" 클래스를 추가

    // (4) 생성한 <div> 요소의 내부 HTML을 설정
    // (5) 이때, 각 영화의 정보(제목, 포스터 이미지 경로, 평점, 줄거리 등)를 템플릿 리터럴을 활용하여 동적으로 삽입
    if (movie.overview == "") {
      card_container.innerHTML = `
    <div class="card-front">
       <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${
        movie.title
      } 포스터" />
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
         영화 정보가 없습니다.
       </p>
       <hr class="hr-bottom" />

       <a class="btn btn-primary">영화 id</a>
     </div>
   </div>
     `;
    } else {
      card_container.innerHTML = `
      <div class="card-front">
         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${
        movie.title
      } 포스터" />
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
           ${movie.overview}
         </p>
         <hr class="hr-bottom" />
 
         <a class="btn btn-primary">영화 id</a>
       </div>
     </div>
       `;
    }

    // (6) 설정한 내부 HTML을 가진 card_container를 flip 요소의 자식 요소로 추가
    flip.appendChild(card_container);

    // 버튼 클릭시 영화 id 출력
    //  querySelectorAll 사용시
    const movieIdBtnList = card_container.querySelectorAll(".btn");
    movieIdBtnList.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const movieId = movie.id;
        alert(`영화 id : ${movieId}`);
      });
    });
    // querySelector 사용시
    // const movieIdBtn = card_container.querySelector(".btn");
    // movieIdBtn.addEventListener("click", function () {
    //   const movieId = movie.id;
    //   alert(`영화 id : ${movieId}`);
    // });
  });
}
