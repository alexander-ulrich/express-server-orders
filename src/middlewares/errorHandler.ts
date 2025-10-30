import type { ErrorRequestHandler } from "express";
import fs from "node:fs";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  process.env.NODE_ENV !== "production" && console.error("Error", err.stack);
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (!fs.existsSync(`./logs/${dateStr}-error.log`)) {
    fs.writeFileSync(
      `./logs/${dateStr}-error.log`,
      `${date.toLocaleTimeString()} ${err.cause} ${err.stack}`
    );
  } else {
    fs.appendFileSync(
      `./logs/${dateStr}-error.log`,
      `\n${date.toLocaleTimeString()} ${err.cause} ${err.stack}`
    );
  }
  res.status(err.cause || 500).json({ message: err.message });
};

export default errorHandler;
