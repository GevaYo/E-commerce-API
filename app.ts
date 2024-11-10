import express from "express";
import userRoutes from "./routes/userRoutes";
import authentication from "./middlewares/authentication";
import testRoutes from "./routes/testRoutes";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/test", testRoutes);
app.use("/pay", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
