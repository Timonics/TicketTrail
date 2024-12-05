const { ShowTime } = require("../db/models");

const createShowTime = async (req, res) => {
  try {
    const { showTime, showDate } = req.body;

    // Helper function to validate time format (HH:mm)
    const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

    // Validate showTime
    if (!isValidTime(showTime)) {
      return res
        .status(400)
        .json({ error: "Invalid showTime. Please use 'HH:mm' format." });
    }

    // Ensure showDate is in a valid date format
    if (!showDate || isNaN(new Date(showDate).getTime())) {
      return res.status(400).json({
        error:
          "Invalid or missing showDate. Please provide a valid date in 'YYYY-MM-DD' format.",
      });
    }

    // Strip time components for both dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Current date at midnight
    const providedDate = new Date(showDate); // Parse showDate

    if (providedDate < today) {
      return res.status(400).json({ error: "showDate cannot be in the past." });
    }

    let newShowTime = new ShowTime({
      showTime,
      showDate,
    });

    newShowTime = await newShowTime.save();
    if (!newShowTime) {
      return res
        .status(400)
        .json({ success: false, error: "Showtime not created" });
    }

    res
      .status(200)
      .json({ success: true, message: "ShowTime created successfully" });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const updateShowTime = async (req, res) => {
  try {
    const { showTimeID } = req.params;
    const { showTime, showDate } = req.body;

    // Helper function to validate time format (HH:mm)
    const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

    // Validate showTime
    if (!isValidTime(showTime)) {
      return res
        .status(400)
        .json({ error: "Invalid showTime. Please use 'HH:mm' format." });
    }

    // Ensure showDate is in a valid date format
    if (!showDate || isNaN(new Date(showDate).getTime())) {
      return res.status(400).json({
        error:
          "Invalid or missing showDate. Please provide a valid date in 'YYYY-MM-DD' format.",
      });
    }

    // Strip time components for both dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Current date at midnight
    const providedDate = new Date(showDate); // Parse showDate

    if (providedDate < today) {
      return res.status(400).json({ error: "showDate cannot be in the past." });
    }

    const updateShowTime = await ShowTime.update(
      {
        showTime,
        showDate,
      },
      {
        where: { id: showTimeID },
      }
    );

    if (!updateShowTime)
      return res
        .status(400)
        .json({ success: false, message: "Error updating the showtime" });

    res
      .status(200)
      .json({ success: true, message: "Showtime successfully updated" });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const deleteShowTime = async (req, res) => {
  try {
    const { showTimeID } = req.params;
    const deleteShowTime = await ShowTime.destroy({
      where: { id: showTimeID },
    });
    if (!deleteShowTime)
      return res
        .status(400)
        .json({ success: false, message: "Showtime not deleted" });
    res
      .status(200)
      .json({ success: true, message: `Showtime ${seatID} has been deleted` });
  } catch (err) {
    console.error("Server Error", err);
  }
};

module.exports = { createShowTime, updateShowTime, deleteShowTime };
