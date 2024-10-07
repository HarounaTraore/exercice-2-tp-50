import express from "express";


const app = express();
const port = 3000;
app.get("/", (_req, res) => {
  res.json({ message: "Hello world" });
});














app.listen(port, () => {
  console.log("App listening on port" + port);
});
