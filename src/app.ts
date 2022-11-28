import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { moviesRoute, userRoute } from "./routes";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/user", userRoute);
app.use("/movies", moviesRoute);
