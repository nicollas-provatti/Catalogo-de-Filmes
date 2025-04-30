import express from "express";
import tmdbService from "../services/tmdbService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const movies = await tmdbService.getPopularMovies();
    res.render("home", {title: "CineProvatti", movies });
});

router.get("/movies/now_playing", async (req, res) => {
    const NowPlayingMovies = await tmdbService.getNowPlayingMovies();
    res.render("posters", { title: "CineProvatti",  movies: NowPlayingMovies });
});

router.get("/movie/top_rated", async (req, res) => {
    const topRatedMovies = await tmdbService.getTopRatedMovies();
    res.render("bests", {title: "CineProvatti", movies: topRatedMovies});
});

router.get("/movie/upcoming", async (req, res) => {
    const UpComingMovies = await tmdbService.getUpComingMovies();
    res.render("debuts", {title: "CineProvatti", movies: UpComingMovies});
});

router.get("/movies/search", async (req, res) => {
    const movieName = req.query.query;
    const foundMovies = await tmdbService.searchMovie(movieName);
    res.render("search", { title: "CineProvatti", movies: foundMovies});
});

router.get("/movie/:movie_id", async (req, res) => {
    const movieID = req.params.movie_id;
    try {
        const movieDetails = await tmdbService.getMovieDetails(movieID);
        res.json(movieDetails);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar detalhes do filme." });
    }
});

export default router;