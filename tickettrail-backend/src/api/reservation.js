const { Reservation, User, Movie, Seat } = require("../db/models/index");

const allReservations = async (_, res) => {
  try {
    const allReservations = await Reservation.findAll({
      include: [
        {
          model: User,
          as: "owner",
        },
        {
          model: Movie,
          as: "movie",
        },
        {
          model: Seat,
          as: "seat",
        },
      ],
    });
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

    if (seat.reservations) {
      const check = seat.reservations.some(
        (reservation) => reservation.reservedMovieId === movieId
      );
      if (check)
        return res.status(400).json({
          success: false,
          message:
            "This seat has been reserved, choose another seat or check the list of available seats for this showtime",
        });
    }

    let newreservation = new Reservation({
      ownerId,
      movieId,
      seatId,
    });

    if (newreservation) {
      const reservationObj = {
        reservedFor: owner.name,
        reservedMovieName: movie.title,
        reservedMovieId: movie.id,
      };
      let allreservations = seat.reservations || [];
      allreservations.push(reservationObj);

      await Seat.update(
        {
          name: seat.name,
          reservations: allreservations,
        },
        { where: { id: seatId } }
      );

      newreservation = await newreservation.save();

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
    const singleReservation = await Reservation.findByPk(reservationID, {
      include: [
        {
          model: User,
          as: "owner",
        },
        {
          model: Movie,
          as: "movie",
        },
        {
          model: Seat,
          as: "seat",
        },
      ],
    });
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
    const reservation = await Reservation.findByPk(reservationID, {
      include: {
        model: Seat,
        as: "seat",
      },kw
    });
    if (!reservation)
      return res
        .status(400)
        .json({ success: false, message: "Reservation not found" });

    await Seat.update(
      { seatStatus: "available" },
      { where: { id: reservation.seat.id } }
    );

    const deleteReservation = await Reservation.destroy({
      where: { id: reservationID },
    });
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
