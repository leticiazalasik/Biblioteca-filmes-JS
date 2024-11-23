// main.js

// Importe a função de busca de filmes do arquivo api.js
import { searchMovies } from './services/api.js';
import { renderMovies } from './components/movieCard.js';

const loading = document.getElementById("loading");

// Selecionando os elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesList = document.getElementById("moviesList");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const moviesPerPage = 6;
let allMovies = []; // Lista completa dos filmes buscados



// Função para renderizar os filmes da página atual com paginação
function renderMoviesWithPagination(movies) {
  // Atualiza a lista global de filmes
  allMovies = movies;

  // Calcula o índice de início e fim dos filmes da página atual
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesToShow = allMovies.slice(startIndex, endIndex);

  // Renderiza apenas os filmes da página atual
  moviesList.innerHTML = ""; // Limpa os filmes atuais
  renderMovies(moviesToShow);

  // Atualiza os botões de paginação
  renderPaginationButtons();
}



// Função para atualizar os botões de paginação
function renderPaginationButtons() {
  pagination.innerHTML = ""; // Limpa os botões de paginação

  const totalPages = Math.ceil(allMovies.length / moviesPerPage);

  // Botão "Anterior" (⬅️⬅️)
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.className = "btn btn-outline-primary mx-1";
    prevButton.innerHTML = " << "; // Unicode para ⬅️⬅️
    prevButton.addEventListener("click", () => {
      currentPage--;
      renderMoviesWithPagination(allMovies);
    });
    pagination.appendChild(prevButton);
  }

  // Botões para cada página
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `btn mx-1 ${i === currentPage ? "btn-primary" : "btn-outline-primary"}`;
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderMoviesWithPagination(allMovies);
    });
    pagination.appendChild(pageButton);
  }

  // Botão "Próximo" (➡️➡️)
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.className = "btn btn-outline-primary mx-1";
    nextButton.innerHTML = " >>"; // Unicode para ➡️➡️
    nextButton.addEventListener("click", () => {
      currentPage++;
      renderMoviesWithPagination(allMovies);
    });
    pagination.appendChild(nextButton);
  }
}

// Evento de clique no botão de busca
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim(); // Obtém o texto digitado no campo de busca
  if (query) {
    try {
      loading.classList.remove("d-none");

      const movies = await searchMovies(query); // Busca os filmes pela API
      currentPage = 1; // Reseta para a primeira página ao fazer uma nova busca
      renderMoviesWithPagination(movies); // Renderiza os filmes com paginação

      loading.classList.add("d-none");
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar filmes. Tente novamente mais tarde.');
    }
  } else {
    alert('Por favor, insira um termo de busca.');
  }
});

console.log(searchMovies("marvel"));