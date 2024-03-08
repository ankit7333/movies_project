const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const movieWrap = document.querySelector('.movie');

    // const moreLessBtn = document.querySelectorAll('[data-more--less]');
    
    const getMovies = async (api) => {
        const response = await fetch(api);
        const data = await response.json();
        // console.log(data.results);
        showMovies(data.results);
    }
    
    const showMovies = (data) => {
        movieWrap.innerHTML = "";
        data.map(
            (item) => {
                // console.log(item);
                const movieBox = document.createElement('div');
                movieBox.classList.add('movie__box');
                // const movieBox = document.querySelector('.movie__box');
                movieBox.innerHTML += `<img src="${IMGPATH + item.poster_path}" alt="" />
                                <div class="movie__content">
                                    <span class="title">${item.title}</span>
                                    <span class="rating">${item.vote_average}</span>
                                    <p class="overview">${item.overview}</p>
                                    <button class="more--less-${item.id}" data-more--less>More</button>
                                </div>`;
                movieWrap.appendChild(movieBox);
                const moreLessBtn = document.querySelectorAll(`more--less-${item.id}`);
                // console.log(moreLessBtn);
                const itemId = item.id;
                for(let i = 0; i < moreLessBtn.length; i++){
                    moreLessBtn[i].addEventListener('click', function(){
                        console.log(i);
                        if(!moreLessBtn.classList.contains('active')){
                            moreLessBtn.classList.add('active');
                        }else{
                            moreLessBtn.classList.remove('active')
                        }
                    });
                }
    });
}
getMovies(APIURL); //popular movies api

document.querySelector('.search').addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.target.value != ''){
        getMovies(SEARCHAPI + e.target.value); //search movies api
    }else{
        getMovies(APIURL); //popular movies api
    }
});



