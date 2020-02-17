const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Text = require("../models/Text");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/", auth, async (req, res) => {
  console.log("req.params.id");
  try {
    const oneEntry = await Text.findById(req.params.id);

    res.json(oneEntry);
  } catch (e) {
    res.status(500).json({ message: "Etwas schief gelaufen" });
  }
});

module.exports = router;
