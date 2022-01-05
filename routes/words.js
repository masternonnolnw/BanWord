const express = require("express");
const router = express.Router();
const wordDB = require("../models/word");

//getting all
router.get("/", async (req, res) => {
  try {
    const words = await wordDB.find();
    res.json(words);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//getting one
router.get("/:id", async (req, res) => {
  try {
    const words = await wordDB.find({ category: req.params.id });
    return res.json(words);
  } catch (err) {
    return res.json({ message: err.message });
  }
});

//creating one
router.post("/", async (req, res) => {
  let words;
  try {
    words = await wordDB.find({
      word: req.body.word,
      category: req.body.category,
    });
    if (Object.keys(words).length === 0) {
      const word = new wordDB({
        word: req.body.word,
        category: req.body.category,
      });
      try {
        const newWord = await word.save();
        return res.status(201).json(newWord);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    }
    return res.status(404).json({ message: "Alredy have" });
  } catch (err) {
    return res.json({ message: err.message });
  }
});
//updating one
router.patch("/", (req, res) => {});
//deleting one
router.delete("/:id", getWord, async (req, res) => {
  try {
    await res.word.remove();
    res.json({ message: "Deleted Word" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getWord(req, res, next) {
  let word;
  try {
    word = await wordDB.findById(req.params.id);
    if (word == null) {
      return res.status(404).json({ message: "Cannot find word" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.word = word;
  next();
}

module.exports = router;
