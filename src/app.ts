import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
const url = "https://pet-adoption-frontend-henna.vercel.app"
// const url = "http://localhost:3000"

//* Middleware
app.use(cors({origin: url, credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Pet Adoption Server Running!");
});

//* routes
app.use("/api", router);

//* middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
