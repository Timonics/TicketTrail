const { Seat } = require("../db/models/index");

const allSeats = async (req, res) => {
  try {
    const allSeats = await Seat.findAll();
    if (!allSeats || allSeats.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No Seats found" });
    res.status(200).json({ success: true, seats: allSeats });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const createSeat = async (req, res) => {
  try {
    const { name, seatStatus } = req.body;
    let newseat = new Seat({
      name,
      seatStatus,
    });
    newseat = await newseat.save();
    if (!newseat) {
      return res
        .status(400)
        .json({ success: false, message: "Seat not created" });
    }
    res
      .status(200)
      .json({ success: true, message: "Seat successfully created" });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const availableSeats = async (req, res) => {
  try {
    const availableSeats = await Seat.findAll({
      where: {
        seatStatus: "available",
      },
    });
    if (!availableSeats || availableSeats.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No available seats found" });
    res.status(200).json({ success: true, availableSeats: availableSeats });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const reservedSeats = async (req, res) => {
  try {
    const reservedSeats = await Seat.findAll({
      where: {
        seatStatus: "reserved",
      },
    });
    if (!reservedSeats || reservedSeats.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No seats has been reserved" });
    res.status(200).json({ success: true, reservedSeats: reservedSeats });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const singleSeat = async (req, res) => {
  try {
    const { seatID } = req.params;
    const singleSeat = await Seat.findByPk(seatID);
    if (!singleSeat)
      return res
        .status(400)
        .json({ success: false, message: "Seat not found" });
    res.status(200).json({ success: true, seat: singleSeat });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const updateSeat = async (req, res) => {
  try {
    const { seatID } = req.params;
    const updateSeat = await Seat.update(
      { seatStatus: "available" },
      { where: { id: seatID } }
    );
    if (!updateSeat) {
      return res
        .status(400)
        .json({ success: false, message: "Seat not updated" });
    }
    res.status(200).json({
      success: true,
      message: "Seat successfully updated",
      updatedSeat: updateSeat,
    });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const deleteSeat = async (req, res) => {
  try {
    const { seatID } = req.params;
    const deleteSeat = await Seat.destroy({ where: { id: seatID } });
    if (!deleteSeat)
      return res
        .status(400)
        .json({ success: false, message: "Seat not deleted" });
    res
      .status(200)
      .json({ success: true, message: `Seat ${seatID} has been deleted` });
  } catch (err) {
    console.error("Server Error", err);
  }
};

module.exports = {
  allSeats,
  createSeat,
  updateSeat,
  availableSeats,
  reservedSeats,
  singleSeat,
  deleteSeat,
};
