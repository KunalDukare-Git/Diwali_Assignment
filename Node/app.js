import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { mongoConnection } from "./db";
import userRoute from "./routes/User";

const app = express();
mongoConnection();

app.use(cors({ origin: "*" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/user", userRoute);

app.use("/uploads", express.static("Uploads"));

export default app;
