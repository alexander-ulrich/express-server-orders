import "#db";
import { actionLogger, errorHandler } from "#middlewares";
import { orderRouter, productRouter } from "#routers";
import express from "express";

const app = express();
const port = 3000;

//Middleware
app.use(express.json());

//Routes
app.use("/products", actionLogger, productRouter);
app.use("/orders", actionLogger, orderRouter);

// Error-Handler
app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[34mServer is running on http://localhost:${port}\x1b[0m`)
);
