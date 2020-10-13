const path = require("path");
const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");

// Configure Middleware
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      alert("error Get Notes", err);
      return 0;
    }
    console.log("Data", data);
    // response parsed and returned
    res.json(JSON.parse(data));
    return res;
  });
});

router.post("/api/notes", (req, res) => {
  if (!noteId) noteId = getMaxId();
  noteId += 1;
  req.body.id = noteId; // add id
  fs.readFile(db, "utf8", (err, data) => {
    if (err) {
      console.log("Error in posting note");
      return false;
    } else {
      data = JSON.parse(data);
      data = data.concat(req.body);
      data = JSON.stringify(data);
      fs.writeFile(db, data, (err) => {
        if (err) {
          console.log("Error in Post");
          return false;
        } else {
          res.json(data);
          return true;
        }
      });
    }
  });
});

// Configure Routes
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("/*", (reg, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
