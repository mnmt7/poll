const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Poll = require("../models/pollModel");

exports.getPolls = catchAsync(async (req, res) => {
  const polls = await Poll.find().sort({ createdAt: -1 });

  res.json({
    status: "success",
    results: polls.length,
    data: {
      polls,
    },
  });
});

exports.getPoll = catchAsync(async (req, res) => {
  const poll = await Poll.findById(req.params.id);

  if (!poll) {
    return next(new AppError("No poll found with that ID", 404));
  }

  res.json({
    status: "success",
    data: { poll },
  });
});

exports.createPoll = catchAsync(async (req, res) => {
  const { question, options } = req.body;

  if (
    typeof question !== "string" ||
    question.trim() === "" ||
    !Array.isArray(options)
  ) {
    return next(new AppError("Invalid question or options", 400));
  }

  if (options.length < 2 || options.length > 4) {
    return next(new AppError("Please provide between 2 and 4 options", 400));
  }

  if (options.some((option) => typeof option !== "string")) {
    return next(new AppError("All options must be strings", 400));
  }

  const formattedOptions = options.map((option) => ({
    text: option,
  }));

  const poll = await Poll.create({ question, options: formattedOptions });
  res.status(201).json({
    status: "success",
    data: { poll },
  });
});

exports.vote = catchAsync(async (req, res) => {
  const { optionId } = req.body;

  const poll = await Poll.findById(req.params.id);

  if (!poll) {
    return next(new AppError("No poll found with that ID", 404));
  }

  poll.options.id(optionId).votes += 1;
  await poll.save();

  res.json({
    status: "success",
    data: { poll },
  });
});
