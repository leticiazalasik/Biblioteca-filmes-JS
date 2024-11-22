// main.js

// Importe a função de busca de filmes do arquivo api.js
import { searchMovies } from './services/api.js';
import { renderMovies } from './components/movieCard.js';

const loading = document.getElementById("loading");

// Selecionando os elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Função para renderizar os filmes na tela


// Evento de clique no botão de busca
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim(); // Obtém o texto digitado no campo de busca
  if (query) {
    try {
      loading.classList.remove("d-none");
      const movies = await searchMovies(query); // Busca os filmes pela API
      renderMovies(movies); // Renderiza os filmes na tela

      loading.classList.add("d-none"); 
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar filmes. Tente novamente mais tarde.');
    }  
    
  } else {
    alert('Por favor, insira um termo de busca.');
  }
  
});
