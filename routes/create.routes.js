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
    // console.log(req.body.text);

    // const { text } = req.body.antry.text;
    // const { heading } = req.body.antry.heading;
    const { text, heading } = req.body;

    // console.log(text, req.user.userId);
    const myText = new Text({
      oneText: text,
      oneHeading: heading,
      owner: req.user.userId
    });
    console.log(myText);
    await myText.save();
    res.status(201).json({ myText });
  } catch (e) {
    res.status(500).json({ message: "Die daten sind nicht korrekt" });
  }
});

// router.get("/", auth, async (req, res) => {
//   try {
//     const links = await Link.find({ owner: req.user.userId });
//     res.send(links);
//   } catch (e) {
//     res.status(500).json({ message: "Etwas schif gelaufen" });
//   }
// });

module.exports = router;
