const axios = require("axios");
const FlightLists = require("../models/flightListsModel");
const Flights = require("../models/flightsModel");

const getFlights = async (res, FLIGHTS_API, FLIGHT_LIST_ARRAY_ID) => {
  try {
    const response = await axios.get(FLIGHTS_API);
    const { id, validUntil, legs } = response.data;
    const firstSend = { id, validUntil, legs, reservations: [] };
    res.send(firstSend); /// EDIT

    const { flightListsArray } = await FlightLists.findById(
      FLIGHT_LIST_ARRAY_ID
    );

    // Check if it is already in DB
    const flightExists = await Flights.findOne({ id });
    if (!flightExists) {
      const flights = await Flights.create({
        id,
        validUntil,
        legs,
        reservations: [],
      });

      flightListsArray.push(flights._id);

      // Remove oldest flight list from DB if there's more than 15
      if (flightListsArray.length > 15) {
        const removeId = flightListsArray.shift();
        await Flights.findByIdAndDelete(removeId);
      }

      // Update flight list array in DB
      await FlightLists.findByIdAndUpdate(
        { _id: FLIGHT_LIST_ARRAY_ID },
        { flightListsArray }
      );

      res.status(200).send(flights);
    } else res.status(200).send(flightExists);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getFlights;
