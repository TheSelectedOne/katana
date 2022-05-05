import { DataSource } from "typeorm";
import { Deck } from "./Entities/Deck";
import dotenv from "dotenv"

dotenv.config()
export const connection = new DataSource({
    type: "postgres",
    host: <string>process.env.DB_HOST,
    port: <number | undefined>process.env.DB_PORT,
    username: <string>process.env.DB_USERNAME,
    password: <string>process.env.DB_PASSWORD,
    database: <string>process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Deck],
});
