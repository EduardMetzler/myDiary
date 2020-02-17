const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Text = require("../models/Text");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/", auth, async (req, res) => {
  // console.log("3e3e3e2");
  try {
    const allMyTexts = await Text.find({ owner: req.user.userId });
    res.json(allMyTexts);
  } catch (e) {
    res.status(500).json({ message: "Etwas schief gelaufen" });
  }
});

// router.get("/:id", auth, async (req, res) => {
//   console.log("req.params.id");
//   try {
//     const oneEntry = await Text.findById(req.params.id);
//     // const oneEntry = await Text.findById(req.params.id);

//     // console.log(link);

//     res.json(oneEntry);
//   } catch (e) {
//     res.status(500).json({ message: "Etwas schif gelaufen" });
//   }
// });

router.get("/:id", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const oneEntry = await Text.findById(req.params.id);
    // console.log(link);

    res.json(oneEntry);
  } catch (e) {
    res.status(500).json({ message: "Etwas schief gelaufen" });
  }
});

module.exports = router;
