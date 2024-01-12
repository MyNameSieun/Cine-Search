
const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmZmYWFjOWE4NmE4OTk4ZDQ3MGJhZjAyYzk3NDc2YiIsInN1YiI6IjY1OWE1NTc3ODc0MWM0MDFmZTZlNGJiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eiraCaCkjB-fQf9bKnbC3Fc5enxSPa6T44qx_J4Jmww'
  }
};

let url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
fetch(url, options).then(response => response.json()).then(function (data) {
   const movies=data.results;
   console.log(movies[0])
   return movieProperty(movies[0])});
//연결되면 삭제될 부분. 시험용으로 들어갔습니다.

const detailtitle = document.querySelector("#movieDetailInformation");
const commenttitle = document.querySelector("#movieComment");
const detailcontainer = document.querySelector(".detailed-container");
const totalComment = document.querySelector(".review-container");

const upbox1 = document.querySelector(".box1");
const upbox2 = document.querySelector(".box2");

const movieProperty = (selectedMovie) => {
  const {title, tagline, overview, constructor_company} = selectedMovie;
  document.querySelector(".movieTitle").textContent=title;
  document.querySelector(".movieTagLine").textContent=tagline;
  document.querySelector(".movieOverView").textContent=overview;
  if (selectedMovie.hasOwnProperty("constructor_company")===true) {
    if (constructor_company.length===1){
    document.querySelector(".movieMadeCompany").textContent=constructor_company[0];}
    else {
      const otherCompany = constructor_company.length-1
      document.querySelector(".movieMadeCompany").textContent=`${constructor_company[0]} 외 ${otherCompany}`;}}}
//상세내용 넣기

detailtitle.addEventListener('click', (event) => {
  detailcontainer.style.display = "block";
  totalComment.style.display = "none";

  upbox1.style.visibility = "unset";
  upbox2.style.visibility = "hidden";
});

commenttitle.addEventListener('click', (event) => {
  document.querySelector(".comment").style.display = "none"
  detailcontainer.style.display = "none";
  totalComment.style.display = "block";

  upbox1.style.visibility = "hidden";
  upbox2.style.visibility = "unset";
});

