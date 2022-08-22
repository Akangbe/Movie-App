"use script";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=db1669f92e58779a9342609bc9a421e5&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=db1669f92e58779a9342609bc9a421e5&query='";
const Main = document.getElementById("main");
const form = document.getElementById("form");
const Search = document.getElementById("search");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.results);
  ShowMovies(data.results);
}
function ShowMovies(movies) {
  Main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");

    movieEL.innerHTML = ` 
    <img src="${IMG_PATH + poster_path}" alt="${title}"> 
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>overview</h3>
       ${overview}
    </div>


    `;
    Main.appendChild(movieEL);
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const SearchTerm = Search.value;
  if (SearchTerm && SearchTerm !== "") {
    getMovies(SEARCH_URL + SearchTerm);
    Search.value = "";
  } else {
    window.location.reload();
  }
});
