
// movieCard.js
export function renderMovies(movies) {
  const moviesList = document.getElementById('moviesList');
  moviesList.innerHTML = ''; // Limpa a lista atual

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie); // Cria o card do filme
    moviesList.innerHTML += movieCard; // Adiciona o card na lista
  });

  // Adiciona eventos de clique aos cards para abrir o modal
  movies.forEach((movie) => {
    const card = document.getElementById(`movieCard${movie.id}`);
    card.addEventListener('click', () => {
      const modal = new bootstrap.Modal(document.getElementById(`movieModal${movie.id}`));
      modal.show();
    });
  });
}

export function createMovieCard(movie) {
  console.log(movie);  // Verifique aqui os dados

  return `
    <div id="movieCard${movie.id}" class="col-md-4">
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

    <!-- Modal de detalhes -->
    <div class="modal fade" id="movieModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="movieModalLabel${movie.id}" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="movieModalLabel${movie.id}">${movie.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Exibindo informações do filme -->
            <p><strong>Runtime:</strong> ${movie.runtime ? movie.runtime.split(' ')[0] : 'N/A'}</p>  <!-- Exibe apenas os minutos -->
            <p><strong>Genre:</strong> ${movie.genre ? movie.genre.replace(/,/g, ', ') : 'N/A'}</p> <!-- Organiza os gêneros -->
            <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
            <p><strong>Country:</strong> ${movie.country ? movie.country.split(',').join(', ') : 'N/A'}</p> <!-- Organiza os países -->

          </div>
        </div>
      </div>
    </div>
  `;
}
