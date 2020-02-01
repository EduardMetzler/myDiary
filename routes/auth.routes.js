const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("./models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email", "keine Email").isEmail(),
    check("password", "password muss min 6 zeichen sein").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return (
          res.status(400),
          json({
            errors: errors.array(),
            message: "Daten sind unkorrekt bei registrirung"
          })
        );
      }
      const { email, passwrd } = req.body;
      const candidat = await User.findOne({ email, passwrd });
      if (candidat) {
        return res.status(400).json({ message: "User bereits exestirt" });
      }

      const hasedPassword = await bcrypt.hash(passwrd, 12);
      const user = new User({ email, passwrd: hasedPassword });
      await user.save();
      res.status(201).json({ message: "User ist erstellt" });
    } catch (e) {
      res.status(500).json({ message: "Etwas schif gelaufen" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "geben Sie korrekte Email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Password eingeben").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return (
          res.status(400),
          json({
            errors: errors.array(),
            message: "Daten sind unkorrekt bei Anmeldung"
          })
        );
      }
      const { email, passwrd } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "user exestirt nicht" });
      }
      const isMatch = await bcrypt.compare(passwrd, user.passwrd);
      if (!isMatch) {
        return res.status(400).json({ message: "falsche password" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Etwas schif gelaufen" });
    }
  }
);

module.exports = router;
