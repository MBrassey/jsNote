const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const route = require("./routes");

// Server Params
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/api/notes/:id", route);
app.get("/api/notes", route);
app.post("/api/notes", route);
app.use("/notes", route);
app.use("/", route);
app.use("/*", route);

// Bind Server to Port
app.listen(PORT, () => {
  console.log(`API server now on port: ${PORT}!`);
});
