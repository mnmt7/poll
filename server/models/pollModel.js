const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "An option must have text"],
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "A poll must have a question"],
      trim: true,
    },
    options: [optionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);
