import express from "express";
import { MoviesController } from "../controller/index";
import { MoviesBusiness } from "../business/index";
import { MoviesData } from "../data";
import { TokenValidator } from "../middlewares";
import { IdGenerator } from "../services";

const moviesRoute = express.Router();

const moviesBusiness = new MoviesBusiness(new MoviesData(), new IdGenerator());

const moviesController = new MoviesController(moviesBusiness);
const tokenValidator = new TokenValidator();

moviesRoute.use("/", tokenValidator.validate);

moviesRoute.post("/create", moviesController.createMovie);
moviesRoute.get("/get", moviesController.getMovies);
moviesRoute.put("/update", moviesController.updateMovie);
moviesRoute.delete("/delete", moviesController.deleteMovie);

export { moviesRoute };
