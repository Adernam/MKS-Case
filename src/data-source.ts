import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Movies } from "./entity/";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "MKS",
  synchronize: true,
  logging: false,
  entities: [User, Movies],
  migrations: [],
  subscribers: [],
});
