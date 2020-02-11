const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Text = require("../models/Text");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body.text;
    console.log(text, req.user.userId);
    const myText = new Text({
      texts: text,
      owner: req.user.userId
    });
    console.log(myText);
    await myText.save();
    res.status(201).json({ myText });
  } catch (e) {
    res.status(500).json({ message: "Die daten sind nicht korrekt" });
  }
});

module.exports = router;
