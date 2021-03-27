const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email", "das ist kein email").isEmail(),
    check("password", "min länge 6 zeichen").isLength({ min: 6 })
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Falsche daten bei registrirung"
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User bereits existiert" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();
      res.status(201).json({ message: "Du bist registriert" });
    } catch (e) {
      res.status(500).json({ message: "Die daten sind nicht korrekt" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Email oder passwort falsch")
      .normalizeEmail()
      .isEmail(),
    check("password", "Email oder passwort falsch").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Email oder passwort falsch"
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Email oder passwort falsch" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Email oder passwort falsch" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecter"), {
        expiresIn: "1h"
      });
      console.log(token);
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "error" });
    }
  }
);

module.exports = router;
