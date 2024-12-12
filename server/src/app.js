const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (_, res) => {
  res.send("hello world");
});

app.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
