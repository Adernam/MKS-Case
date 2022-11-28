export interface CreateMovieDTO {
  title: string;
  genre: string;
  synopsis: string;
  userCreator: string;
}

export type MovieDoneType = {
  id: string;
  title: string;
  genre: string;
  synopsis: string;
  userCreator: string;
};

export type updateMovieDTO = {
  id: string;
  title: string;
  genre: string;
  synopsis: string;
};
