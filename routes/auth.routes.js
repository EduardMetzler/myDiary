// const { Router } = require("express");
// const bcrypt = require("bcryptjs");
// const config = require("config");
// const jwt = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");
// const User = require("./models/User");
// const router = Router();
// router.post(
//   "/register",
//   [
//     check("email", "schlechte email").isEmail(),
//     check("password", "min länge 6 zeichen").isLength({ min: 6 })
//   ],

//   async (req, res) => {
//     try {
//       // console.log(req.body);

//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: "falsche daten bei registrirung"
//         });
//       }

//       const { email, password } = req.body;
//       // console.log(req.body, email, password);
//       const candidate = await User.findOne({ email });

//       console.log("candidate", candidate);

//       if (candidate) {
//         return res.status(400).json({ message: "user bereits exestirt" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 12);
//       // console.log(hashedPassword);
//       const user = new User({ email, password: hashedPassword });

//       // console.log(user);

//       await user.save();
//       res.status(201).json({ message: "user ist registrirt" });
//     } catch (e) {
//       res.status(500).json({ message: "Die daten sind nicht korrekt" });
//     }
//   }
// );
// // router.post(
// //   "/register",
// //   [
// //     check("email", "keine Email").isEmail(),
// //     check("password", "password muss min 6 zeichen sein").isLength({ min: 6 })
// //   ],
// //   async (req, res) => {
// //     try {
// //       console.log("9");
// //       const errors = validationResult(req);

// //       if (!errors.isEmpty()) {
// //         console.log("ffffffffffffffffffff");

// //         return (
// //           res.status(400),
// //           json({
// //             errors: errors.array(),
// //             message: "Daten sind unkorrekt bei registrirung"
// //           })
// //         );
// //       }
// //       const { email, passwrd } = req.body;
// //       console.log(email, passwrd);

// //       const candidat = await User.findOne({ email, passwrd });
// //       if (candidat) {
// //         return res.status(400).json({ message: "User bereits exestirt" });
// //       }

// //       const hasedPassword = await bcrypt.hash(passwrd, 12);
// //       const user = new User({ email, passwrd: hasedPassword });
// //       await user.save();
// //       res.status(201).json({ message: "User ist erstellt" });
// //     } catch (e) {
// //       res.status(500).json({ message: "Etwas schif gelaufeneeeeeeeeeeee" });
// //     }
// //   }
// // );

// router.post(
//   "/login",
//   [
//     check("email", "geben Sie korrekte Email")
//       .normalizeEmail()
//       .isEmail(),
//     check("password", "Password eingeben").exists()
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         return (
//           res.status(400),
//           json({
//             errors: errors.array(),
//             message: "Daten sind unkorrekt bei Anmeldung"
//           })
//         );
//       }
//       const { email, passwrd } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: "user exestirt nicht" });
//       }
//       const isMatch = await bcrypt.compare(passwrd, user.passwrd);
//       if (!isMatch) {
//         return res.status(400).json({ message: "falsche password" });
//       }
//       const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
//         expiresIn: "1h"
//       });
//       res.json({ token, userId: user.id });
//     } catch (e) {
//       res.status(500).json({ message: "Etwas schif gelaufen" });
//     }
//   }
// );

// module.exports = router;

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
// /api/auth/register
router.post(
  "/register",
  [
    check("email", "das ist kein email").isEmail(),
    check("password", "min länge 6 zeichen").isLength({ min: 6 })
  ],

  async (req, res) => {
    // console.log("wwqew");

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Falsche daten bei registrirung"
        });
      }

      const { email, password } = req.body;
      // console.log(req.body, email, password);
      const candidate = await User.findOne({ email });

      // console.log(candidate);

      if (candidate) {
        return res.status(400).json({ message: "User bereits existiert" });
      }
      // console.log("r");

      const hashedPassword = await bcrypt.hash(password, 12);
      // console.log(hashedPassword);
      const user = new User({ email, password: hashedPassword });

      // console.log(user);

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
      // console.log("1");
      if (!user) {
        // console.log("1");
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
