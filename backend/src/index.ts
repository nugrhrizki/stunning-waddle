import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

import swaggerFile from "../swagger_output.json";
import { AppDataSource } from "./data-source";
import todoRouter from "./routes/todos";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app: Application = express();

    app.use(cors({ origin: "http://localhost:3000" }));

    app.use(express.json());
    app.use("/todos", todoRouter);

    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Failed initialize database:", err);
  });
