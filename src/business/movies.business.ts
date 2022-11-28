import { IdGenerator } from "../services";
import { MoviesData } from "../data/index";
import {
  CreateMovieDTO,
  MovieDoneType,
  updateMovieDTO,
} from "types/movies.type";
import { set, get, redis } from "../util/redisConfig";

export class MoviesBusiness {
  constructor(
    private moviesData: MoviesData,
    private idGenerator: IdGenerator
  ) {}

  createMovie = async (input: CreateMovieDTO): Promise<MovieDoneType> => {
    const { title, genre, synopsis, userCreator } = input;

    if (!title || !genre || !synopsis || !userCreator) {
      throw new Error("Please check all the fields.");
    }

    const newMovieId = this.idGenerator.generateId();

    const movieDone: MovieDoneType = {
      id: newMovieId,
      title,
      genre,
      synopsis,
      userCreator,
    };

    const newMovie = await this.moviesData.createMovie(movieDone);

    const moviesToRedis = await this.moviesData.getMovies();

    await set("redisMovies", JSON.stringify(moviesToRedis));

    return newMovie;
  };

  getMovies = async () => {
    const redisMoviesString = await get("redisMovies");

    if (redisMoviesString == null) {
      const movies = await this.moviesData.getMovies();

      return movies;
    } else {
      return JSON.parse(redisMoviesString);
    }
  };

  updateMovie = async ({ id, title, genre, synopsis }: updateMovieDTO) => {
    if (!id || !title || !genre || !synopsis) {
      throw new Error("Please check the fields.");
    }

    const movieExists = await this.moviesData.getMovieById(id);

    if (!movieExists) {
      throw new Error("This movie does not exist.");
    }

    const NewMovie = await this.moviesData.updateMovie(
      id,
      title,
      genre,
      synopsis
    );

    const moviesToRedis = await this.moviesData.getMovies();

    await set("redisMovies", JSON.stringify(moviesToRedis));

    return NewMovie;
  };

  deleteMovie = async (movieId: string): Promise<void> => {
    if (!movieId) {
      throw new Error("Please insert the movie id to be delete.");
    }

    const movieExists = await this.moviesData.getMovieById(movieId);

    if (!movieExists) {
      throw new Error("This movie does not exist.");
    }

    await this.moviesData.deleteMovie(movieId);

    const movieStillExisting = await this.moviesData.getMovieById(movieId);

    if (movieStillExisting) {
      throw new Error("Database error.");
    }

    const moviesToRedis = await this.moviesData.getMovies();

    await set("redisMovies", JSON.stringify(moviesToRedis));
  };
}
