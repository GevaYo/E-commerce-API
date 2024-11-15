import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authentication from "./middlewares/authentication";
import paymentRoutes from "./routes/paymentRoutes";
import logger, { stream } from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { ErrorRequestHandler } from "express";

const app = express();

app.use(morgan("combined", { stream }));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/pay", paymentRoutes);

app.get("/", (req, res) => {
  logger.info("GET / request received");
  res.send("Hello World");
});

app.use(errorHandler as ErrorRequestHandler);

export default app;
