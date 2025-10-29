import type { ErrorRequestHandler } from "express";
import fs from "node:fs";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error", err.stack);
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (!fs.existsSync(`./log/${dateStr}-error.log`)) {
    fs.writeFileSync(
      `./log/${dateStr}-error.log`,
      `${date.toLocaleTimeString()} ${err.cause} ${err.stack}`
    );
  } else {
    fs.appendFileSync(
      `./log/${dateStr}-error.log`,
      `\n${date.toLocaleTimeString()} ${err.cause} ${err.stack}`
    );
  }
  res.status(err.cause || 500).json({ message: err.message });
};

export default errorHandler;
