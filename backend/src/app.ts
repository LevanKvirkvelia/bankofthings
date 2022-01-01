import express from "express";
import bodyParser from "body-parser";

require("express-async-errors");

export const app = express();

const port = 3000;

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  console.error("HANDLER!", err.stack);
  res.status(500).json({ error: err });
});

import("routes/nsupdate");
import("routes/mint");

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  res.status(403);
  res.json({ error: err.message });
});
