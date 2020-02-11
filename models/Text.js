const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  texts: String,
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Text", schema);
