const express = require("express");

const pollController = require("../controllers/pollController");

const router = express.Router();

router.get("/", pollController.getPolls);

router.get("/:id", pollController.getPoll);

router.post("/", pollController.createPoll);

router.patch("/:id/vote", pollController.vote);

module.exports = router;
