require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB);

const searchSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = new mongoose.model("COUNT", searchSchema);

module.exports = Counter;
