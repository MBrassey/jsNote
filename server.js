const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const route = require("./routes");
const fs = require("fs");
let db = "./db/db.json";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/api/notes", route);
app.post("/api/notes", route);
app.use("/notes", route);
app.use("/", route);
app.use("/*", route);

app.listen(PORT, () => {
  console.log(`API server now on port: ${PORT}!`);
});
