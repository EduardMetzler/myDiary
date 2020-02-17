const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  oneText: String,
  owner: { type: Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }
});

module.exports = model("Text", schema);
