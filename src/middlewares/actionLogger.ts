import type { RequestHandler } from "express";
import fs from "node:fs";

const actionLogger: RequestHandler = (req, res, next) => {
  const date = new Date();
  const action = req.method;
  const userIP = req.ip;
  const url = req.baseUrl + req.url;
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (!fs.existsSync(`./log/${dateStr}-action.log`)) {
    fs.writeFileSync(
      `./log/${dateStr}-action.log`,
      `${date.toLocaleTimeString()} ${action} ${url} ${userIP}`
    );
  } else {
    fs.appendFileSync(
      `./log/${dateStr}-action.log`,
      `\n${date.toLocaleTimeString()} ${action} ${url} ${userIP}`
    );
  }

  console.log(`${dateStr}: ${action} request on ${url} from ${userIP}`);
  next();
};

export default actionLogger;
