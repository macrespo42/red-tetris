import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (_, res) => {
  res.send("hello world");
});

app.get("/:room/:player_name", (_, res) => {
  res.send("My room")
});

app.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
