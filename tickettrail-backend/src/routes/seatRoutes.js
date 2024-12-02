const express = require("express");
const router = express.Router();

const { createSeat, allSeats, availableSeats, reservedSeats, singleSeat, deleteSeat, updateSeat  } = require("../api/seat");

router
    .post("/new-seat", createSeat)
    .get("/", allSeats)
    .get("/available-seats", availableSeats)
    .get("/reserved-seats", reservedSeats)

router.route("/:seatID")
    .get(singleSeat)
    .put(updateSeat)
    .delete(deleteSeat)

module.exports = router;
