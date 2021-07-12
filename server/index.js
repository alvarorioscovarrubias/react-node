const express = require("express");
const { getPoints } = require("./controller/index.controller");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", getPoints)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})