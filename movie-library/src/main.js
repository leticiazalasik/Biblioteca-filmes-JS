// main.js

// Importe a função de busca de filmes do arquivo api.js
import { searchMovies } from './services/api.js';
// Importe a função para renderizar os cartões de filmes
import { renderMovies } from './components/movieCard.js';

// Seleciona o elemento de carregamento do DOM
const loading = document.getElementById("loading");

// Selecionando os elementos do DOM
const searchInput = document.getElementById('searchInput'); // Campo de entrada para a busca de filmes
const searchButton = document.getElementById('searchButton'); // Botão para iniciar a busca
const moviesList = document.getElementById("moviesList"); // Elemento para exibir a lista de filmes
const pagination = document.getElementById("pagination"); // Elemento para exibir os botões de paginação

let currentPage = 1; // Variável para armazenar a página atual
const moviesPerPage = 6; // Constante para definir o número de filmes por página
let allMovies = []; // Lista completa dos filmes buscados

// Função para renderizar os filmes da página atual com paginação
function renderMoviesWithPagination(movies) {
  allMovies = movies; // Atualiza a lista global de filmes

  // Calcula o índice de início dos filmes da página atual
  const startIndex = (currentPage - 1) * moviesPerPage; // Ex: Se currentPage for 1, startIndex será 0
  // Calcula o índice de fim dos filmes da página atual
  const endIndex = startIndex + moviesPerPage; // Ex: Se startIndex for 0 e moviesPerPage for 6, endIndex será 6
  const moviesToShow = allMovies.slice(startIndex, endIndex); // Seleciona os filmes para a página atual

  // Renderiza apenas os filmes da página atual
  moviesList.innerHTML = ""; // Limpa os filmes atuais
  renderMovies(moviesToShow); // Renderiza os filmes

  // Atualiza os botões de paginação
  renderPaginationButtons();
}



// Função para atualizar os botões de paginação
function renderPaginationButtons() {
  pagination.innerHTML = ""; // Limpa os botões de paginação

  // Calcula o total de páginas dividindo o número total de filmes pelo número de filmes por página
  const totalPages = Math.ceil(allMovies.length / moviesPerPage); // Ex: Se allMovies.length for 12 e moviesPerPage for 6, totalPages será 2

  // Botão "Anterior" (⬅️⬅️)
  if (currentPage > 1) { // Se não estivermos na primeira página
    const prevButton = document.createElement("button"); // Cria um botão
    prevButton.className = "btn btn-outline-primary mx-1"; // Adiciona classes ao botão
    prevButton.innerHTML = " << "; // Define o texto do botão
    prevButton.addEventListener("click", () => { // Adiciona um evento de clique ao botão
      currentPage--; // Decrementa a página atual
      renderMoviesWithPagination(allMovies); // Renderiza a página anterior
    });
    pagination.appendChild(prevButton); // Adiciona o botão de "Anterior" ao elemento de paginação
  }

  // Botões para cada página
  for (let i = 1; i <= totalPages; i++) { // Loop para criar um botão para cada página
    const pageButton = document.createElement("button"); // Cria um botão
    pageButton.className = `btn mx-1 ${i === currentPage ? "btn-primary" : "btn-outline-primary"}`; // Adiciona classes ao botão, destacando a página atual
    pageButton.textContent = i; // Define o número da página como texto do botão
    pageButton.addEventListener("click", () => { // Adiciona um evento de clique ao botão
      currentPage = i; // Atualiza a página atual com a página clicada
      renderMoviesWithPagination(allMovies); // Renderiza a nova página
    });
    pagination.appendChild(pageButton); // Adiciona o botão da página ao elemento de paginação
  }

  // Botão "Próximo" (➡️➡️)
  if (currentPage < totalPages) { // Se não estivermos na última página
    const nextButton = document.createElement("button"); // Cria um botão
    nextButton.className = "btn btn-outline-primary mx-1"; // Adiciona classes ao botão
    nextButton.innerHTML = " >>"; // Define o texto do botão
    nextButton.addEventListener("click", () => { // Adiciona um evento de clique ao botão
      currentPage++; // Incrementa a página atual
      renderMoviesWithPagination(allMovies); // Renderiza a próxima página
    });
    pagination.appendChild(nextButton); // Adiciona o botão de "Próximo" ao elemento de paginação
  }
}



// Evento de clique no botão de busca
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim(); // Obtém o texto digitado no campo de busca e remove espaços extras
  if (query) { // Verifica se a query não está vazia
    try {
      loading.classList.remove("d-none"); // Mostra o elemento de carregamento

      const movies = await searchMovies(query); // Busca os filmes pela API
      currentPage = 1; // Reseta para a primeira página ao fazer uma nova busca
      renderMoviesWithPagination(movies); // Renderiza os filmes com paginação

      loading.classList.add("d-none"); // Oculta o elemento de carregamento
    } catch (error) {
      console.error(error); // Loga o erro no console
      alert('Erro ao buscar filmes. Tente novamente mais tarde.'); // Exibe uma mensagem de erro para o usuário
    }
  } else {
    alert('Por favor, insira um termo de busca.'); // Alerta o usuário para inserir um termo de busca
  }
});

