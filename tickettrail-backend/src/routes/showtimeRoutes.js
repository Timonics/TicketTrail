const express = require("express");
const router = express.Router();

const {
  createShowTime,
  updateShowTime,
  deleteShowTime,
} = require("../api/showtime");

router.post("/", createShowTime);
router.put("/:showTimeID", updateShowTime);
router.delete("/:showTimeID", deleteShowTime);

module.exports = router;
