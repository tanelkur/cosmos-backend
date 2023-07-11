const mongoose = require("mongoose");

const flightListsSchema = mongoose.Schema({
  flightListsArray: {
    type: Object,
  },
});

const FlightLists = mongoose.model("FlightLists", flightListsSchema);

module.exports = FlightLists;
