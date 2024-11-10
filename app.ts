import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authentication from "./middlewares/authentication";
import testRoutes from "./routes/testRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import logger, { stream } from "./utils/logger";

const app = express();

app.use(morgan("combined", { stream }));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/test", testRoutes);
app.use("/pay", paymentRoutes);

app.get("/", (req, res) => {
  logger.info("GET / request received");
  res.send("Hello World");
});

export default app;
