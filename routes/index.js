const path = require("path");
const router = require("express").Router();
const fs = require("fs");
let db = "./db/db.json";

// Determine Number of Saved Notes
const jsonLength = () => {
  let data = fs.readFileSync(db, "utf8");
  data = JSON.parse(data);
  return data.length;
};

// Save New Note
router.post("/api/notes", (req, res) => {
  if (!noteId) noteId = jsonLength();
  var noteId = Number(noteId);
  noteId += 1;
  req.body.id = noteId;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) {
      console.log(err);
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

// Return List of Saved Notes
router.get("/api/notes", (req, res) => {
  fs.readFile(db, "utf8", (err, data) => {
    if (err) {
      alert("error Get Notes", err);
      return 0;
    }
    return res.json(JSON.parse(data));
  });
});

// Delete Saved Note by Id
router.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      alert("Error could not READ", err);
      return 0;
    } else {
      data = JSON.parse(data);
      data.forEach((element, index, data) => {
        if (element.id == id) {
          data.splice(index, 1);
          fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
            if (err) {
              alert("error on Delete", err);
              return 0;
            }
            res.json(data);
          });
          return 0;
        }
      });
    }
  });
});

// HTML Routes
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
