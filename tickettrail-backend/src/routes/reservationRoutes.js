const express = require("express");
const router = express.Router();

const { createReservation, allReservations, singleReservation, deleteReservation } = require("../api/reservation");

router
    .post("/new-reservation", createReservation)
    .get("/", allReservations)

router.route("/:reservationID")
    .get(singleReservation)
    .delete(deleteReservation)

module.exports = router;
