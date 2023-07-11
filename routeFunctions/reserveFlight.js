const Flights = require("../models/flightsModel");

const reserveFlight = async (req, res) => {
  try {
    const {
      flightMongoId,
      reservations,
      firstName,
      lastName,
      shoppingCart,
      totalPrice,
      totalDays,
      totalHours,
      bookTime,
    } = req.body;

    const newReservations = [
      {
        firstName,
        lastName,
        shoppingCart,
        totalPrice,
        totalDays,
        totalHours,
        bookTime,
      },
      ...reservations,
    ];

    await Flights.findByIdAndUpdate(
      { _id: flightMongoId },
      { reservations: newReservations }
    );

    res.status(200).json({ message: "Flight booked" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = reserveFlight;
