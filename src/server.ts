import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { envConfig } from "./config";
import cors from "cors";
import router from "./routers";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1", router);

app.get("/echo", async (req: Request, res: Response) => {
  res.status(200).send("Hey!");
});

app.listen(envConfig.SERVER.PORT, async () => {
  console.log(
    `[server]: Server is running at http://localhost:${envConfig.SERVER.PORT}`
  );
});
