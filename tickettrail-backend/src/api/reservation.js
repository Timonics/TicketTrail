const { where } = require("sequelize");
const { Reservation, User, Movie, Seat } = require("../db/models/index");

const allReservations = async (req, res) => {
  try {
    const allReservations = await Reservation.findAll();
    if (!allReservations || allReservations.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No Reservations found" });
    res.status(200).json({ success: true, reservations: allReservations });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const createReservation = async (req, res) => {
  try {
    const { ownerId, movieId, seatId } = req.body;

    const owner = await User.findByPk(ownerId);
    if (!owner)
      return res
        .status(400)
        .json({ success: false, message: "This user does not exist" });

    const movie = await Movie.findByPk(movieId);
    if (!movie)
      return res
        .status(400)
        .json({ success: false, message: "This movie does not exist" });

    const seat = await Seat.findByPk(seatId);
    if (!seat)
      return res
        .status(400)
        .json({ success: false, message: "This seat does not exist" });

    if (seat.seatStatus == "reserved")
      return res.status(400).json({
        success: false,
        message: "This seat has been reserved, choose another seat",
      });

    let newreservation = new Reservation({
      ownerId,
      movieId,
      seatId,
    });

    newreservation = newreservation.save();

    if (newreservation) {
      await Seat.update(
        {
          seatStatus: "reserved",
        },
        {
          where: {
            id: seatId,
          },
        }
      );

      res.status(200).json({
        success: true,
        message: "Sucessfully created a reservation",
        reservation: newreservation,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Reservation not created" });
    }
  } catch (err) {
    console.error("Server Error", err);
  }
};

const singleReservation = async (req, res) => {
  try {
    const { reservationID } = req.params;
    const singleReservation = await User.findByPk(reservationID);
    if (!singleReservation)
      return res
        .status(400)
        .json({ success: false, message: "Reservation not found" });
    res.status(200).json({ success: true, reservation: singleReservation });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { reservationID } = req.params;
    const deleteReservation = await Reservation.destroy(reservationID);
    if (!deleteReservation)
      return res
        .status(400)
        .json({ success: false, message: "Reservation not deleted" });
    res.status(200).json({
      success: true,
      message: `Reservation ${reservationID} has been deleted`,
    });
  } catch (err) {
    console.error("Server Error", err);
  }
};

module.exports = {
  allReservations,
  createReservation,
  singleReservation,
  deleteReservation,
};
