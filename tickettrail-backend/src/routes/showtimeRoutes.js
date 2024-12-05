const express = require("express");
const router = express.Router();

const {
  allShowTimes,
  createShowTime,
  updateShowTime,
  deleteShowTime,
} = require("../api/showtime");

router.get("/", allShowTimes);
router.post("/new-showtime", createShowTime);
router.put("/:showTimeID", updateShowTime);
router.delete("/:showTimeID", deleteShowTime);

module.exports = router;
