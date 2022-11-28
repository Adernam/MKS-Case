import { Movies } from "../entity";
import { dataSource } from "../data-source";
import { MovieDoneType } from "types/movies.type";

export class MoviesData {
  protected TABLE_NAME = "movies";

  createMovie = async (movies: MovieDoneType): Promise<MovieDoneType> => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(this.TABLE_NAME)
        .values(movies)
        .returning(["id", "title", "genre", "synopsis", "userCreator"])
        .execute();

      const { id, title, genre, synopsis, userCreator } = result.raw[0];

      return { id, title, genre, synopsis, userCreator };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getMovieByTitle = async (title: string): Promise<Movies> => {
    try {
      return dataSource
        .getRepository(Movies)
        .createQueryBuilder("movies")
        .where("movies.title = :title", { title })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getMovieById = async (id: string): Promise<Movies> => {
    try {
      return dataSource
        .getRepository(Movies)
        .createQueryBuilder("movies")
        .where("movies.id = :id", { id })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getMovies = async (): Promise<Movies[]> => {
    try {
      return dataSource
        .getRepository(Movies)
        .createQueryBuilder("movies")
        .select()
        .getMany();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  updateMovie = async (
    movieId: string,
    title: string,
    genre: string,
    synopsis: string
  ) => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .update(Movies)
        .set({ title, genre, synopsis })
        .where("movies.id = :id", { id: movieId })
        .returning(["id", "title", "genre", "synopsis", "userCreator"])
        .execute();

      return result.raw[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  deleteMovie = async (movieId: string): Promise<void> => {
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(Movies)
      .where("id = :id", { id: movieId })
      .execute();
  };
}
