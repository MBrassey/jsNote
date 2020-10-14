const path = require("path");
const router = require("express").Router();
const fs = require("fs");
let db = "./db/db.json";
let noteId = "";

// Determine Amount of Saved Notes to Display
const jsonLength = () => {
  let data = fs.readFileSync(db, "utf8");
  data = JSON.parse(data);
  return data.length;
};

// Configure Middleware
router.get("/api/notes", (req, res) => {
  fs.readFile(db, "utf8", (err, data) => {
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
