import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TMDB_APY_KEY;
const baseURL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
    baseURL,
    params: {
        api_key: apiKey,
        language: "pt-BR",
    }
});

const getPopularMovies = async () => {
    try {
        const response = await tmdb.get("/movie/popular");
        return response.data.results;

    } catch (error) {
        console.error("Erro ao buscar filmes populares: ", error.message);
        return [];
    }
}

const getNowPlayingMovies = async () => {
    try {
        const response = await tmdb.get("/movie/now_playing");
        /* console.log(response.data.results); */
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filmes em cartaz: ", error.message);
        return [];
    }
}

const getTopRatedMovies = async () => {
    try {
        const response = await tmdb.get("/movie/top_rated");
        return response.data.results;
    } catch (error) {
        console.error("Erro  ao buscar filmes mais bem avaliados, ", error.message);
        return [];
    }
}

const getUpComingMovies = async () => {
    try {
        const response = await tmdb.get("/movie/upcoming");
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filmes que vão estreiar ", error.message);
        return [];
    }
}

const searchMovie = async (movie) => {
    try {
        const response = await tmdb.get(`/search/movie?query=${movie}`);
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filme: ", error.message);
        return [];
    }
}

const getMovieDetails = async (movieID) => {
    try {
        const response = await tmdb.get(`/movie/${movieID}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do filme: ", error.message);
        return [];
    }
}

export default {
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpComingMovies,
    searchMovie,
    getMovieDetails
}