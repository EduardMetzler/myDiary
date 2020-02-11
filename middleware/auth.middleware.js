const jwt = require("jsonwebtoken");
config = require("config");
module.exports = (req, res, next) => {
  console.log("dddddddddddddd");
  if (req.method === "OPTIONS") {
    console.log("eeeeeeeeeeeeeeeee");

    return next();
  }

  try {
    console.log("sssssssssssssssssssss");

    const token = req.headers.authorization.split(" ")[1]; //Bearer TOKEN
    console.log(token, "___________________");

    if (!token) {
      return res.status(401).json({ message: "keine Auth" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecter"));
    console.log(decoded, "sssssssssssssssssssss");

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "keine Auth" });
  }
};
