import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./route/user.route";

const app = express();

app.use(morgan("combined"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRoute);

export default app;
