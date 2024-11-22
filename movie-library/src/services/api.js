const API_KEY = "8e64d66b"; // Você pode usar: 'trilogy'
const BASE_URL = "http://www.omdbapi.com/?apikey=trilogy";

import axios from "axios";

export async function searchMovies(query) {
  try {
   
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,
        type: "movie",
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Nenhum filme encontrado");
    }

    return response.data.Search.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster:
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=Sem+Poster",
      type: movie.Type,
    }));
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
}

export async function getMovieDetails(imdbID) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: "full",
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
}
