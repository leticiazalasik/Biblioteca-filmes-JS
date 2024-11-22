export function renderMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = ''; // Limpa a lista atual
       
        movies.forEach(movie => {
          const movieCard = createMovieCard(movie); // Cria o card do filme
          moviesList.innerHTML += movieCard; // Adiciona o card na lista
        });
      }
  
  
  export function createMovieCard(movie) {
        return `
          <div class="col-md-4">
              <div class="card country-card h-100 card-style">
                  <img src="${movie.poster}" class="card-img-top flag-img" alt="Poster de ${movie.title}">
                  <div class="card-body">
                      <h5 class="card-title">${movie.title}</h5>
                      <p class="card-text">
                          <strong>Ano:</strong> ${movie.year}<br>
                          <strong>Tipo:</strong> ${movie.type}<br>
                      </p>
                  </div>
              </div>
          </div>
        `;
      }
  


  
  
  