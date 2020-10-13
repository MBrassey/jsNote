const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const route = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/api/notes", route);
app.use("/notes", route);
app.use("/", route);
app.use("/*", route);

app.listen(PORT, () => {
  console.log(`API server now on port: ${PORT}!`);
});
