import { Request, Response } from "express";
import { updateMovieDTO } from "types/movies.type";
import { MoviesBusiness } from "../business/movies.business";

export class MoviesController {
  constructor(private moviesBusiness: MoviesBusiness) {}

  createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, genre, synopsis } = req.body;
      const { idUser } = res.locals;

      const inputMovieDTO = {
        title,
        genre,
        synopsis,
        userCreator: idUser,
      };

      const movie = await this.moviesBusiness.createMovie(inputMovieDTO);

      res.status(201).send({
        message: "Movie registred successfully!",
        movie,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const movies = await this.moviesBusiness.getMovies();

      res.status(200).send({ movies });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      const { movieId, title, genre, synopsis } = req.body;

      const newMovieUpdated: updateMovieDTO = {
        id: movieId,
        title,
        genre,
        synopsis,
      };

      const movieUpdated = await this.moviesBusiness.updateMovie(
        newMovieUpdated
      );

      res
        .status(201)
        .send({ message: "Movie updated successfully!", movieUpdated });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      const { movieId } = req.body;

      await this.moviesBusiness.deleteMovie(movieId);

      res.status(200).send({ message: "Movie deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };
}
