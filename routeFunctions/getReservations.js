const Flights = require("../models/flightsModel");

const getReservations = async (res) => {
  try {
    const allReservations = [];
    const allPriceLists = await Flights.find({}).sort("-createdAt");

    allPriceLists.map((priceList) => {
      if (priceList.reservations === []) return;
      return priceList.reservations.map((reservation) =>
        allReservations.push(reservation)
      );
    });

    res.status(200).send(allReservations);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getReservations;
