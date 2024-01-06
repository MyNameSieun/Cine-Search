const url =
  "https://api.themoviedb.org/3/tv/popular?api_key=13b14dad7e58423573b90a27c47ebfbf&language=ko-KR";

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
