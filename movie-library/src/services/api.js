const BASE_URL = "http://www.omdbapi.com/?apikey=trilogy"; // URL base da API do OMDB com a chave da API

import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

export async function searchMovies(query) { // Função assíncrona para buscar filmes com base em uma query
  try {
    const response = await axios.get(BASE_URL, { // Faz uma requisição GET para a URL base
      params: {
        s: query, // Parâmetro de busca (query) fornecido pelo usuário
        type: "movie", // Limita a busca a filmes
      },
    });

    if (response.data.Response === "False") { // Verifica se a resposta é falsa (nenhum filme encontrado)
      throw new Error(response.data.Error || "Nenhum filme encontrado"); // Lança um erro se nenhum filme foi encontrado
    }

    // Obter detalhes completos de cada filme
    const movies = await Promise.all(response.data.Search.map(async (movie) => { // Mapeia e busca detalhes de cada filme retornado
      const details = await getMovieDetails(movie.imdbID); // Faz uma requisição para obter detalhes completos de cada filme
      return {
        id: movie.imdbID, // ID do filme
        title: movie.Title, // Título do filme
        year: movie.Year, // Ano de lançamento do filme
        poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=Sem+Poster", // Pôster do filme ou um placeholder se não houver pôster
        type: movie.Type, // Tipo do filme
        runtime: details.Runtime, // Duração do filme
        genre: details.Genre, // Gênero do filme
        director: details.Director, // Diretor do filme
        country: details.Country // País de origem do filme
      };
    }));

    return movies; // Retorna a lista de filmes com os detalhes completos
  } catch (error) {
    console.error("Erro ao buscar filmes:", error); // Loga o erro no console
    throw error; // Lança o erro novamente para ser tratado pelo chamador da função
  }
}

export async function getMovieDetails(imdbID) { // Função assíncrona para obter detalhes completos de um filme com base no ID do IMDB
  try {
    const response = await axios.get(BASE_URL, { // Faz uma requisição GET para a URL base
      params: {
        i: imdbID, // Parâmetro de ID do IMDB fornecido
        plot: "full", // Solicita a sinopse completa do filme
      },
    });

    if (response.data.Response === "False") { // Verifica se a resposta é falsa (nenhum detalhe encontrado)
      throw new Error(response.data.Error); // Lança um erro se nenhum detalhe foi encontrado
    }

    return response.data; // Retorna os detalhes do filme
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error); // Loga o erro no console
    throw error; // Lança o erro novamente para ser tratado pelo chamador da função
  }
}
